<template>
  <form @submit.prevent="handleSubmit">
    <div class="ps-fieldset">
      <label class="ps-label" for="person-name">Name</label>
      <input
        id="person-name"
        v-model="form.name"
        type="text"
        class="ps-input"
        placeholder="Guest name"
        required
        autofocus
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="person-email">Email</label>
      <input
        id="person-email"
        v-model="form.email"
        type="email"
        class="ps-input"
        placeholder="guest@example.com"
        required
      />
    </div>
    <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>
    <div class="flex justify-end">
      <button type="submit" class="ps-btn-green" :disabled="loading">
        {{ loading ? 'Saving…' : 'Invite' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  partySpaceId: { type: Number, required: true }
})
const emit = defineEmits(['saved'])

const { addPeople } = usePeople()
const { userId } = useAuth()

const form = reactive({ name: '', email: '' })
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await addPeople({
      name: form.name,
      email: form.email,
      partySpaceId: props.partySpaceId,
      userId: userId.value
    })
    emit('saved')
  } catch (e) {
    error.value = 'Failed to invite. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="ps-fieldset">
      <label class="ps-label" for="pedit-name">Name</label>
      <input
        id="pedit-name"
        v-model="form.name"
        type="text"
        class="ps-input"
        placeholder="Guest name"
        required
        autofocus
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="pedit-email">Email</label>
      <input
        id="pedit-email"
        v-model="form.email"
        type="email"
        class="ps-input"
        placeholder="guest@example.com"
        required
      />
    </div>
    <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>
    <div class="flex justify-end">
      <button type="submit" class="ps-btn-primary" :disabled="loading">
        {{ loading ? 'Saving…' : 'Save' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  person: { type: Object, required: true },
  partySpaceId: { type: Number, required: true }
})
const emit = defineEmits(['saved'])

const { editPeople } = usePeople()
const { userId } = useAuth()

const form = reactive({ name: props.person.name, email: props.person.email })
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await editPeople({
      id: props.person.id,
      name: form.name,
      email: form.email,
      partySpaceId: props.partySpaceId,
      userId: userId.value
    })
    emit('saved')
  } catch (e) {
    error.value = 'Failed to save. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

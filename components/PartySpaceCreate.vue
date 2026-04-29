<template>
  <form @submit.prevent="handleSubmit">
    <div class="ps-fieldset">
      <label class="ps-label" for="ps-title">PartySpace Title</label>
      <input
        id="ps-title"
        v-model="form.title"
        type="text"
        class="ps-input"
        placeholder="e.g. John's Birthday Bash"
        required
        autofocus
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="ps-date">Date</label>
      <input
        id="ps-date"
        v-model="form.dateStart"
        type="date"
        class="ps-input"
        required
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="ps-time">Start Time</label>
      <input
        id="ps-time"
        v-model="form.timeStart"
        type="time"
        class="ps-input"
        required
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="ps-desc">Description</label>
      <textarea
        id="ps-desc"
        v-model="form.description"
        class="ps-input min-h-[80px] resize-y"
        placeholder="Tell people what to expect…"
        required
      />
    </div>
    <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>
    <div class="flex justify-end">
      <button type="submit" class="ps-btn-primary" :disabled="loading">
        {{ loading ? 'Saving…' : 'Add PartySpace' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const emit = defineEmits(['saved'])
const { addPartySpace } = usePartySpaces()
const { userId } = useAuth()

const form = reactive({ title: '', dateStart: '', timeStart: '', description: '' })
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await addPartySpace({ ...form, userId: userId.value })
    emit('saved')
  } catch (e) {
    error.value = 'Failed to save. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

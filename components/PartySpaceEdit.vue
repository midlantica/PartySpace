<template>
  <form @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Column 1 -->
      <div>
        <div class="ps-fieldset">
          <label class="ps-label" for="edit-title">Title</label>
          <input
            id="edit-title"
            v-model="form.title"
            type="text"
            class="ps-input"
            placeholder="Event title"
            required
            autofocus
          />
        </div>
        <div class="ps-fieldset">
          <label class="ps-label" for="edit-date">Start Date</label>
          <input
            id="edit-date"
            v-model="form.dateStart"
            type="date"
            class="ps-input"
            required
          />
        </div>
        <div class="ps-fieldset">
          <label class="ps-label" for="edit-time">Start Time</label>
          <input
            id="edit-time"
            v-model="form.timeStart"
            type="time"
            class="ps-input"
            required
          />
        </div>
      </div>
      <!-- Column 2 -->
      <div>
        <div class="ps-fieldset">
          <label class="ps-label" for="edit-desc">Description</label>
          <textarea
            id="edit-desc"
            v-model="form.description"
            class="ps-input min-h-[148px] resize-y"
            placeholder="Event description"
            required
          />
        </div>
      </div>
    </div>

    <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>

    <div class="flex justify-between mt-2">
      <PsButton type="button" variant="grey" corners="full" size="md" @click="$emit('close')">
        Cancel
      </PsButton>
      <PsButton type="submit" variant="blue" corners="full" size="md" :disabled="loading">
        {{ loading ? 'Saving…' : 'Save PartySpace' }}
      </PsButton>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  partySpace: { type: Object, required: true }
})
const emit = defineEmits(['saved', 'close'])
const { updatePartySpace } = usePartySpaces()

const form = reactive({ ...props.partySpace })
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await updatePartySpace(form)
    emit('saved')
  } catch (e) {
    error.value = 'Failed to save. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="ps-fieldset">
      <label class="ps-label" for="vedit-name">Venue Name</label>
      <input
        id="vedit-name"
        v-model="form.name"
        type="text"
        class="ps-input"
        placeholder="Venue name"
        required
        autofocus
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="vedit-geourl">Google Maps Embed URL</label>
      <input
        id="vedit-geourl"
        v-model="form.geourl"
        type="text"
        class="ps-input"
        placeholder="https://www.google.com/maps/embed?..."
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="vedit-duration">Duration (hours)</label>
      <input
        id="vedit-duration"
        v-model.number="form.duration"
        type="number"
        min="0.5"
        step="0.5"
        class="ps-input"
        placeholder="e.g. 2"
        required
      />
    </div>
    <p v-if="error" class="text-red-500 text-sm mb-3">{{ error }}</p>
    <div class="flex justify-between mt-2">
      <button
        type="button"
        class="ps-btn-danger text-sm"
        @click="handleDelete"
      >
        Delete Venue
      </button>
      <button type="submit" class="ps-btn-primary" :disabled="loading">
        {{ loading ? 'Saving…' : 'Save Venue' }}
      </button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, required: true },
  partySpace: { type: Object, required: true },
  partyRelationship: { type: Object, required: true }
})
const emit = defineEmits(['saved', 'close'])

const { updateVenue, removeVenue } = useVenues()
const { updatePartySpaceVenue } = usePartySpaceVenues()

const form = reactive({
  name: props.venue.name,
  geourl: props.venue.geourl,
  duration: props.partyRelationship.duration
})
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    await updateVenue({ ...props.venue, name: form.name, geourl: form.geourl })
    await updatePartySpaceVenue({
      ...props.partyRelationship,
      duration: form.duration
    })
    emit('saved')
  } catch (e) {
    error.value = 'Failed to save. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  await removeVenue(props.venue.id)
  emit('saved')
}
</script>

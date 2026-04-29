<template>
  <form @submit.prevent="handleSubmit">
    <div class="ps-fieldset">
      <label class="ps-label" for="venue-name">Venue Name</label>
      <input
        id="venue-name"
        v-model="form.name"
        type="text"
        class="ps-input"
        placeholder="e.g. Jeni's Ice Cream"
        required
        autofocus
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="venue-geourl">Google Maps Embed URL</label>
      <input
        id="venue-geourl"
        v-model="form.geourl"
        type="text"
        class="ps-input"
        placeholder="https://www.google.com/maps/embed?..."
      />
    </div>
    <div class="ps-fieldset">
      <label class="ps-label" for="venue-duration">Duration (hours)</label>
      <input
        id="venue-duration"
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
    <div class="flex justify-end">
      <PsButton type="submit" variant="green" corners="full" size="md" :disabled="loading">
        {{ loading ? 'Saving…' : 'Add Venue' }}
      </PsButton>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  partySpaceId: { type: Number, required: true }
})
const emit = defineEmits(['saved'])

const { venues, addVenue } = useVenues()
const { addPartySpaceVenue } = usePartySpaceVenues()

const form = reactive({ name: '', geourl: '', duration: '' })
const error = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  error.value = ''
  loading.value = true
  try {
    // Create the venue first
    await addVenue({ name: form.name, geourl: form.geourl })
    // Find the newly created venue by name
    const created = venues.value.find((v) => v.name === form.name)
    if (created) {
      await addPartySpaceVenue({
        duration: form.duration,
        partySpaceId: props.partySpaceId,
        venueId: created.id
      })
    }
    emit('saved')
  } catch (e) {
    error.value = 'Failed to save venue. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

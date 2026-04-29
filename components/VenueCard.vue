<template>
  <div class="border border-gray-100 rounded-xl p-3 bg-gray-50">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-2">
      <button
        class="text-gray-400 hover:text-violet-600 transition p-1 rounded"
        title="Edit Venue"
        @click="showEdit = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <span class="text-xs text-blue-600 font-medium">{{ partySpace.timeStart }}</span>
      <button
        class="text-gray-300 hover:text-red-500 transition text-lg leading-none"
        title="Remove venue"
        @click="handleRemove"
      >
        &times;
      </button>
    </div>

    <!-- Venue info -->
    <h6 class="font-semibold text-gray-800 text-sm mb-0.5">{{ venue.name }}</h6>
    <p class="text-xs text-gray-400 mb-2">Duration: {{ partyRelationship.duration }}hrs</p>

    <!-- Map embed -->
    <div v-if="venue.geourl" class="rounded overflow-hidden h-28">
      <iframe
        :src="venue.geourl"
        class="w-full h-full border-0"
        allowfullscreen
        loading="lazy"
      />
    </div>

    <!-- Edit modal -->
    <UiModal v-model="showEdit" title="Edit Venue">
      <VenueEdit
        :venue="venue"
        :party-space="partySpace"
        :party-relationship="partyRelationship"
        @saved="showEdit = false"
        @close="showEdit = false"
      />
    </UiModal>
  </div>
</template>

<script setup>
const props = defineProps({
  venue: { type: Object, required: true },
  partySpace: { type: Object, required: true },
  partyRelationship: { type: Object, required: true }
})

const { removeVenue } = useVenues()
const showEdit = ref(false)

const handleRemove = async () => {
  await removeVenue(props.venue.id)
}
</script>

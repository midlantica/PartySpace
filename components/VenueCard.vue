<template>
  <div class="rounded-xl border border-gray-200 bg-white shadow-sm mb-3 overflow-hidden">
    <!-- Blue header bar: pencil | Time: HH:MM | × -->
    <div class="ps-venue-header">
      <button
        class="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-300 hover:text-blue-700 transition flex-shrink-0"
        title="Edit Venue"
        @click="showEdit = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
      <span class="text-sm font-medium text-[#1a3a8f]">Time: {{ partySpace.timeStart }}</span>
      <button
        class="text-gray-400 hover:text-red-500 transition text-xl leading-none"
        title="Remove venue"
        @click="handleRemove"
      >
        &times;
      </button>
    </div>

    <!-- Venue body -->
    <div class="p-4">
      <div class="flex gap-3">
        <!-- Left: name + duration -->
        <div class="flex-1 min-w-0">
          <h6 class="font-bold text-[#1a3a8f] text-base mb-1">{{ venue.name }}</h6>
          <p class="text-sm text-gray-500">Duration: {{ partyRelationship.duration }}hrs</p>
        </div>
        <!-- Right: map embed -->
        <div v-if="venue.geourl" class="w-36 h-24 rounded overflow-hidden flex-shrink-0">
          <iframe
            :src="venue.geourl"
            class="w-full h-full border-0"
            allowfullscreen
            loading="lazy"
          />
        </div>
      </div>
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
const { partySpaceVenues, fetchPartySpaceVenues } = usePartySpaceVenues()
const showEdit = ref(false)

const handleRemove = async () => {
  // Remove the partySpaceVenue relationship (not the venue itself)
  const config = useRuntimeConfig()
  await $fetch(`${config.public.apiBase}/partySpaceVenues/${props.partyRelationship.id}`, {
    method: 'DELETE'
  })
  await fetchPartySpaceVenues()
}
</script>

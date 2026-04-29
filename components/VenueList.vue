<template>
  <div>
    <div v-if="venuesForPartySpace.length === 0" class="text-sm text-gray-400 py-2">
      No venues yet. Add one!
    </div>

    <!-- Each venue gets a timeline dot on the left -->
    <div
      v-for="item in venuesForPartySpace"
      :key="item.relationship.id"
      class="relative pl-8 mb-1"
    >
      <div class="absolute left-0 top-4 ps-timeline-dot" />
      <VenueCard
        :venue="item.venue"
        :party-space="partySpace"
        :party-relationship="item.relationship"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  partySpaceId: { type: Number, required: true },
  partySpace: { type: Object, required: true }
})

const { venues } = useVenues()
const { partySpaceVenues } = usePartySpaceVenues()

const venuesForPartySpace = computed(() => {
  const relationships = partySpaceVenues.value.filter(
    (psv) => psv.partySpaceId === props.partySpaceId
  )
  return relationships
    .map((rel) => ({
      relationship: rel,
      venue: venues.value.find((v) => v.id === rel.venueId) || {}
    }))
    .filter((item) => item.venue.id)
})
</script>

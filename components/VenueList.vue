<template>
  <div class="space-y-3">
    <div v-if="venuesForPartySpace.length === 0" class="text-sm text-gray-400 text-center py-4">
      No venues yet. Add one!
    </div>
    <VenueCard
      v-for="item in venuesForPartySpace"
      :key="item.relationship.id"
      :venue="item.venue"
      :party-space="partySpace"
      :party-relationship="item.relationship"
    />
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
  return relationships.map((rel) => ({
    relationship: rel,
    venue: venues.value.find((v) => v.id === rel.venueId) || {}
  })).filter((item) => item.venue.id)
})
</script>

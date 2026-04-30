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
      <div class="absolute left-0 top-4 timeline-dot" />
      <VenueCard
        :venue="item.venue"
        :party-space="partySpace"
        :party-relationship="item.relationship"
        :start-time="item.startTime"
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

  // Add duration hours+minutes to a "HH:MM" time string
  const addHours = (timeStr, hours) => {
    if (!timeStr) return ''
    const [h, m] = timeStr.split(':').map(Number)
    const totalMinutes = h * 60 + m + Math.round(hours * 60)
    const newH = Math.floor(totalMinutes / 60) % 24
    const newM = totalMinutes % 60
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`
  }

  const venuesForPartySpace = computed(() => {
    const relationships = partySpaceVenues.value.filter(
      (psv) => psv.partySpaceId === props.partySpaceId
    )
    const items = relationships
      .map((rel) => ({
        relationship: rel,
        venue: venues.value.find((v) => v.id === rel.venueId) || {}
      }))
      .filter((item) => item.venue.id)

    // Accumulate start times
    let runningTime = props.partySpace.timeStart
    return items.map((item) => {
      const startTime = runningTime
      runningTime = addHours(runningTime, item.relationship.duration)
      return { ...item, startTime }
    })
  })
</script>

<style scoped>
  .timeline-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 9999px;
    background-color: #1a3a8f;
    flex-shrink: 0;
  }
</style>

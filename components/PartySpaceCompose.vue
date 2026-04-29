<template>
  <div>
    <!-- Back button -->
    <PsButton variant="null" corners="full" size="md" class="mb-5" @click="$emit('back')">
      <template #iconLeft>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
      </template>
      Back to PartySpaces
    </PsButton>

    <div v-if="partySpace">
      <!-- PartySpace detail card (full width) -->
      <PartySpaceComposeItem :party-space="partySpace" class="mb-6" />

      <!-- Two-column layout: People (left) | Timeline + Venues (right) -->
      <div class="flex gap-0">
        <!-- Left column: People -->
        <div class="w-64 flex-shrink-0 relative">
          <!-- Vertical timeline line -->
          <div class="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gray-300" />

          <!-- People section header: dot + "People" + "+ Invite" all on one line -->
          <div class="relative pl-8 mb-4">
            <div class="absolute left-0 top-2 ps-timeline-dot" />
            <div class="flex items-center justify-between">
              <h5 class="text-xl font-bold text-[#1a3a8f]">People</h5>
              <PsButton variant="green" corners="full" size="sm" @click="showInvite = true">
                + Invite
              </PsButton>
            </div>
          </div>

          <!-- People list -->
          <div class="pl-8 mb-8">
            <PeopleList :party-space-id="partySpaceId" />
          </div>
        </div>

        <!-- Right column: Timeline + Venues -->
        <div class="flex-1 relative pl-4">
          <!-- Vertical timeline line -->
          <div class="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gray-300" />

          <!-- Time pill (aligned with People header row) -->
          <div class="relative pl-8 mb-4">
            <div class="absolute left-0 top-2 ps-timeline-dot" />
            <span class="inline-block text-white text-sm font-semibold px-5 py-2 rounded-full" style="background: linear-gradient(to bottom, #2a52c9 0%, #1a3a8f 50%, #0f2255 100%); box-shadow: 0 2px 6px rgba(26,58,143,0.35);">
              {{n formatTime(partySpace.timeStart) }}
            </span>
          </div>

          <!-- Venues section -->
          <div class="relative pl-8">
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-xl font-bold text-[#1a3a8f]">Venues</h5>
              <PsButton variant="green" corners="full" size="sm" @click="showVenueCreate = true">
                + Venue
              </PsButton>
            </div>
            <VenueList :party-space-id="partySpaceId" :party-space="partySpace" />
          </div>
        </div>
      </div>
    </div>

    <!-- Invite People modal -->
    <UiModal v-model="showInvite" title="Invite People">
      <PeopleForm :party-space-id="partySpaceId" @saved="showInvite = false" />
    </UiModal>

    <!-- Create Venue modal -->
    <UiModal v-model="showVenueCreate" title="Add Venue">
      <VenueCreate :party-space-id="partySpaceId" @saved="showVenueCreate = false" />
    </UiModal>
  </div>
</template>

<script setup>
const props = defineProps({
  partySpaceId: { type: Number, required: true }
})
defineEmits(['back'])

const { partySpaces } = usePartySpaces()

const partySpace = computed(() =>
  partySpaces.value.find((ps) => ps.id === props.partySpaceId)
)

const showInvite = ref(false)
const showVenueCreate = ref(false)

// Format "18:00" → "6:00pm"
const formatTime = (time) => {
  if (!time) return ''
  const [h, m] = time.split(':').map(Number)
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, '0')}${ampm}`
}
</script>

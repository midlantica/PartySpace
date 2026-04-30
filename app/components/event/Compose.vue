<template>
  <div>
    <!-- Back button -->
    <UiButton variant="null" corners="full" size="md" class="mb-5" @click="$emit('back')">
      <template #iconLeft>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
      </template>
      Back to Events
    </UiButton>

    <div v-if="event">
      <!-- Event detail card (full width) -->
      <EventDetail :party-space="event" class="mb-6" />

      <!-- Two-column layout: People (left) | Timeline + Venues (right) -->
      <div class="flex gap-0">
        <!-- Left column: People -->
        <div class="w-64 flex-shrink-0 relative">
          <!-- Vertical timeline line -->
          <div class="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gray-300" />

          <!-- People section header: dot + "People" + "+ Invite" all on one line -->
          <div class="relative pl-8 mb-4">
            <div class="absolute left-0 top-2 timeline-dot" />
            <div class="flex items-center justify-between">
              <h5 class="text-xl font-bold text-[#1a3a8f]">People</h5>
              <UiButton variant="green" corners="full" size="lg" @click="showInvite = true">
                + Invite
              </UiButton>
            </div>
          </div>

          <!-- People list -->
          <div class="pl-8 mb-8">
            <PeopleList :party-space-id="eventId" />
          </div>
        </div>

        <!-- Right column: Timeline + Venues -->
        <div class="flex-1 relative pl-4">
          <!-- Vertical timeline line -->
          <div class="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gray-300" />

          <!-- Venues section -->
          <div class="relative pl-8">
            <div class="flex items-center justify-between mb-4">
              <h5 class="text-xl font-bold text-[#1a3a8f]">Venues</h5>
              <UiButton variant="green" corners="full" size="lg" @click="showVenueCreate = true">
                + Venue
              </UiButton>
            </div>
            <VenueList :party-space-id="eventId" :party-space="event" />
          </div>
        </div>
      </div>
    </div>

    <!-- Invite People modal -->
    <UiModal v-model="showInvite" title="Invite People">
      <PeopleForm :party-space-id="eventId" @saved="showInvite = false" />
    </UiModal>

    <!-- Create Venue modal -->
    <UiModal v-model="showVenueCreate" title="Add Venue">
      <VenueCreate :party-space-id="eventId" @saved="showVenueCreate = false" />
    </UiModal>
  </div>
</template>

<script setup>
  const props = defineProps({
    eventId: { type: Number, required: true }
  })
  defineEmits(['back'])

  const { partySpaces } = usePartySpaces()

  const event = computed(() =>
    partySpaces.value.find((ps) => ps.id === props.eventId)
  )

  const showInvite = ref(false)
  const showVenueCreate = ref(false)
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

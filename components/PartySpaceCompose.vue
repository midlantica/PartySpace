<template>
  <div>
    <!-- Back button -->
    <button class="ps-btn-ghost mb-5 gap-2" @click="$emit('back')">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
      </svg>
      Back to PartySpaces
    </button>

    <div v-if="partySpace" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Left: PartySpace detail card -->
      <div class="lg:col-span-1">
        <PartySpaceComposeItem :party-space="partySpace" />
      </div>

      <!-- Middle: People -->
      <div class="lg:col-span-1">
        <div class="ps-card h-full">
          <div class="flex items-center justify-between mb-4">
            <h5 class="font-semibold text-gray-800">People</h5>
            <button class="ps-btn-primary text-xs py-1 px-3" @click="showInvite = true">
              ＋ Invite
            </button>
          </div>
          <PeopleList :party-space-id="partySpaceId" />
        </div>
      </div>

      <!-- Right: Venues -->
      <div class="lg:col-span-1">
        <div class="ps-card h-full">
          <div class="flex items-center justify-between mb-4">
            <h5 class="font-semibold text-gray-800">Venues</h5>
            <button class="ps-btn-green text-xs py-1 px-3" @click="showVenueCreate = true">
              ＋ Venue
            </button>
          </div>
          <VenueList :party-space-id="partySpaceId" :party-space="partySpace" />
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
</script>

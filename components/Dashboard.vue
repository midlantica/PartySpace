<template>
  <div>
    <!-- PartySpace List view -->
    <PartySpaceList
      v-if="activeView === 'list'"
      @compose="openCompose"
    />

    <!-- PartySpace Compose view -->
    <PartySpaceCompose
      v-else-if="activeView === 'compose'"
      :party-space-id="activePartySpaceId"
      @back="activeView = 'list'"
    />
  </div>
</template>

<script setup>
const activeView = ref('list')
const activePartySpaceId = ref(null)

const openCompose = (id) => {
  activePartySpaceId.value = id
  activeView.value = 'compose'
}

// Fetch all data on mount
const { fetchPartySpaces } = usePartySpaces()
const { fetchVenues } = useVenues()
const { fetchPartySpaceVenues } = usePartySpaceVenues()
const { fetchPeople } = usePeople()

onMounted(async () => {
  await Promise.all([
    fetchPartySpaces(),
    fetchVenues(),
    fetchPartySpaceVenues(),
    fetchPeople()
  ])
})
</script>

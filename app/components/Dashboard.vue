<template>
  <div>
    <!-- Event List view -->
    <EventList
      v-if="activeView === 'list'"
      @compose="openCompose"
    />

    <!-- Event Compose view -->
    <EventCompose
      v-else-if="activeView === 'compose'"
      :event-id="activeEventId"
      @back="activeView = 'list'"
    />
  </div>
</template>

<script setup>
  const activeView = ref('list')
  const activeEventId = ref(null)

  const openCompose = (id) => {
    activeEventId.value = id
    activeView.value = 'compose'
  }

  const { fetchPartySpaces } = usePartySpaces()
  const { fetchVenues } = useVenues()
  const { fetchPartySpaceVenues } = usePartySpaceVenues()
  const { fetchPeople } = usePeople()
  const { loggedIn } = useUserSession()

  const fetchAll = () => Promise.all([
    fetchPartySpaces(),
    fetchVenues(),
    fetchPartySpaceVenues(),
    fetchPeople()
  ])

  // Fetch on mount (client-side, session is available)
  onMounted(fetchAll)

  // Re-fetch if session becomes available after mount (e.g. hard reload race)
  watch(loggedIn, (val) => { if (val) fetchAll() })
</script>

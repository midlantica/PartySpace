<template>
  <div>
    <!-- Header row -->
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-2xl font-bold text-gray-800">My Events</h2>
      <UiButton variant="blue" corners="full" size="md" @click="showCreate = true">
        <template #iconLeft><span class="text-lg leading-none">＋</span></template>
        Add Event
      </UiButton>
    </div>

    <!-- Empty state -->
    <div v-if="myEvents.length === 0" class="text-center py-16 text-gray-400">
      <p class="text-5xl mb-4">🎉</p>
      <p class="text-lg font-medium">No events yet</p>
      <p class="text-sm mt-1">Click "Add Event" to plan your first event!</p>
    </div>

    <!-- Grid of cards -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <EventCard
        v-for="ps in myEvents"
        :key="ps.id"
        :party-space="ps"
        @click="$emit('compose', ps.id)"
      />
    </div>

    <!-- Create modal -->
    <UiModal v-model="showCreate" title="Add Event">
      <EventCreate @saved="showCreate = false" />
    </UiModal>
  </div>
</template>

<script setup>
  defineEmits(['compose'])

  const { partySpaces } = usePartySpaces()
  const { userId } = useAuth()

  const showCreate = ref(false)

  const myEvents = computed(() =>
    partySpaces.value.filter((ps) => ps.userId === userId.value)
  )
</script>

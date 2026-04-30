<template>
  <div class="rounded-sm border border-gray-200 bg-white shadow-sm mb-3 overflow-hidden">
    <!-- Header bar: [edit btn] [time label — flex-1] [× close] -->
    <div class="venue-header">
      <button
        class="flex items-center justify-center text-white opacity-80 hover:opacity-100 transition flex-shrink-0"
        title="Edit Venue"
        @click="showEdit = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m3.1 5.07c.14 0 .28.05.4.16l1.27 1.27c.23.22.23.57 0 .78l-1 1l-2.05-2.05l1-1c.1-.11.24-.16.38-.16m-1.97 1.74l2.06 2.06l-6.06 6.06H7.07v-2.06z"/></svg>
      </button>
      <span class="flex-1 text-sm font-semibold text-white">{{ formatTime(startTime) }}</span>
      <UiCloseBtn on="dark" title="Remove venue" @click="showConfirm = true" />
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
        <div v-if="venue.geourl" class="w-36 h-24 rounded-sm overflow-hidden flex-shrink-0">
          <iframe
            :src="venue.geourl"
            class="w-full h-full border-0"
            allowfullscreen
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Confirm remove -->
    <UiConfirm
      v-model="showConfirm"
      message="Are you sure you want to remove this venue?"
      @confirm="handleRemove"
    />

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
    partyRelationship: { type: Object, required: true },
    startTime: { type: String, required: true }
  })

  const { removePartySpaceVenue } = usePartySpaceVenues()
  const showEdit = ref(false)
  const showConfirm = ref(false)

  const formatTime = (time) => {
    if (!time) return ''
    const [h, m] = time.split(':').map(Number)
    const ampm = h >= 12 ? 'pm' : 'am'
    const hour = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')}${ampm}`
  }

  const handleRemove = async () => {
    await removePartySpaceVenue(props.partyRelationship.id)
  }
</script>

<style scoped>
  .venue-header {
    display: flex;
    align-items: center;
    background: linear-gradient(to bottom, #2a52c9 0%, #1a3a8f 50%, #0f2255 100%);
    border-radius: 0.125rem 0.125rem 0 0;
    padding: 0.5rem 0.75rem;
    gap: 0.5rem;
  }
</style>

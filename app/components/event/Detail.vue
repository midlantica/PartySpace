<template>
  <div class="ps-card">
    <div class="flex gap-4">
      <!-- Left: pencil edit button -->
      <div class="flex-shrink-0">
        <button
          class="flex items-center justify-center text-gray-400 opacity-80 hover:opacity-100 hover:text-[#1a3a8f] transition"
          title="Edit Event"
          @click="showEdit = true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2m3.1 5.07c.14 0 .28.05.4.16l1.27 1.27c.23.22.23.57 0 .78l-1 1l-2.05-2.05l1-1c.1-.11.24-.16.38-.16m-1.97 1.74l2.06 2.06l-6.06 6.06H7.07v-2.06z"/></svg>
        </button>
      </div>

      <!-- Center: event details -->
      <div class="flex-1 min-w-0">
        <h4 class="text-xl font-bold text-[#1a3a8f] mb-1">
          🎉 {{ partySpace.title }}
        </h4>
        <p class="text-sm font-bold text-gray-800 mb-0.5">Date: {{ formatDate(partySpace.dateStart) }}</p>
        <p class="text-sm font-bold text-gray-800 mb-3">Time: {{ formatTime(partySpace.timeStart) }}</p>
        <p class="text-sm text-gray-500 leading-relaxed">{{ partySpace.description }}</p>
      </div>

      <!-- Right: complete button box -->
      <div class="flex-shrink-0 w-36">
        <div class="border border-gray-200 rounded-sm p-3 text-center bg-gray-50 h-full flex flex-col items-center justify-center gap-2">
          <p class="text-xs text-gray-500 leading-snug">When you're done click this button</p>
          <UiButton variant="blue" corners="full" size="lg" class="w-full" @click="showComplete = true">
            Complete!
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Edit modal -->
    <UiModal v-model="showEdit" title="Edit Event">
      <EventEdit
        :party-space="partySpace"
        @saved="showEdit = false"
        @close="showEdit = false"
      />
    </UiModal>

    <!-- Complete modal -->
    <UiModal v-model="showComplete" title="Event Completed!">
      <EventCompleted
        :party-space="partySpace"
        @completed="showComplete = false"
      />
    </UiModal>
  </div>
</template>

<script setup>
  defineProps({
    partySpace: { type: Object, required: true }
  })

  const showEdit = ref(false)
  const showComplete = ref(false)

  // "18:00" → "6:00pm"
  const formatTime = (time) => {
    if (!time) return ''
    const [h, m] = time.split(':').map(Number)
    const ampm = h >= 12 ? 'pm' : 'am'
    const hour = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')}${ampm}`
  }

  // "2026-06-15" → "06-15-2026"
  const formatDate = (date) => {
    if (!date) return ''
    const [y, m, d] = date.split('-')
    return `${m}-${d}-${y}`
  }
</script>

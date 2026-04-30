<template>
  <div
    class="ps-card cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-150 group relative"
    @click="$emit('click')"
  >
    <!-- Delete X button -->
    <button
      class="absolute top-2 right-2 flex items-center justify-center text-gray-300 hover:text-gray-500 transition opacity-0 group-hover:opacity-100"
      title="Remove event"
      @click.stop="showConfirm = true"
    >
      <UiCloseBtn />
    </button>

    <div class="flex items-start justify-between mb-2">
      <h3 class="font-semibold text-gray-800 group-hover:text-[#1a3a8f] transition-colors">
        {{ partySpace.title }}
      </h3>
      <span
        v-if="partySpace.isComplete"
        class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-sm font-medium"
      >
        Complete
      </span>
    </div>
    <p class="text-sm text-gray-500 mb-1">
      <span class="font-medium text-gray-600">Date:</span> {{ formatDate(partySpace.dateStart) }}
    </p>
    <p class="text-sm text-gray-500 mb-2">
      <span class="font-medium text-gray-600">Time:</span> {{ formatTime(partySpace.timeStart) }}
    </p>
    <p class="text-xs text-gray-400 line-clamp-2">{{ partySpace.description }}</p>

    <!-- Confirm delete -->
    <UiConfirm
      v-model="showConfirm"
      message="Are you sure you want to remove this event?"
      @confirm="handleDelete"
    />
  </div>
</template>

<script setup>
  const props = defineProps({
    partySpace: { type: Object, required: true }
  })
  defineEmits(['click'])

  const { deletePartySpace } = usePartySpaces()
  const showConfirm = ref(false)

  const handleDelete = async () => {
    showConfirm.value = false
    await deletePartySpace(props.partySpace.id)
  }

  // "2026-06-15" → "06-15-2026"
  const formatDate = (date) => {
    if (!date) return ''
    const [y, m, d] = date.split('-')
    return `${m}-${d}-${y}`
  }

  // "18:00" → "6:00pm"
  const formatTime = (time) => {
    if (!time) return ''
    const [h, m] = time.split(':').map(Number)
    const ampm = h >= 12 ? 'pm' : 'am'
    const hour = h % 12 || 12
    return `${hour}:${String(m).padStart(2, '0')}${ampm}`
  }
</script>

<template>
  <div
    class="ps-card cursor-pointer hover:shadow-md hover:border-violet-200 transition-all duration-150 group"
    @click="$emit('click')"
  >
    <div class="flex items-start justify-between mb-2">
      <h3 class="font-semibold text-gray-800 group-hover:text-violet-700 transition-colors">
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
      <span class="font-medium text-gray-600">Date:</span> {{ partySpace.dateStart }}
    </p>
    <p class="text-sm text-gray-500 mb-2">
      <span class="font-medium text-gray-600">Time:</span> {{ partySpace.timeStart }}
    </p>
    <p class="text-xs text-gray-400 line-clamp-2">{{ partySpace.description }}</p>
  </div>
</template>

<script setup>
defineProps({
  partySpace: { type: Object, required: true }
})
defineEmits(['click'])
</script>

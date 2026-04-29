<template>
  <div class="ps-card">
    <!-- Edit pencil button -->
    <div class="flex justify-end mb-2">
      <button
        class="text-gray-400 hover:text-violet-600 transition p-1 rounded"
        title="Edit PartySpace"
        @click="showEdit = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </div>

    <h4 class="text-lg font-bold text-gray-800 mb-1">{{ partySpace.title }}</h4>
    <p class="text-sm text-gray-500 mb-0.5">
      <span class="font-medium text-gray-600">Date:</span> {{ partySpace.dateStart }}
    </p>
    <p class="text-sm text-gray-500 mb-2">
      <span class="font-medium text-gray-600">Time:</span> {{ partySpace.timeStart }}
    </p>
    <p class="text-xs text-gray-400 mb-4">{{ partySpace.description }}</p>

    <div class="border-t border-gray-100 pt-3 mt-2">
      <p class="text-xs text-gray-400 mb-2">When you're done, mark it complete:</p>
      <button class="ps-btn-blue w-full" @click="showComplete = true">
        PartySpace Complete! 🎉
      </button>
    </div>

    <!-- Edit modal -->
    <UiModal v-model="showEdit" title="Edit PartySpace">
      <PartySpaceEdit
        :party-space="partySpace"
        @saved="showEdit = false"
        @close="showEdit = false"
      />
    </UiModal>

    <!-- Complete modal -->
    <UiModal v-model="showComplete" title="PartySpace Completed!">
      <PartySpaceCompleted
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
</script>

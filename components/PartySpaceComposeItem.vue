<template>
  <div class="ps-card">
    <div class="flex gap-4">
      <!-- Left: pencil edit button -->
      <div class="flex-shrink-0">
        <PsButton variant="grey" corners="square" size="sm" title="Edit PartySpace" @click="showEdit = true">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </PsButton>
      </div>

      <!-- Center: party space details -->
      <div class="flex-1 min-w-0">
        <h4 class="text-xl font-bold text-[#1a3a8f] mb-1">
          🎉 {{ partySpace.title }}
        </h4>
        <p class="text-sm font-bold text-gray-800 mb-0.5">Date: {{ partySpace.dateStart }}</p>
        <p class="text-sm font-bold text-gray-800 mb-3">Time: {{ partySpace.timeStart }}</p>
        <p class="text-sm text-gray-500 leading-relaxed">{{ partySpace.description }}</p>
      </div>

      <!-- Right: complete button box -->
      <div class="flex-shrink-0 w-36">
        <div class="border border-gray-200 rounded-sm p-3 text-center bg-gray-50 h-full flex flex-col items-center justify-center gap-2">
          <p class="text-xs text-gray-500 leading-snug">When you're done click this button</p>
          <PsButton variant="blue" corners="square" size="sm" class="w-full" @click="showComplete = true">
            PartySpace Complete!
          </PsButton>
        </div>
      </div>
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

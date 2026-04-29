<template>
  <div class="text-center py-4">
    <div class="text-6xl mb-4">🎉</div>
    <p class="text-lg font-semibold text-gray-800 mb-2">Invites are on their way!</p>
    <p class="text-gray-500 mb-6">Have a great party!</p>
    <button
      class="ps-btn-blue px-8 py-3 text-base"
      :disabled="loading"
      @click="handleComplete"
    >
      {{ loading ? 'Saving…' : 'Woohoo! 🎊' }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  partySpace: { type: Object, required: true }
})
const emit = defineEmits(['completed'])
const { updatePartySpace } = usePartySpaces()

const loading = ref(false)

const handleComplete = async () => {
  loading.value = true
  try {
    await updatePartySpace({ ...props.partySpace, isComplete: true })
    emit('completed')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="$emit('update:modelValue', false)"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <!-- Panel -->
        <div class="relative bg-white rounded-lg shadow-2xl w-full max-w-sm z-10">
          <!-- Close X -->
          <div class="absolute top-3 right-3">
            <UiCloseBtn @click="$emit('update:modelValue', false)" />
          </div>

          <!-- Body -->
          <div class="px-6 pt-8 pb-6">
            <p class="text-gray-700 text-base mb-6">{{ message }}</p>
            <div class="flex justify-between gap-3">
              <UiButton variant="grey" corners="full" size="lg" @click="$emit('update:modelValue', false)">
                No
              </UiButton>
              <UiButton variant="blue" corners="full" size="lg" @click="$emit('confirm')">
                Yes
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
  defineProps({
    modelValue: { type: Boolean, default: false },
    message: { type: String, default: 'Are you sure?' }
  })
  defineEmits(['update:modelValue', 'confirm'])
</script>

<style scoped>
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.2s ease;
  }
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
</style>

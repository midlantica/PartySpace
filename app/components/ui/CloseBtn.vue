<template>
  <button
    type="button"
    v-bind="$attrs"
    :class="on === 'dark' ? 'close-btn close-btn--dark' : 'close-btn close-btn--light'"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="6 6 12 12" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        class="close-x"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m7 7l10 10M7 17L17 7"
      />
    </svg>
  </button>
</template>

<script setup>
  defineProps({
    on: {
      type: String,
      default: 'light',
      // 'light' = dark X on light bg | 'dark' = white X on dark bg
    },
  })
</script>

<style scoped>
  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0.2rem;
    cursor: pointer;
    border-radius: 0.25rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .close-x {
    stroke-width: 1.5;
    transition: stroke-width 0.15s ease, stroke 0.15s ease;
  }

  .close-btn--light { color: rgba(0, 0, 0, 0.3); }
  .close-btn--light:hover { color: rgba(0, 0, 0, 0.85); }
  .close-btn--light:hover .close-x { stroke-width: 2.5; }

  .close-btn--dark { color: rgba(255, 255, 255, 0.5); }
  .close-btn--dark:hover { color: #fff; }
  .close-btn--dark:hover .close-x { stroke-width: 2.5; }
</style>

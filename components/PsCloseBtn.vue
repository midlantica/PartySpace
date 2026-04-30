<template>
  <button
    type="button"
    :class="['ps-close-btn', `ps-close-btn--${on}`]"
    v-bind="$attrs"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="6 6 12 12" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        :stroke-width="hovered ? 2 : 1.5"
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

const hovered = ref(false)
</script>

<style scoped>
.ps-close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 0.2em;
  line-height: 1;
  font-size: 0.8rem;
  transition: color 0.15s ease;
  flex-shrink: 0;
}
/* Light background → dark X */
.ps-close-btn--light {
  color: rgba(0, 0, 0, 0.3);
}
.ps-close-btn--light:hover {
  color: rgba(0, 0, 0, 1);
}

/* Dark background → white X */
.ps-close-btn--dark {
  color: rgba(255, 255, 255, 0.7);
}
.ps-close-btn--dark:hover {
  color: #ffffff;
}

/* Thicker stroke on hover via SVG path transition */
.ps-close-btn svg path {
  transition: stroke-width 0.15s ease;
}
.ps-close-btn:hover svg path {
  stroke-width: 2;
}
</style>

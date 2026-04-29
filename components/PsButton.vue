<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['ps-btn', `ps-btn--${variant}`, `ps-btn--${corners}`, `ps-btn--${size}`, { 'ps-btn--disabled': disabled }]"
    v-bind="$attrs"
  >
    <span v-if="$slots.iconLeft" class="ps-btn__icon ps-btn__icon--left">
      <slot name="iconLeft" />
    </span>
    <slot />
    <span v-if="$slots.iconRight" class="ps-btn__icon ps-btn__icon--right">
      <slot name="iconRight" />
    </span>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'blue',
    // black | white | blue | green | grey | null
  },
  corners: {
    type: String,
    default: 'full',
    // full | med | square
  },
  size: {
    type: String,
    default: 'md',
    // sm | md | lg
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
/* ── Base ─────────────────────────────────────────────────────── */
.ps-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  border: none;
  outline: none;
  user-select: none;
  transition: background 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  white-space: nowrap;
  line-height: 1;
}

/* ── Corner variants ──────────────────────────────────────────── */
.ps-btn--full   { border-radius: 9999px; }
.ps-btn--med    { border-radius: 0.5rem; }
.ps-btn--square { border-radius: 0.125rem; }

/* ── Size variants ────────────────────────────────────────────── */
.ps-btn--sm { font-size: 0.75rem;  padding: 0.2rem  0.75rem 0.28rem; }
.ps-btn--md { font-size: 0.875rem; padding: 0.35rem 1rem    0.45rem; }
.ps-btn--lg { font-size: 1rem;     padding: 0.5rem  1.5rem  0.6rem;  }

/* ── Disabled ─────────────────────────────────────────────────── */
.ps-btn--disabled { opacity: 0.5; cursor: not-allowed; }

/* ── Icon helpers ─────────────────────────────────────────────── */
.ps-btn__icon { display: flex; align-items: center; }
.ps-btn__icon--left  { margin-left: -0.1rem; }
.ps-btn__icon--right { margin-right: -0.1rem; }

/* ── Variant: black ───────────────────────────────────────────── */
.ps-btn--black {
  color: #fff;
  background: linear-gradient(to bottom, #444 0%, #111 100%);
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
}
.ps-btn--black:hover:not(.ps-btn--disabled)  { background: linear-gradient(to bottom, #555 0%, #222 100%); }
.ps-btn--black:active:not(.ps-btn--disabled) { background: linear-gradient(to bottom, #111 0%, #000 100%); }

/* ── Variant: white ───────────────────────────────────────────── */
.ps-btn--white {
  color: #111;
  background: #fff;
  border: 1px solid #111;
}
.ps-btn--white:hover:not(.ps-btn--disabled)  { background: #f3f4f6; }
.ps-btn--white:active:not(.ps-btn--disabled) { background: #e5e7eb; }

/* ── Variant: blue (navy gradient) ───────────────────────────── */
.ps-btn--blue {
  color: #fff;
  background: linear-gradient(to bottom, #2a52c9 0%, #1a3a8f 50%, #0f2255 100%);
  box-shadow: 0 2px 6px rgba(26,58,143,0.35);
}
.ps-btn--blue:hover:not(.ps-btn--disabled)  {
  background: linear-gradient(to bottom, #3460d8 0%, #1e44a8 50%, #152e72 100%);
  box-shadow: 0 3px 8px rgba(26,58,143,0.45);
}
.ps-btn--blue:active:not(.ps-btn--disabled) { background: linear-gradient(to bottom, #1a3a8f 0%, #0f2255 100%); }

/* ── Variant: green ───────────────────────────────────────────── */
.ps-btn--green {
  color: #fff;
  background: linear-gradient(to bottom, #3d8b3d 0%, #2d6a2d 50%, #1b3f1b 100%);
  box-shadow: 0 2px 6px rgba(45,106,45,0.35);
}
.ps-btn--green:hover:not(.ps-btn--disabled)  {
  background: linear-gradient(to bottom, #4a9e4a 0%, #357a35 50%, #245424 100%);
  box-shadow: 0 3px 8px rgba(45,106,45,0.45);
}
.ps-btn--green:active:not(.ps-btn--disabled) { background: linear-gradient(to bottom, #2d6a2d 0%, #1b3f1b 100%); }

/* ── Variant: grey ────────────────────────────────────────────── */
.ps-btn--grey {
  color: #374151;
  background: linear-gradient(to bottom, #e5e7eb 0%, #d1d5db 100%);
}
.ps-btn--grey:hover:not(.ps-btn--disabled)  { background: linear-gradient(to bottom, #d1d5db 0%, #9ca3af 100%); }
.ps-btn--grey:active:not(.ps-btn--disabled) { background: linear-gradient(to bottom, #9ca3af 0%, #6b7280 100%); color: #fff; }

/* ── Variant: null (ghost) ────────────────────────────────────── */
.ps-btn--null {
  color: #1a3a8f;
  background: transparent;
  border: 1px solid #93c5fd;
}
.ps-btn--null:hover:not(.ps-btn--disabled)  { background: #eff6ff; }
.ps-btn--null:active:not(.ps-btn--disabled) { background: #dbeafe; }

/* ── Variant: danger ──────────────────────────────────────────── */
.ps-btn--danger {
  color: #fff;
  background: linear-gradient(to bottom, #f87171 0%, #ef4444 50%, #dc2626 100%);
  box-shadow: 0 2px 6px rgba(239,68,68,0.35);
}
.ps-btn--danger:hover:not(.ps-btn--disabled)  { background: linear-gradient(to bottom, #fca5a5 0%, #f87171 50%, #ef4444 100%); }
.ps-btn--danger:active:not(.ps-btn--disabled) { background: linear-gradient(to bottom, #ef4444 0%, #dc2626 100%); }
</style>

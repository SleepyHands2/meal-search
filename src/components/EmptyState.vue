<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
    <svg
      class="h-14 w-14 text-brand-300"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="14.5" cy="12" r="8" />
      <circle cx="14.5" cy="12" r="3.5" />
      <path d="M2.5 3v4a2 2 0 0 0 4 0V3" />
      <path d="M4.5 3v18" />
    </svg>
    <p class="max-w-md text-ink/70">{{ message }}</p>
  </div>
</template>

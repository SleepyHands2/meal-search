<script setup>
defineProps({
  message: {
    type: String,
    default: 'Something went wrong loading meals.',
  },
})

defineEmits(['retry'])
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
    <p class="max-w-md text-ink/70">{{ message }}</p>
    <button
      type="button"
      class="rounded-full bg-brand-500 px-6 py-2.5 font-bold text-white shadow-sm transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      @click="$emit('retry')"
    >
      Try again
    </button>
  </div>
</template>

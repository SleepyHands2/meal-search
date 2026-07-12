<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Search…',
  },
})

const emit = defineEmits(['update:modelValue', 'enter'])
</script>

<template>
  <div class="relative">
    <svg
      class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink/40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.35-4.35" />
    </svg>
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="w-full rounded-full border-cream-200 bg-white py-3 pl-11 pr-4 text-ink shadow-sm transition placeholder:text-ink/40 focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40"
      @input="emit('update:modelValue', $event.target.value)"
      @keyup.enter="emit('enter')"
    />
  </div>
</template>

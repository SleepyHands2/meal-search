<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <header class="pt-8">
    <h1 class="text-3xl font-bold text-ink sm:text-4xl">{{ title }}</h1>
    <p v-if="description" class="mt-2 max-w-2xl text-ink/70">{{ description }}</p>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
  },
)

const links = [
  { name: 'Home', label: 'Home' },
  { name: 'MealsByName', label: 'By Name' },
  { name: 'MealsByLetter', label: 'By Letter' },
  { name: 'Ingredients', label: 'Ingredients' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-cream-200 bg-cream-50/90 backdrop-blur">
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <RouterLink
        :to="{ name: 'Home' }"
        class="flex items-center gap-2 rounded-lg font-display text-2xl font-bold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      >
        <svg
          class="h-6 w-6 text-brand-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M7 2v7a3 3 0 0 0 3 3v10" />
          <path d="M4 2v5M10 2v5" />
          <path d="M17 2c-1.5 1.5-2.5 4-2.5 6.5 0 2 1 3.5 2.5 3.5v10" />
        </svg>
        <span>fork<span class="text-brand-600">ful</span></span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 md:flex" aria-label="Main">
        <RouterLink
          v-for="link in links"
          :key="link.name"
          :to="{ name: link.name }"
          class="rounded-full px-4 py-2 font-medium text-ink/70 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Mobile hamburger -->
      <button
        type="button"
        class="rounded-lg p-2 text-ink/80 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 md:hidden"
        aria-label="Toggle navigation menu"
        aria-controls="mobile-menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <svg
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          aria-hidden="true"
        >
          <template v-if="menuOpen">
            <path d="M6 6l12 12M18 6L6 18" />
          </template>
          <template v-else>
            <path d="M4 6h16M4 12h16M4 18h16" />
          </template>
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <nav v-if="menuOpen" id="mobile-menu" class="border-t border-cream-200 px-4 pb-4 pt-2 md:hidden" aria-label="Main">
      <RouterLink
        v-for="link in links"
        :key="link.name"
        :to="{ name: link.name }"
        class="block rounded-lg px-3 py-2 font-medium text-ink/70 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      >
        {{ link.label }}
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="postcss" scoped>
nav .router-link-active {
  @apply bg-brand-100 text-brand-800;
}
</style>

<script setup>
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-500 focus:px-6 focus:py-3 focus:font-bold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 focus:ring-offset-cream-50"
    >
      Skip to content
    </a>

    <NavMenu />

    <main id="main-content" tabindex="-1" class="mx-auto w-full max-w-6xl flex-1 px-4 outline-none sm:px-6">
      <RouterView />
    </main>

    <footer class="mt-16 border-t border-cream-200 bg-cream-100">
      <div
        class="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6"
      >
        <div>
          <p class="font-display text-xl font-bold text-ink">fork<span class="text-brand-600">ful</span></p>
          <p class="mt-1 text-sm text-ink/70">Find your next favorite meal.</p>
        </div>

        <nav aria-label="Footer">
          <ul class="space-y-1 text-sm">
            <li>
              <RouterLink
                :to="{ name: 'Home' }"
                class="rounded-sm text-ink/70 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
              >
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'Ingredients' }"
                class="rounded-sm text-ink/70 transition-colors hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
              >
                Ingredients
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="text-sm text-ink/70">
          <p>
            Recipe data from
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-sm text-brand-700 underline underline-offset-2 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
            >
              TheMealDB
            </a>
          </p>
          <p class="mt-1">© 2026 Forkful</p>
        </div>
      </div>
    </footer>
  </div>
</template>

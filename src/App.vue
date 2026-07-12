<script setup>
import NavMenu from '@/components/NavMenu.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NavMenu />

    <main class="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6">
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
              <RouterLink :to="{ name: 'Home' }" class="text-ink/70 transition-colors hover:text-brand-700">
                Home
              </RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'Ingredients' }" class="text-ink/70 transition-colors hover:text-brand-700">
                Ingredients
              </RouterLink>
            </li>
          </ul>
        </nav>

        <div class="text-sm text-ink/60">
          <p>
            Recipe data from
            <a
              href="https://www.themealdb.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-brand-700 underline underline-offset-2 transition-colors hover:text-brand-800"
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

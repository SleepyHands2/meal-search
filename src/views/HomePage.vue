<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useAPI from '@/composables/useAPI'
import MealList from '@/components/MealList.vue'
import SearchInput from '@/components/SearchInput.vue'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'

const { api } = useAPI()
const router = useRouter()

const heroQuery = ref('')
const meals = ref([])
const isLoading = ref(false)
const hasError = ref(false)

function goToSearch() {
  const name = heroQuery.value.trim()
  if (!name) return
  router.push({ name: 'MealsByName', params: { name } })
}

async function loadMeals() {
  isLoading.value = true
  hasError.value = false
  meals.value = []
  try {
    const responses = await Promise.all(Array.from({ length: 9 }, () => api.get('random.php')))
    const unique = new Map()
    for (const { data } of responses) {
      const meal = data.meals && data.meals[0]
      if (meal) unique.set(meal.idMeal, meal)
    }
    meals.value = [...unique.values()]
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(loadMeals)
</script>

<template>
  <section
    class="relative mt-8 overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 px-6 py-14 text-center sm:px-10 sm:py-20"
  >
    <div
      class="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand-100/70"
      aria-hidden="true"
    ></div>
    <div
      class="pointer-events-none absolute -bottom-20 -right-12 h-64 w-64 rounded-full bg-brand-200/40"
      aria-hidden="true"
    ></div>

    <div class="relative mx-auto max-w-2xl">
      <h1 class="text-4xl font-bold leading-tight text-ink sm:text-5xl">
        What are you cooking <span class="text-brand-600">today?</span>
      </h1>
      <p class="mx-auto mt-4 max-w-xl text-lg text-ink/70">
        Search hundreds of recipes by name, letter, or the ingredients already in your kitchen.
      </p>

      <div class="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
        <div class="flex-1">
          <SearchInput
            v-model="heroQuery"
            placeholder="Try “arrabiata” or “pancakes”…"
            label="Search recipes by name"
            @enter="goToSearch"
          />
        </div>
        <button
          type="button"
          class="rounded-full bg-brand-500 px-8 py-3 font-bold text-white shadow-sm transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
          @click="goToSearch"
        >
          Search
        </button>
      </div>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
        <span class="text-ink/70">Or explore:</span>
        <router-link
          :to="{ name: 'MealsByLetter' }"
          class="rounded-full border border-cream-200 bg-white px-4 py-1.5 font-bold text-ink transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
        >
          Browse A–Z
        </router-link>
        <router-link
          :to="{ name: 'Ingredients' }"
          class="rounded-full border border-cream-200 bg-white px-4 py-1.5 font-bold text-ink transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
        >
          Ingredients
        </router-link>
      </div>
    </div>
  </section>

  <section class="mt-12" aria-labelledby="inspiration-heading">
    <h2 id="inspiration-heading" class="text-2xl font-bold text-ink sm:text-3xl">Tonight's inspiration</h2>
    <p class="mt-2 text-ink/70">A fresh handful of random meals every time you visit.</p>

    <ErrorState v-if="hasError" @retry="loadMeals" />
    <MealList v-else-if="isLoading || meals.length" :meals="meals" :loading="isLoading"></MealList>
    <EmptyState v-else message="No meals to show right now. Try again in a moment."></EmptyState>
  </section>
</template>

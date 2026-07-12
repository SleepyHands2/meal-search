<script setup>
import { ref, onMounted, computed } from 'vue'
import useAPI from '@/composables/useAPI'
import SearchInput from '@/components/SearchInput.vue'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'

const { api } = useAPI()

const keyword = ref('')
const ingredients = ref([])
const isLoading = ref(false)
const hasError = ref(false)

async function loadIngredients() {
  isLoading.value = true
  hasError.value = false
  try {
    const { data } = await api.get('list.php?i=list')
    ingredients.value = data.meals || []
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

onMounted(loadIngredients)

const searchIngredients = computed(() => {
  if (!keyword.value) return ingredients.value

  return ingredients.value.filter((i) => i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase()))
})
</script>
<template>
  <div class="pt-8 text-brand-600">
    <h1 class="mb-4 text-4xl font-bold">Search Meals By Ingredients</h1>
  </div>

  <div class="py-4">
    <SearchInput v-model="keyword" placeholder="Filter ingredients…" />

    <ErrorState v-if="hasError" message="Something went wrong loading ingredients." @retry="loadIngredients" />

    <div v-else-if="isLoading" class="grid gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <div v-for="n in 8" :key="n" class="animate-pulse rounded-2xl border border-cream-200 bg-white p-4 shadow-sm">
        <div class="mx-auto h-24 w-24 rounded-full bg-cream-100"></div>
        <div class="mx-auto mt-3 h-4 w-2/3 rounded bg-cream-100"></div>
      </div>
    </div>

    <div v-else-if="searchIngredients.length" class="grid gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <router-link
        v-for="ingredient in searchIngredients"
        :key="ingredient.idIngredient"
        :to="{ name: 'MealsByIngredients', params: { ingredient: ingredient.strIngredient } }"
        class="group flex flex-col items-center rounded-2xl border border-cream-200 bg-white p-4 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      >
        <img
          :src="`https://www.themealdb.com/images/ingredients/${encodeURIComponent(
            ingredient.strIngredient,
          )}-small.png`"
          :alt="ingredient.strIngredient"
          loading="lazy"
          class="h-24 w-24 object-contain"
        />
        <h3 class="mt-2 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-600">
          {{ ingredient.strIngredient }}
        </h3>
      </router-link>
    </div>

    <EmptyState
      v-else
      :message="
        keyword ? `No ingredients match “${keyword}”. Try another search.` : 'No ingredients available right now.'
      "
    ></EmptyState>
  </div>
</template>

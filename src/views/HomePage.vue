<script setup>
import { ref, onMounted } from 'vue'
import useAPI from '@/composables/useAPI'
import MealList from '@/components/MealList.vue'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'

const { api } = useAPI()
const meals = ref([])
const isLoading = ref(false)
const hasError = ref(false)

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
  <div class="pt-8 text-brand-600">
    <h1 class="mb-4 text-4xl font-bold">Random Meals</h1>
  </div>

  <ErrorState v-if="hasError" @retry="loadMeals" />
  <MealList v-else-if="isLoading || meals.length" :meals="meals" :loading="isLoading"></MealList>
  <EmptyState v-else message="No meals to show right now. Try again in a moment."></EmptyState>
</template>

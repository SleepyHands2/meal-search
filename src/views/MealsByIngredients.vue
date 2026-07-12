<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import MealList from '../components/MealList.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'

const meals = computed(() => store.state.mealsByIngredient)

const route = useRoute()
const isLoading = ref(false)
const hasError = ref(false)

async function loadMeals() {
  if (!route.params.ingredient) {
    store.commit('setMealsByIngredient', [])
    return
  }

  isLoading.value = true
  hasError.value = false
  try {
    await store.dispatch('searchMealsByIngredient', route.params.ingredient)
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
    <h1 class="mb-4 text-4xl font-bold">Meals for {{ route.params.ingredient }}</h1>
  </div>

  <ErrorState v-if="hasError" @retry="loadMeals" />
  <MealList v-else-if="isLoading || meals.length" :meals="meals" :loading="isLoading"></MealList>
  <EmptyState
    v-else-if="route.params.ingredient"
    :message="`No meals found with ${route.params.ingredient}. Try another ingredient.`"
  ></EmptyState>
  <EmptyState v-else message="Pick an ingredient to see matching meals."></EmptyState>
</template>

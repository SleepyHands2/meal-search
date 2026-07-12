<script setup>
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import MealList from '../components/MealList.vue'

const meals = computed(() => store.state.mealsByIngredient)

const route = useRoute()

onMounted(() => {
  store.dispatch('searchMealsByIngredient', route.params.ingredient)
})
</script>
<template>
  <div class="pt-8 text-brand-600">
    <h1 class="mb-4 text-4xl font-bold">Meals for {{ route.params.ingredient }}</h1>
  </div>

  <MealList :meals="meals"></MealList>
</template>

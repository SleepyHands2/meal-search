<script setup>
import { computed, watch } from 'vue'
import store from '../store'
import { useRoute } from 'vue-router'
import MealList from '../components/MealList.vue'

const route = useRoute()
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const meals = computed(() => store.state.mealsByLetter)

watch(
  route,
  () => {
    store.dispatch('searchMealsByLetter', route.params.letter)
  },
  { immediate: true },
)
</script>
<template>
  <div class="pt-8 text-brand-600">
    <h1 class="mb-4 text-4xl font-bold">Search Meals By Letter</h1>
  </div>

  <div class="mt-2 flex justify-center gap-2">
    <router-link v-for="letter in letters" :key="letter" :to="{ name: 'MealsByLetter', params: { letter } }">
      {{ letter }}
    </router-link>
  </div>

  <MealList :meals="meals"></MealList>
</template>

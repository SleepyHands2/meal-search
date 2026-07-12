<script setup>
import { computed, ref, watch } from 'vue'
import store from '../store'
import { useRoute } from 'vue-router'
import MealList from '../components/MealList.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'

const route = useRoute()
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const meals = computed(() => store.state.mealsByLetter)

const isLoading = ref(false)
const hasError = ref(false)

async function loadMeals() {
  if (!route.params.letter) {
    store.commit('setMealsByLetter', [])
    return
  }

  isLoading.value = true
  hasError.value = false
  try {
    await store.dispatch('searchMealsByLetter', route.params.letter)
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.letter, loadMeals, { immediate: true })
</script>
<template>
  <div class="pt-8 text-brand-600">
    <h1 class="mb-4 text-4xl font-bold">Search Meals By Letter</h1>
  </div>

  <div class="mt-2 flex flex-wrap justify-center gap-2">
    <router-link
      v-for="letter in letters"
      :key="letter"
      :to="{ name: 'MealsByLetter', params: { letter } }"
      class="flex h-10 w-10 items-center justify-center rounded-full border font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      :class="
        letter === route.params.letter
          ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
          : 'border-cream-200 bg-cream-100 text-brand-600 hover:border-brand-500 hover:bg-brand-500 hover:text-white'
      "
    >
      {{ letter }}
    </router-link>
  </div>

  <ErrorState v-if="hasError" @retry="loadMeals" />
  <MealList v-else-if="isLoading || meals.length" :meals="meals" :loading="isLoading"></MealList>
  <EmptyState
    v-else-if="route.params.letter"
    :message="`No meals start with “${route.params.letter}”. Try another letter.`"
  ></EmptyState>
  <EmptyState v-else message="Pick a letter above to browse meals."></EmptyState>
</template>

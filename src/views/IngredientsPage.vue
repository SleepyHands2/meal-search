<script setup>
import { ref, onMounted, computed } from 'vue'
import useAPI from '@/composables/useAPI'

const { api } = useAPI()

const keyword = ref('')
const ingredients = ref([])

onMounted(() => {
  api.get('list.php?i=list').then(({ data }) => {
    ingredients.value = data.meals
  })
})

const searchIngredients = computed(() => {
  if (!keyword.value) return ingredients.value

  return ingredients.value.filter((i) => i.strIngredient.toLowerCase().includes(keyword.value.toLowerCase()))
})
</script>
<template>
  <div class="pt-8 text-brand-600">
    <h1 class="mb-4 text-4xl font-bold">Search Meals By Ingredients</h1>
  </div>

  <div class="p-10">
    <input
      v-model="keyword"
      type="text"
      class="mb-5 w-full rounded border-2 border-gray-200 bg-white"
      placeholder="Enter ingredient name"
    />

    <div class="grid grid-cols-4 gap-5">
      <router-link
        v-for="ingredient in searchIngredients"
        :key="ingredient.idIngredient"
        :to="{ name: 'MealsByIngredients', params: { ingredient: ingredient.strIngredient } }"
        class="roundedp-3 mb-3 block bg-white shadow"
      >
        <img :src="`https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-small.png`" />
        <h3 class="mb-2 text-2xl font-bold">{{ ingredient.strIngredient }}</h3>
      </router-link>
    </div>
  </div>
</template>

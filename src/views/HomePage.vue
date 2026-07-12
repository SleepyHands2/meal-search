<script setup>
import { ref, onMounted } from 'vue'
import useAPI from '@/composables/useAPI'
import MealList from '@/components/MealList.vue'

const { api } = useAPI()
const meals = ref([])

onMounted(() => {
  for (let index = 0; index < 9; index++) {
    api.get('random.php').then(({ data }) => meals.value.push(data.meals[0]))
  }
})
</script>

<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="mb-4 text-4xl font-bold">Random Meals</h1>
  </div>
  <MealList :meals="meals"></MealList>
</template>

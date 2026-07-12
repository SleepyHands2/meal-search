<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import MealList from '../components/MealList.vue'

const route = useRoute()
const keyword = ref('')
const meals = computed(() => store.state.searchedMeals)

function searchMeals() {
  if (keyword.value) {
    store.dispatch('searchMeals', keyword.value)
  } else {
    store.commit('setSearchedMeals', [])
  }
}

onMounted(() => {
  keyword.value = route.params.name

  if (keyword.value) {
    searchMeals()
  }
})
</script>
<template>
  <div class="p-8 pb-0 text-orange-500">
    <h1 class="mb-4 text-4xl font-bold">Search Meals By Name</h1>
  </div>

  <div class="p-8">
    <input
      v-model="keyword"
      type="text"
      class="w-full rounded border-2 border-gray-400 bg-white"
      placeholder="Enter Name"
      @change="searchMeals"
    />
  </div>

  <MealList :meals="meals"></MealList>
</template>

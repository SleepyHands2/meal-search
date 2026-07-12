<script setup>
defineProps({
  meal: {
    required: true,
    type: Object,
  },
})
</script>

<template>
  <div class="rounded-xl bg-white shadow">
    <router-link :to="{ name: 'MealDetails', params: { id: meal.idMeal } }">
      <img :src="meal.strMealThumb" class="h-48 w-full rounded-t-xl object-cover" />
    </router-link>
    <div class="">
      <h3 class="font-bold">{{ meal.strMeal }}</h3>
      <p class="mb-4 line-clamp-3">{{ meal.strInstructions }}</p>
    </div>
  </div>
</template>

<script setup>
import MealItem from './MealItem.vue'
import SkeletonCard from './SkeletonCard.vue'

defineProps({
  meals: {
    required: true,
    type: Array,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
    <template v-if="loading">
      <SkeletonCard v-for="n in 8" :key="n" />
    </template>
    <template v-else>
      <MealItem v-for="meal in meals" :key="meal.idMeal" :meal="meal"></MealItem>
    </template>
  </div>
</template>

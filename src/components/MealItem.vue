<script setup>
defineProps({
  meal: {
    required: true,
    type: Object,
  },
})
</script>

<template>
  <router-link
    :to="{ name: 'MealDetails', params: { id: meal.idMeal } }"
    class="group block overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
  >
    <div class="overflow-hidden">
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        loading="lazy"
        class="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div class="p-5">
      <h3 class="font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-600">
        {{ meal.strMeal }}
      </h3>
      <p v-if="meal.strInstructions" class="mt-2 text-sm text-ink/70 line-clamp-3">{{ meal.strInstructions }}</p>
    </div>
  </router-link>
</template>

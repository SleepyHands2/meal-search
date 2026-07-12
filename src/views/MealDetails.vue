<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useAPI from '@/composables/useAPI'
import EmptyState from '@/components/EmptyState.vue'
import ErrorState from '@/components/ErrorState.vue'

const { api } = useAPI()
const route = useRoute()
const router = useRouter()

const meal = ref(null)
const isLoading = ref(false)
const hasError = ref(false)
const notFound = ref(false)

async function loadMeal() {
  isLoading.value = true
  hasError.value = false
  notFound.value = false
  meal.value = null
  try {
    const { data } = await api.get(`lookup.php?i=${route.params.id}`)
    const found = data.meals && data.meals[0]
    if (found) {
      meal.value = found
      document.title = `${found.strMeal} · Forkful`
    } else {
      notFound.value = true
      document.title = 'Meal not found · Forkful'
    }
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(() => route.params.id, loadMeal, { immediate: true })

function goBack() {
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push({ name: 'Home' })
  }
}

const primaryTags = computed(() => {
  if (!meal.value) return []
  return [meal.value.strCategory, meal.value.strArea].filter(Boolean)
})

const extraTags = computed(() => {
  if (!meal.value || !meal.value.strTags) return []
  return meal.value.strTags
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
})

const ingredients = computed(() => {
  if (!meal.value) return []
  const rows = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal.value[`strIngredient${i}`] || '').trim()
    if (!ingredient) continue
    const measure = (meal.value[`strMeasure${i}`] || '').trim()
    rows.push({ ingredient, measure })
  }
  return rows
})

const instructionSteps = computed(() => {
  if (!meal.value || !meal.value.strInstructions) return []
  return meal.value.strInstructions
    .split(/\r?\n/)
    .map((step) => step.trim())
    .filter(Boolean)
})

const youtubeEmbedUrl = computed(() => {
  const url = meal.value && meal.value.strYoutube
  if (!url) return ''
  const watchMatch = url.match(/[?&]v=([\w-]+)/)
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/)
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`
  return ''
})
</script>

<template>
  <div class="pt-8">
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-full border border-cream-200 bg-cream-100 px-4 py-2 text-sm font-bold text-ink transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
      @click="goBack"
    >
      <span aria-hidden="true">←</span>
      Back
    </button>

    <ErrorState v-if="hasError" message="Something went wrong loading this meal." @retry="loadMeal" />

    <div v-else-if="isLoading" class="mt-6 animate-pulse" aria-hidden="true">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div class="aspect-square w-full rounded-2xl bg-cream-100"></div>
        <div class="space-y-4">
          <div class="h-10 w-3/4 rounded bg-cream-100"></div>
          <div class="flex gap-2">
            <div class="h-7 w-20 rounded-full bg-cream-100"></div>
            <div class="h-7 w-24 rounded-full bg-cream-100"></div>
          </div>
          <div class="h-6 w-40 rounded bg-cream-100"></div>
          <div class="space-y-3 pt-2">
            <div v-for="n in 6" :key="n" class="h-4 w-full rounded bg-cream-100"></div>
          </div>
        </div>
      </div>
      <div class="mt-10 space-y-3">
        <div class="h-6 w-40 rounded bg-cream-100"></div>
        <div v-for="n in 4" :key="n" class="h-4 w-full max-w-prose rounded bg-cream-100"></div>
      </div>
    </div>

    <EmptyState v-else-if="notFound" message="We couldn't find that meal. It may have been removed."></EmptyState>

    <article v-else-if="meal" class="mt-6">
      <div class="grid gap-8 lg:grid-cols-2 lg:items-start">
        <img
          :src="meal.strMealThumb"
          :alt="meal.strMeal"
          class="w-full rounded-2xl border border-cream-200 object-cover shadow-sm"
        />

        <div>
          <h1 class="text-3xl font-bold leading-tight text-ink sm:text-4xl">{{ meal.strMeal }}</h1>

          <div v-if="primaryTags.length || extraTags.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in primaryTags"
              :key="`primary-${tag}`"
              class="rounded-full bg-brand-100 px-3 py-1 text-sm font-bold text-brand-700"
            >
              {{ tag }}
            </span>
            <span
              v-for="tag in extraTags"
              :key="`extra-${tag}`"
              class="rounded-full border border-cream-200 bg-cream-100 px-3 py-1 text-sm text-ink/70"
            >
              {{ tag }}
            </span>
          </div>

          <section v-if="ingredients.length" class="mt-8" aria-labelledby="ingredients-heading">
            <h2 id="ingredients-heading" class="text-2xl font-bold text-ink">Ingredients</h2>
            <ul class="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              <li v-for="row in ingredients" :key="row.ingredient + row.measure" class="flex items-baseline gap-3">
                <span
                  class="h-1.5 w-1.5 shrink-0 translate-y-[-2px] rounded-full bg-brand-500"
                  aria-hidden="true"
                ></span>
                <span class="text-ink/80">
                  <span v-if="row.measure" class="font-bold text-ink">{{ row.measure }}</span>
                  {{ row.ingredient }}
                </span>
              </li>
            </ul>
          </section>

          <a
            v-if="meal.strSource"
            :href="meal.strSource"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-1 rounded-sm text-sm font-bold text-brand-700 underline underline-offset-2 transition-colors hover:text-brand-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
          >
            Original recipe
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <section v-if="instructionSteps.length" class="mt-10" aria-labelledby="instructions-heading">
        <h2 id="instructions-heading" class="text-2xl font-bold text-ink">Instructions</h2>

        <ol v-if="instructionSteps.length > 1" class="mt-4 max-w-prose space-y-4">
          <li v-for="(step, index) in instructionSteps" :key="index" class="flex gap-4">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
              aria-hidden="true"
            >
              {{ index + 1 }}
            </span>
            <p class="leading-relaxed text-ink/80">{{ step }}</p>
          </li>
        </ol>
        <p v-else class="mt-4 max-w-prose leading-relaxed text-ink/80">{{ instructionSteps[0] }}</p>
      </section>

      <section v-if="youtubeEmbedUrl" class="mt-10" aria-labelledby="video-heading">
        <h2 id="video-heading" class="text-2xl font-bold text-ink">Watch it made</h2>
        <div
          class="aspect-video mt-4 max-w-3xl overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 shadow-sm"
        >
          <iframe
            :src="youtubeEmbedUrl"
            :title="`Video recipe for ${meal.strMeal}`"
            class="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </section>
    </article>
  </div>
</template>

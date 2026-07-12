<script setup>
import { onMounted, onUnmounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import store from '../store'
import MealList from '../components/MealList.vue'
import SearchInput from '../components/SearchInput.vue'
import EmptyState from '../components/EmptyState.vue'
import ErrorState from '../components/ErrorState.vue'
import PageHeader from '../components/PageHeader.vue'

const route = useRoute()
const keyword = ref('')
const meals = computed(() => store.state.searchedMeals)

const isLoading = ref(false)
const hasError = ref(false)
const searchedTerm = ref('')
let debounceTimer = null

async function searchMeals() {
  clearTimeout(debounceTimer)
  const term = keyword.value.trim()

  if (!term) {
    store.commit('setSearchedMeals', [])
    searchedTerm.value = ''
    hasError.value = false
    isLoading.value = false
    return
  }

  if (term === searchedTerm.value && !hasError.value) return

  isLoading.value = true
  hasError.value = false
  try {
    await store.dispatch('searchMeals', term)
    searchedTerm.value = term
  } catch {
    hasError.value = true
  } finally {
    isLoading.value = false
  }
}

watch(keyword, () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(searchMeals, 400)
})

onMounted(() => {
  keyword.value = route.params.name || ''

  if (keyword.value) {
    searchMeals()
  }
})

onUnmounted(() => clearTimeout(debounceTimer))
</script>
<template>
  <PageHeader title="Search meals" description="Find recipes by name — start typing and we'll do the rest." />

  <div class="py-6">
    <SearchInput
      v-model="keyword"
      placeholder="Search meals by name…"
      label="Search meals by name"
      @enter="searchMeals"
    />
  </div>

  <ErrorState v-if="hasError" @retry="searchMeals" />
  <MealList v-else-if="isLoading || meals.length" :meals="meals" :loading="isLoading"></MealList>
  <EmptyState
    v-else-if="searchedTerm"
    :message="`No meals found for “${searchedTerm}”. Try another search.`"
  ></EmptyState>
</template>

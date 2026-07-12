import useAPI from '@/composables/useAPI'

const { api } = useAPI()

export function searchMeals({ commit }, keyword) {
  return api.get(`search.php?s=${encodeURIComponent(keyword)}`).then(({ data }) => {
    commit('setSearchedMeals', data.meals)
  })
}

export function searchMealsByLetter({ commit }, letter) {
  return api.get(`search.php?f=${encodeURIComponent(letter)}`).then(({ data }) => {
    commit('setMealsByLetter', data.meals)
  })
}

export function searchMealsByIngredient({ commit }, ingredient) {
  return api.get(`filter.php?i=${encodeURIComponent(ingredient)}`).then(({ data }) => {
    commit('setMealsByIngredient', data.meals)
  })
}

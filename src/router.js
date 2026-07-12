import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import MealsByName from './views/MealsByName.vue'
import MealsByLetter from './views/MealsByLetter.vue'
import MealsByIngredients from './views/MealsByIngredients.vue'
import MealDetails from './views/MealDetails.vue'
import IngredientsPage from './views/IngredientsPage.vue'
import NotFoundPage from './views/NotFoundPage.vue'

const routes = [
  { path: '/meal-search/', name: 'Home', component: HomePage, meta: { title: 'Forkful — Recipe Search' } },
  {
    path: '/meal-search/by-name/:name?',
    name: 'MealsByName',
    component: MealsByName,
    meta: { title: 'Search meals · Forkful' },
  },
  {
    path: '/meal-search/by-letter/:letter?',
    name: 'MealsByLetter',
    component: MealsByLetter,
    meta: { title: 'Browse by letter · Forkful' },
  },
  {
    path: '/meal-search/by-ingredient/:ingredient?',
    name: 'MealsByIngredients',
    component: MealsByIngredients,
    meta: { title: 'Meals by ingredient · Forkful' },
  },
  {
    path: '/meal-search/meal/:id',
    name: 'MealDetails',
    component: MealDetails,
    meta: { title: 'Recipe · Forkful' },
  },
  {
    path: '/meal-search/ingredients',
    name: 'Ingredients',
    component: IngredientsPage,
    meta: { title: 'Ingredients · Forkful' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: 'Page not found · Forkful' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Forkful'
})

export default router

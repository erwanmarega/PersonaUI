import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import FormStepper from '../src/components/FormStepper.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/form', component: FormStepper }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

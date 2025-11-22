import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import FormStepper from '../src/components/FormStepper.vue'
import Login from '../src/components/Login.vue'
import Signup from '../src/components/Signup.vue'
import SavedPersonas from '../src/components/SavedPersonas.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/form', component: FormStepper },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/saved-personas', component: SavedPersonas }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

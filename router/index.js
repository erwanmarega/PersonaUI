import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../pages/LandingPage.vue'
import FormStepper from '../src/components/FormStepper.vue'
import Login from '../src/components/Login.vue'
import Signup from '../src/components/Signup.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/form', component: FormStepper },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

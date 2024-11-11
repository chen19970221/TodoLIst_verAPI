import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import SignIn from '../views/SignIn.vue'
import List from '../views/List.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign_in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/list',
      name: 'List',
      component: List
    }
  ]
})

export default router

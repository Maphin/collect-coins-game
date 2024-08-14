import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/lose',
      name: 'lose',
      component: () => import('../views/LosePage.vue')
    },
    {
      path: '/win',
      name: 'win',
      component: () => import('../views/WinPage.vue')
    },
  ]
})

export default router

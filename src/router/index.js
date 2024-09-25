import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home/Home.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/Login/Login.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore();
  if (to.name !== 'login' && !store.isLoggedIn) {
    try {
      await store.checkToken()
      next({ path: to.path })
    } catch (error) {
      next({ name: 'login'})
    }
  } else {
    if (to.name === 'login' && store.isLoggedIn) {
      next({ name: 'home'})
    } else {
      next()        
    }
  }
})

export default router

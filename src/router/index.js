import {
  createWebHistory,
  createRouter
} from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  return !!token
}


// Глобальный навигационный хук
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const guestOnly = to.matched.some(record => record.meta.guestOnly)


  if (requiresAuth && !isAuthenticated()) {
    // Если маршрут требует авторизации, а пользователь не авторизован
    next({
      name: 'Login',
      query: {
        redirect: to.fullPath
      }
    })
  } else if (guestOnly && isAuthenticated()) {
    // Если маршрут только для гостей, а пользователь авторизован
    next({
      name: 'Home'
    })
  } else {
    next()
  }
})


export default router
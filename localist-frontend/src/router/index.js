import VueRouter from 'vue-router'
import Users from '@/components/Users.vue'
import Signin from '@/components/Signin.vue'
import Home from '@/components/Home.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
          path: '*',
          redirect: '/'
        },
        {
            path: '/',
            name: 'Signin',
            component: Signin
        },
        {
          path: '/users',
          name: 'Users',
          component: Users,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/home',
          name: 'Home',
          component: Home,
          meta: {
            requiresAuth: true
          }
        }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = true;

  if (requiresAuth && !currentUser) {
      next('/login')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default router;
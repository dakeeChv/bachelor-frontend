import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layouts/Index.vue'),
    children: [
      {
        path: '/dashboard',
        name: 'Dasdhboard',
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  {
    path: '/redcross/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

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
        component: () => import('@/views/Overview.vue')
      },
      {
        path: '/posts',
        name: 'Posts',
        component: () => import('@/views/Posts.vue'),
        children: [
          {
            path: '/posts/add',
            name: 'Add-Post',
            component: () => import('@/components/posts/AddPost.vue')
          },
          {
            path: '/posts/edit/:id',
            name: 'Edit-Post',
            component: () => import('@/components/posts/EditPost.vue')
          }
        ]
      },
      {
        path: '/guide',
        name: 'Guide',
        component: () => import('@/views/Guide.vue')
      },
      {
        path: '/guide/add',
        name: 'Add-Guide',
        component: () => import('@/components/guide/AddGuide.vue')
      },
      {
        path: '/guide/edit/:id',
        name: 'Add-Guide',
        component: () => import('@/components/guide/EditGuide.vue')
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

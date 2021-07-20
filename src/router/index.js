import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/auth/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/auth/SignIn.vue')
  },
  {
    path: '/redcross/login',
    name: 'Auth',
    component: () => import('@/views/auth/AuthAdmin.vue')
  },
  {
    path: '/dashboard',
    // redirect: '/dashboard',
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
        component: () => import('@/views/Posts.vue')
      },
      {
        path: '/posts/add',
        name: 'Add-Post',
        component: () => import('@/components/posts/AddPost.vue')
      },
      {
        path: '/posts/edit/:id',
        name: 'Edit-Post',
        component: () => import('@/components/posts/EditPost.vue')
      },
      {
        path: '/posts/view/:id',
        name: 'View-Post',
        component: () => import('@/components/posts/ViewPost.vue')
      },
      {
        path: '/activity',
        name: 'Activity',
        component: () => import('@/views/Activity.vue')
      },
      {
        path: '/address/add',
        name: 'Add-Address',
        component: () => import('@/components/activity/AddAddress.vue')
      },
      {
        path: '/activity/add/',
        name: 'Add-Activity',
        component: () => import('@/components/activity/AddActivity.vue')
      },
      {
        path: '/activity/edit/:id',
        name: 'Edit-Activity',
        component: () => import('@/components/activity/EditActivity.vue')
      },
      {
        path: '/activity/view/:id',
        name: 'View-Activity',
        component: () => import('@/components/activity/ViewActivity.vue')
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
        name: 'Edit-Guide',
        component: () => import('@/components/guide/EditGuide.vue')
      },
      {
        path: '/guide/view/:id',
        name: 'View-Guide',
        component: () => import('@/components/guide/ViewGuide.vue')
      },
      {
        path: '/allrequest',
        name: 'All-Request',
        component: () => import('@/components/request/AllRequest')
      }
    ]
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layouts/IndexClient.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/pages/Home.vue')
      },
      {
        path: '/news/view/:id',
        name: 'View-News',
        component: () => import('@/components/posts/ViewPost.vue')
      },
      {
        path: '/guides',
        name: 'View-Sugg',
        component: () => import('@/views/pages/Guide')
      },
      {
        path: '/guides/:id',
        name: 'View-gui',
        component: () => import('@/components/guide/ViewGuide')
      },
      {
        path: '/activity/calendar',
        name: 'Calendar-Activity',
        component: () => import('@/views/pages/Calendar')
      },
      {
        path: '/activity/:id',
        name: 'View-Activi',
        component: () => import('@/components/activity/ViewActivity')
      },
      {
        path: '/donor',
        name: 'Recoord-Donor',
        component: () => import('@/views/pages/Donor')
      },
      {
        path: '/history',
        name: 'History-Donation',
        component: () => import('@/views/pages/History')
      },
      {
        path: '/donor/history/detail',
        name: 'History-Detail',
        component: () => import('@/components/activity/ViewActivity')
      },
      {
        path: '/aboutus',
        name: 'About-Us',
        component: () => import('@/views/pages/AboutUs')
      },
      {
        path: '/myrequest',
        name: 'MyRequest',
        component: () => import('@/views/pages/MyRequest')
      },
      {
        path: '/myrequest/add',
        name: 'Add-MyRequest',
        component: () => import('@/components/pages/AddRequest')
      },
      {
        path: '/view/request/:id',
        name: 'View-Request',
        component: () => import('@/components/pages/ViewRequest')
      },
      {
        path: '/edit/request/:id',
        name: 'Edit-Request',
        component: () => import('@/components/pages/EditRequest')
      },
      {
        path: '/request/list',
        name: 'Public-Request',
        component: () => import('@/views/pages/PublicRequest')
      }
    ]
  },
  {
    path: '/error',
    component: () => import('@/views/error/error'),
    children: [
      {
        path: '/error/400',
        name: 'BadReq',
        component: () => import('@/views/error/400')
      },
      {
        path: '/error/401',
        name: 'Unauth',
        component: () => import('@/views/error/401')
      },
      {
        path: '/error/403',
        name: 'Forbidden',
        component: () => import('@/views/error/403')
      },
      {
        path: '/error/404',
        name: 'NotFound',
        component: () => import('@/views/error/404')
      },
      {
        path: '/error/408',
        name: 'ReqTimeout',
        component: () => import('@/views/error/408')
      },
      {
        path: '/error/500',
        name: 'UnexpectedErr',
        component: () => import('@/views/error/500')
      }
    ]
  },
  {
    path: '*',
    name: 'NotFoundPath',
    component: () => import('@/views/error/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

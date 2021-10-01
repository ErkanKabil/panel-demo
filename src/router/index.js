import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: 'guide',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
      hideForAuth: true,
    },
  },
  {
    path: '/guide',
    name: 'guide',
    component: () => import('@/views/pages/guide/index.vue'),
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/views/pages/report/index.vue'),
  },
  {
    path: '/member-list',
    name: 'member-list',
    component: () => import('@/views/pages/member/member-list/index.vue'),
  },
  {
    path: '/create-member',
    name: 'create-member',
    component: () => import('@/views/pages/member/create-member/index.vue'),
  },
  {
    path: '/report',
    name: 'report',
    component: () => import('@/views/pages/report/index.vue'),
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log(Vue)
    if (!store.getters.GET_LOGIN_INFO) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.hideForAuth)) {
    if (store.getters.GET_LOGIN_INFO) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

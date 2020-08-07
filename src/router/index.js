import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/2-2',
    name: 'axios请求方法',
    component: () => import('@/views/2-2')
  },
  {
    path: '/2-3',
    name: 'axios并发请求',
    component: () => import('@/views/2-3')
  },
  {
    path: '/contact-list',
    name: '联系人列表',
    component: () => import('@/views/ContactList')
  },
  {
    path: '/backTopOne',
    name: 'backTopOne',
    component: () => import('@/views/element_ui_custom_packaging/backTopOne')
  },
  {
    path: '/backTopTwo',
    name: 'backTopTwo',
    component: () => import('@/views/element_ui_custom_packaging/backTopTwo')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/element_ui_custom_packaging/login')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

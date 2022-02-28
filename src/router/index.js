import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from '@/router/routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_PROD : process.env.VUE_APP_LOCAL,
  routes,
  linkActiveClass: 'active'
})

export default router

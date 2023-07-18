import Vue from 'vue'
import VueRouter from 'vue-router'
import Network from '../views/main'
import login from '../views/login'
import admin from '../views/admin'
import choseFilter from "../views/settings.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'network',
    component: Network
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin
  },
  {
    path : '/settings',
    name: 'settings',
    component: choseFilter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainView from '../views/MainView.vue';
import Recruitment from '@/components/Recruitment/Recruitment-Mng.vue';
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/mng/mainview',
    name: 'MainView',
    component: MainView
  },
  {
    path: '/mng',
    name: 'Recruitment',
    component: Recruitment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

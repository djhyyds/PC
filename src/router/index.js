import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'home',
    component: HomeView,
    children: [{
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }, {
      path: '/risk',
      name: 'risk',
      component: () => import('../views/RiskLevel.vue')
    }, {
      path: '/details',
      name: 'details',
      component: () => import('../views/DetailsCode.vue')
    }, {
      path: "gu",
      name: 'gu',
      component: () => import('../views/gu.vue')
    }, {
      path: '*',
      component: () => import('../views/AboutView.vue')

    }]
  },
]

const router = new VueRouter({
  routes
})

export default router

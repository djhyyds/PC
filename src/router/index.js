import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/big',
    name: "big",
    component: () => import('../views/bigScreen/home.vue'),
  },
  {
    path: '',
    name: 'home',
    component: HomeView,
    children: [{
      path: '',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }, {
      path: 'risk',
      name: 'risk',
      component: () => import('../views/RiskLevel.vue')
    }, {
      path: 'details',
      name: 'details',
      component: () => import('../views/DetailsCode.vue')
    }, {
      path: "gu",
      name: 'gu',
      component: () => import('../views/gu.vue')
    }, {
      path: "list",
      name: 'list',
      component: () => import('../views/MonitoringList.vue')
    }, {
      path: '*',
      component: () => import('../views/AboutView.vue')
    }]
  },
  {
    path: '/sss',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    component: () => import('../views/404.vue')
  },
]
const router = new VueRouter({
  routes
})

export default router

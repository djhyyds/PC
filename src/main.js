import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

//大屏
import ItemWrap from './views/bigScreen/components/item-wrap/item-wrap.vue'

import Echart from './views/bigScreen/components/echart/index.vue'

// 自定义组件
Vue.component("Echart",Echart)
Vue.component("ItemWrap",ItemWrap)




Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

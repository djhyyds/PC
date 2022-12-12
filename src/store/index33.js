import Vue from 'vue'
import Vuex from 'vuex'
















import settings from './moudles/settings'
import json from '../../public/jsonData/index.json'
Vue.use(Vuex)
// const VuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })



export default new Vuex.Store({
  state: {
    res: null,
    json,
    date: (604800 / 7) * 30,
    ECres: null,
    sumList: null,
    show: false,
    setOption: ['全部'],
    search: ['全部'],
    nowDate: null,
    sum: null
  },

  getters: {
  },
  mutations: {
    DateChange(state, a) {
      state.date = a
    },
    SearchChange(state, a) {
      state.search = a
    },
    showChange(state) {
      state.show = true

    },
    resChange(state, e) {
      state.res = e.res
      state.nowDate = e.res[0].时间戳 * 1000
      state.ECres = e.ECres
      state.sum = e.sum
      state.sumList = e.sumList
      e.sum.forEach(item => {
        if (item[0] != 'ALL') {
          state.setOption.push(item[0])
        }
      })
    },

  },
  actions: {
  },
  modules: {
    settings
  }
})

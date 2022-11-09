import Vue from 'vue'
import Vuex from 'vuex'
import res from "../assets/qy_20221103.json";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    res,
    date: 86400
  },
  getters: {
  },
  mutations: {
    DateChange(state, a) {
      state.date = a
    }
  },
  actions: {
  },
  modules: {
  }
})

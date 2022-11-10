import Vue from 'vue'
import Vuex from 'vuex'
import res from "../assets/web_info.json";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    res,
    date: 604800,
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

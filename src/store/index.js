import Vue from 'vue'
import Vuex from 'vuex'
import res from "../assets/web_info.json";
import groupData from '../assets/web_data.json'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const VuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  state: {
    res,
    date: 691200,
    groupData,
    group: '未登录'
  },
  getters: {
  },
  mutations: {
    DateChange(state, a) {
      state.date = a
    },
    groupChange(state, a) {
      state.group = a
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [VuexLocal.plugin]
})

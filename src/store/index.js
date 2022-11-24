import Vue from 'vue'
import Vuex from 'vuex'
// import res from "../../public/jsonData/thData/web_info_投后-ALL.json"
// import ECres from '../../public/jsonData/thData/web_data_投后-ALL.json'
// import res from "../../public/jsonData/cgData/web_info_采购-ALL.json"
// import ECres from '../../public/jsonData/cgData/web_data_采购-ALL.json'
// import res from "../../public/jsonData/rfData/web_info_人法动态.json"
// import ECres from '../../public/jsonData/rfData/web_data_人法动态.json'
// import res from "../../public/jsonData/skData/web_info_数科-教育场景.json"
// import ECres from '../../public/jsonData/skData/web_data_数科-教育场景.json'
import res from "../../public/jsonData/allData/web_info_all.json"
import ECres from '../../public/jsonData/allData/web_data_all.json'
import settings from './moudles/settings'
import json from '../../public/jsonData/index.json'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    res,
    json,
    date: 604800,
    ECres,
    show: false,
    setOption: [],
    search: '全部',
  },

  getters: {
  },
  mutations: {
    DateChange (state, a) {
      state.date = a
    },
    SearchChange (state, a) {
      state.search = a
    },
    showChange (state, a) {
      state.show = true
      state.setOption = a
    }

  },
  actions: {
  },
  modules: {
    settings
  }
})

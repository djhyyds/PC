import Vue from 'vue'
import Vuex from 'vuex'
// import res from "../../public/jsonData/thData/web_info_投后-ALL.json"
// import ECres from '../../public/jsonData/thData/web_data_投后-ALL.json'
// import sum from '../../public/jsonData/thData/list_投后-ALL_add.json'
// import sumList from '../../public/jsonData/thData/list_投后-ALL_one_add.json'


// import res from "../../public/jsonData/cgData/web_info_采购-ALL.json"
// import ECres from '../../public/jsonData/cgData/web_data_采购-ALL.json'
// import sum from '../../public/jsonData/cgData/list_采购-ALL_add.json'
// import sumList from '../../public/jsonData/cgData/list_采购-ALL_one_add.json'


// import res from "../../public/jsonData/rfData/web_info_人法动态.json"
// import ECres from '../../public/jsonData/rfData/web_data_人法动态.json'
// import sum from '../../public/jsonData/rfData/list_人法动态_add.json'
// import sumList from '../../public/jsonData/rfData/list_人法动态_one_add.json'



// import res from "../../public/jsonData/skData/web_info_数科-教育场景.json"
// import ECres from '../../public/jsonData/skData/web_data_数科-教育场景.json'
// import sum from '../../public/jsonData/skData/list_数科-教育场景_add.json'
// import sumList from '../../public/jsonData/skData/list_数科-教育场景_one_add.json'


import res from "../../public/jsonData/allData/web_info_all.json"
import ECres from '../../public/jsonData/allData/web_data_all.json'
import sum from '../../public/jsonData/allData/list_ALL_add.json'
import sumList from '../../public/jsonData/allData/list_ALL_one_add.json'


import settings from './moudles/settings'
import json from '../../public/jsonData/index.json'
Vue.use(Vuex)
// const VuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })
export default new Vuex.Store({
  state: {
    res,
    json,
    date: (604800 / 7) * 30,
    ECres,
    sumList,
    show: true,
    setOption: [],
    search: ['全部'],
    nowDate: 1669953617000,
    sum
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

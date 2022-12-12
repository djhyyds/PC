import Vue from 'vue'
import Vuex from 'vuex'




// import res from '../../public/jsonData/allData/web_info_all-ALL.json'
// import ECres from '../../public/jsonData/allData/web_data_all-ALL.json'
// import sum from '../../public/jsonData/allData/list_all-ALL_add.json'
// import sumList from '../../public/jsonData/allData/list_all-ALL_one_add.json'

import res from '../../public/jsonData/cgData/web_info_cg-ALL.json'
import ECres from '../../public/jsonData/cgData/web_data_cg-ALL.json'
import sum from '../../public/jsonData/cgData/list_cg-ALL_add.json'
import sumList from '../../public/jsonData/cgData/list_cg-ALL_one_add.json'



// import res from '../../public/jsonData/gylData/web_info_gyl-ALL.json'
// import ECres from '../../public/jsonData/gylData/web_data_gyl-ALL.json'
// import sum from '../../public/jsonData/gylData/list_gyl-ALL_add.json'
// import sumList from '../../public/jsonData/gylData/list_gyl-ALL_one_add.json'


// import res from '../../public/jsonData/rfData/web_info_rf-ALL.json'
// import ECres from '../../public/jsonData/rfData/web_data_rf-ALL.json'
// import sum from '../../public/jsonData/rfData/list_rf-ALL_add.json'
// import sumList from '../../public/jsonData/rfData/list_rf-ALL_one_add.json'

// import res from '../../public/jsonData/skData/web_info_jy-ALL.json'
// import ECres from '../../public/jsonData/skData/web_data_jy-ALL.json'
// import sum from '../../public/jsonData/skData/list_jy-ALL_add.json'
// import sumList from '../../public/jsonData/skData/list_jy-ALL_one_add.json'


// import res from '../../public/jsonData/thData/web_info_th-ALL.json'
// import ECres from '../../public/jsonData/thData/web_data_th-ALL.json'
// import sum from '../../public/jsonData/thData/list_th-ALL_add.json'
// import sumList from '../../public/jsonData/thData/list_th-ALL_one_add.json'


import settings from './moudles/settings'
import json from '../../public/jsonData/index.json'
Vue.use(Vuex)
// const VuexLocal = new VuexPersistence({
//   storage: window.localStorage
// })


let nowDate = res[0].时间戳 * 1000
let setOption = ['全部']
sum.forEach(item => {
  if (item[0] != 'ALL') {
    setOption.push(item[0])
  }
})
export default new Vuex.Store({
  state: {
    res,
    json,
    date: (604800 / 7) * 30,
    ECres,
    sumList,
    show: false,
    setOption,
    search: ['全部'],
    nowDate,
    sum
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

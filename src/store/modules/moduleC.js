import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: {
    score: 0
  },
  mutations: {
    increment: state => state.score++,
    reset: state => (state.score = 0)
  },
  actions: {},
  modules: {}
})

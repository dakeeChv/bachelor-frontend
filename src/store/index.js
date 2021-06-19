import Vue from 'vue'
import Vuex from 'vuex'

import posts from './posts'
import guide from './guide'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000/'
  },
  mutations: {},
  actions: {},
  modules: {
    posts,
    guide
  }
})

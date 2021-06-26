import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import posts from './posts'
import guide from './guide'
import auth from './auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://localhost:3000/'
  },
  mutations: {},
  actions: {},
  modules: {
    posts,
    guide,
    auth
  },
  plugins: [createPersistedState()]
})

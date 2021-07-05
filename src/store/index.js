import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import posts from './posts'
import guide from './guide'
import auth from './auth'
import address from './address'
import activity from './activity'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'https://lbnbackend1.herokuapp.com/'
  },
  mutations: {},
  actions: {},
  modules: {
    posts,
    guide,
    auth,
    address,
    activity
  },
  plugins: [createPersistedState()]
})

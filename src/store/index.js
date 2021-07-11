import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import posts from './posts'
import guide from './guide'
import auth from './auth'
import address from './address'
import activity from './activity'
import authSocial from './authSocial'
import bloodGroup from './bloodGroup'

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
    auth,
    address,
    activity,
    authSocial,
    bloodGroup
  },
  plugins: [createPersistedState()]
})

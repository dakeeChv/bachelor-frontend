import api from '../api'
import router from '../router/index'

//response
/**
 * data:
 * {
 *    success: ...  //  ສຳເລັດຫຼືບໍ່
 *    message: ... // ຂໍ້ຄວາມແນບ
 *    data: []    // ຂໍ້ມູນທີ່ຕ້ອງການ
 * }
 */
export default {
  namespaced: true,
  state: {
    account: {},
    loginAcc: {},
    registerAcc: null,
    token: null
  },
  actions: {
    login({ commit, state }) {
      return api()
        .post('/adacc/login', state.loginAcc)
        .then((response) => {
          // console.log(response.headers)
          // console.log(response.data)
          // console.log(response.data['token'])
          commit('setAccount', response.data)
          commit('setToken', response.data['token'])
          return router.push({ path: '/dashboard' })
        })
    },
    logout({ commit }) {
      commit('setToken', null)
      return router.push({ path: '/login' })
    }
  },
  getters: {
    isLoggedIn(state) {
      return !!state.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // console.log(state.token)
    },
    setAccount(state, account) {
      state.account = account
      // console.log(state.account)
    }
  }
}

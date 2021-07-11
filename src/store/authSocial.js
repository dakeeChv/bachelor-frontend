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
    donorAcc: {},
    // isAuthorized: null,
    donorInfo: {},
    idToken: null,
    notice: {
      alert: false,
      donorExist: false,
      message: ''
    }
  },
  actions: {
    signUpDonor({ commit, state }) {
      return api()
        .post('users/signup', state.donorAcc)
        .then(({ data }) => {
          if (data.donorExist) {
            commit('setNotice', data)
            return setTimeout(() => {
              router.push({ path: '/signin' })
            }, 3000)
          }
          commit('setDonorInfo', data.data)
          commit('setdonorAcc', {})
          return router.push({ path: '/home' })
        })
    },
    signInDonor({ commit }) {
      return api()
        .get('users/signin')
        .then(({ data }) => {
          if (!data.donorExist && data.alert) {
            commit('setNotice', data)
            return setTimeout(() => {
              router.push({ path: '/signup' })
            }, 3000)
          }
          commit('setDonorInfo', data.data)
          return router.push({ path: '/home' })
        })
    },
    signout({ commit }) {
      commit('setIdToken', null)
      commit('setDonorInfo', {})
      commit('setdonorAcc', {})
      return router.push({ path: '/signin' })
    }
  },
  getters: {
    isSignIn(state) {
      return !!state.idToken
    }
  },
  mutations: {
    setdonorAcc(state, donorAcc) {
      state.donorAcc = donorAcc
    },
    setDonorInfo(state, donorInfo) {
      state.donorInfo = donorInfo
    },
    setIdToken(state, idToken) {
      state.idToken = idToken
    },
    setNotice(state, notice) {
      state.notice['alert'] = notice['alert']
      state.notice['donorExist'] = notice['donorExist']
      state.notice['message'] = notice['message']
      setTimeout(() => {
        state.notice['alert'] = false
        state.notice['donorExist'] = false
        state.notice['message'] = ''
      }, 5000)
    }
  }
}

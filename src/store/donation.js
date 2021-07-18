import api from '../api'
import router from '../router/index'
export default {
  namespaced: true,
  state: {
    histories: [],
    notice: {
      alert: false,
      message: ''
    }
  },
  actions: {
    record({ commit }, verifyCode) {
      return api()
        .post('donation/add', {
          verifyCode: verifyCode
        })
        .then(({ data }) => {
          // console.log(verifyCode)
          commit('setNotice', data)
          if (!data.alert) {
            return router.push({ path: '/home' })
          }
        })
    },
    fetchRecord({ commit }) {
      return api()
        .get('donation/')
        .then(({ data }) => {
          commit('setHistories', data.data)
        })
    }
  },
  getters: {},
  mutations: {
    setNotice(state, notice) {
      state.notice['alert'] = notice['alert']
      state.notice['message'] = notice['message']
      setTimeout(() => {
        state.notice['alert'] = false
        state.notice['message'] = ''
      }, 8000)
    },
    setHistories(state, histories) {
      state.histories = histories
      // console.log(histories)
    }
  }
}

import api from '../api'
import router from '../router/index'
export default {
  namespaced: true,
  state: {
    histories: [],
    historyOfEmer: [],
    notice: {
      alert: false,
      message: ''
    }
  },
  actions: {
    record({ commit }, { verifyCode, donorId }) {
      return api()
        .post('donation/add', {
          verifyCode: verifyCode,
          donorId: donorId
        })
        .then(({ data }) => {
          // console.log(verifyCode)
          commit('setNotice', data)
          if (!data.alert) {
            return router.push({ path: '/home' })
          }
        })
    },
    fetchRecord({ commit }, donorId) {
      return api()
        .get('donation/', { params: { donorId } })
        .then(({ data }) => {
          commit('setHistories', data.data)
        })
    },
    emergencyRecord({ commit }, { verifyCode, donorId }) {
      return api()
        .post('donate/emergency/add', {
          verifyCode: verifyCode,
          donorId: donorId
        })
        .then(({ data }) => {
          commit('setNotice', data)
          if (!data.alert) {
            return router.push({ path: '/home' })
          }
        })
    },
    fetchEmergencyRecord({ commit }, donorId) {
      // console.log(donorId)
      return api()
        .get('donate/emergency', { params: { donorId } })
        .then(({ data }) => {
          commit('setHistoryOfEmer', data.data)
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
    },
    setHistoryOfEmer(state, historyOfEmer) {
      state.historyOfEmer = historyOfEmer
    }
  }
}

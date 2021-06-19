import api from '../api'

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
    newGuide: {},
    currGuide: {},
    guides: [],
    notice: {
      alert: false,
      pending: false,
      message: '',
      error: false
    }
  },
  actions: {
    createGuide({ commit, state }) {
      return api()
        .post(`guide/add`, state.newGuide)
        .then(({ data }) => {
          commit('appendGuide', data.data)
          commit('setNewGuide', {})
          commit('setNotice', data.notice)
        })
    }
  },
  getters: {},
  mutations: {
    appendGuide(state, newGuide) {
      state.guides.unshift(newGuide)
    },
    setNewGuide(state, newGuide) {
      state.newGuide = newGuide
    },
    setNotice(state, notice) {
      state.notice['pending'] = false
      setTimeout(() => {
        state.notice['alert'] = notice.success
        state.notice['message'] = notice.message
      }, 1000)
      setTimeout(() => {
        state.notice['alert'] = false
        state.notice['message'] = ''
      }, 5000)
    }
  }
}

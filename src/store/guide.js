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
      message: ''
    }
  },
  actions: {
    fetchGuide({ commit }) {
      return api()
        .get(`guide/`)
        .then(({ data }) => {
          commit('setGuide', data.data)
        })
    },
    fetchCurrGuide({ commit, state }) {
      return api()
        .get(`guide/${state.currGuide._id}`)
        .then(({ data }) => {
          commit('setCurrGuide', data.data)
        })
    },
    createGuide({ commit, state }) {
      return api()
        .post(`guide/add`, state.newGuide)
        .then(({ data }) => {
          commit('appendGuide', data.data)
          commit('setNewGuide', {})
          commit('setNotice', data.notice)
        })
        .catch((err) => {
          if (err) {
            state.notice['pending'] = false
          }
        })
    },
    editGuide({ commit, state }) {
      return api()
        .patch(`guide/update/${state.currGuide._id}`, state.currGuide)
        .then(({ data }) => {
          commit('updateGuide', state.currGuide)
          commit('setCurrGuide', state.currGuide)
          commit('setNotice', data.notice)
        })
    },
    deleteGuide({ commit }, guide) {
      return api()
        .delete(`guide/delete/${guide._id}`)
        .then(({ data }) => {
          commit('removeGuide', guide)
          commit('setNotice', data.notice)
        })
    }
  },
  getters: {},
  mutations: {
    setGuide(state, guides) {
      state.guides = guides
    },
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
    },
    removeGuide(state, guide) {
      state.guides.splice(state.guides.indexOf(guide), 1)
    },
    setCurrGuide(state, guide) {
      state.currGuide = guide
    },
    updateGuide(state, currGuide) {
      state.guides.splice(state.guides.indexOf(currGuide), 1, currGuide)
    }
  }
}

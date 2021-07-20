import api from '../api'

export default {
  namespaced: true,
  state: {
    listRequestCli: [],
    allRequestAdm: [],
    helper: [],
    myRequest: [],
    newRequest: {},
    currRequest: {},
    notice: {
      pending: false,
      alert: false,
      message: ''
    }
  },
  actions: {
    createRequest({ commit, state }) {
      return api()
        .post('request/add', state.newRequest)
        .then(({ data }) => {
          commit('appendMyRequest', data.data)
          commit('setNotice', data.notice)
        })
    },
    fetchMyRequest({ commit }, requestor) {
      return api()
        .get('request/', {
          params: {
            requestor: requestor
          }
        })
        .then(({ data }) => {
          commit('setMyRequest', data.data)
        })
    },
    fetchCurrRequest({ commit, state }) {
      return api()
        .get(`request/${state.currRequest['_id']}`)
        .then(({ data }) => {
          commit('setCurrRequest', data.data)
        })
    },
    deleteRequest({ commit }, currRequest) {
      return api()
        .delete(`request/${currRequest._id}`)
        .then(({ data }) => {
          commit('removeRequest', currRequest)
          commit('setNotice', data.notice)
        })
    },
    editRequest({ commit, state }) {
      return api()
        .patch(`request/${state.currRequest['_id']}`, state.currRequest)
        .then(({ data }) => {
          commit('updateRequest', state.currRequest)
          commit('setCurrRequest', state.currRequest)
          commit('setNotice', data.notice)
        })
    },
    fetchFromAnother({ commit }, { donorId, bloodGroup }) {
      return api()
        .get('/request/client', {
          params: {
            donorId: donorId,
            bloodGroup: bloodGroup
          }
        })
        .then(({ data }) => {
          commit('setListRequest', data.data)
        })
    },
    fetchHelper({ commit }, requestor) {
      return api()
        .get('donate/helper', {
          params: {
            requestor: requestor
          }
        })
        .then(({ data }) => {
          commit('setHelper', data.data)
        })
    },

    //Admin
    fetchAllRequest({ commit }) {
      return api()
        .get('request/admin')
        .then(({ data }) => {
          commit('setAllRequest', data.data)
        })
    }
  },
  getters: {},
  mutations: {
    setMyRequest(state, myRequest) {
      state.myRequest = myRequest
    },
    setListRequest(state, listRequest) {
      state.listRequestCli = listRequest
    },
    appendMyRequest(state, newRequest) {
      state.myRequest.unshift(newRequest)
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
    setCurrRequest(state, currRequest) {
      state.currRequest = currRequest
    },
    removeRequest(state, currRequest) {
      state.myRequest.splice(state.myRequest.indexOf(currRequest), 1)
    },
    updateRequest(state, currRequest) {
      state.myRequest.splice(
        state.myRequest.indexOf(currRequest),
        1,
        currRequest
      )
    },
    setAllRequest(state, allRequest) {
      state.allRequestAdm = allRequest
    },
    setHelper(state, helper) {
      state.helper = helper
    }
  }
}

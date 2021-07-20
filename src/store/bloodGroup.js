import api from '../api'

export default {
  namespaced: true,
  state: {
    bloodGroup: []
  },
  actions: {
    fetchBloodGroup({ commit }) {
      return api()
        .get('bloodGroup/')
        .then(({ data }) => {
          commit('setBloodGroup', data.data)
        })
    }
  },
  getters: {},
  mutations: {
    setBloodGroup(state, bloodGroup) {
      state.bloodGroup = bloodGroup
    }
  }
}

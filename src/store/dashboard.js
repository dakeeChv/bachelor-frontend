import api from '../api'

export default {
  namespaced: true,
  state: {
    firstTime: [],
    twoUp: [],
    notice: {
      pending: false
    },
    countActivity: 0,
    AllDonate: 0,
    infoActivity: {},
    ListDonor: {},
    bloodbank: {}
  },
  actions: {
    fetchChart({ commit, state }, pickYear) {
      return api()
        .get('dashboard/chart', { params: { pickYear } })
        .then(({ data }) => {
          commit('setChart', data)
          //   console.log(data)
          commit('setCount', data)
          state.notice['pending'] = false
        })
    },
    fetchInfoActivity({ commit, state }, pickDate) {
      return api()
        .get('dashboard/activity', { params: { pickDate } })
        .then(({ data }) => {
          commit('setInfoActivity', data.data)
          state.notice['pending'] = false
        })
    },
    ListDonor({ commit }, activityId) {
      return api()
        .get('dashboard/donor/list', { params: { activityId } })
        .then(({ data }) => {
          commit('setListDonor', data.data)
          // console.log(data.data)
        })
    },
    fetchBloodBank({ commit, state }) {
      return api()
        .get('dashboard/bloodbank')
        .then(({ data }) => {
          commit('setBloodBank', data.data)
          // console.log(data.data)
          state.notice['pending'] = false
        })
    }
  },
  getters: {
    DonorOfMonth(state) {
      let M = new Date().getMonth()
      let Total = state.firstTime[M] + state.twoUp[M]
      return Total
    }
  },
  mutations: {
    setChart(state, chart) {
      state.firstTime = chart.firstTime
      state.twoUp = chart.twoUp
      //   console.log(state.firstTime)
      //   console.log(state.twoUp)
    },
    setCount(state, count) {
      state.countActivity = count.countActivity
      state.AllDonate = count.AllDonate
      //   console.log(count)
    },
    setInfoActivity(state, data) {
      state.infoActivity = data
    },
    setListDonor(state, data) {
      state.ListDonor = data
    },
    setBloodBank(state, data) {
      state.bloodbank = data
    }
  }
}

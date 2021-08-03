import api from '../api'
// import router from '../router/index'

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
    newActivity: {},
    activities: [],
    currActivity: {},
    notice: {
      alert: false,
      pending: false,
      message: ''
    },
    calendar: []
  },
  actions: {
    createActivity({ commit, state }) {
      return api()
        .post('activity/add', state.newActivity)
        .then(({ data }) => {
          commit('appendActivity', data.data)
          commit('setNewActivity', {})
          state.newActivity['title'] = ' '
          commit('setNotice', data.notice)
        })
    },
    fetchCurrActivity({ commit, state }) {
      return api()
        .get(`activity/${state.currActivity._id}`)
        .then(({ data }) => {
          commit('setCurrActivity', data.data)
        })
    },
    fetchActivity({ commit }) {
      return api()
        .get('activity/')
        .then(({ data }) => {
          commit('setActivity', data.data)
        })
    },
    deleteActivity({ commit }, activity) {
      return api()
        .delete(`activity/delete/${activity._id}`)
        .then(({ data }) => {
          commit('removeActivity', activity)
          commit('setNotice', data.notice)
        })
    },
    editActivity({ commit, state }) {
      return api()
        .patch(`activity/edit/${state.currActivity._id}`, state.currActivity)
        .then(({ data }) => {
          commit('updateGuide', state.currActivity)
          commit('setCurrActivity', state.currActivity)
          commit('setNotice', data.notice)
        })
    },
    fetchCalendar({ commit }, pickDate) {
      return api()
        .get('activity/calendar', { params: { pickDate } })
        .then(({ data }) => {
          // console.log(data.data)
          commit('setCalendar', data.data)
          commit('setNotice', data.notice)
        })
    }
  },
  getters: {},
  mutations: {
    setActivity(state, activities) {
      state.activities = activities
    },
    appendActivity(state, newActivity) {
      state.activities.unshift(newActivity)
    },
    setNewActivity(state, newActivity) {
      state.newActivity = newActivity
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
    removeActivity(state, activity) {
      state.activities.splice(state.activities.indexOf(activity), 1)
    },
    updateGuide(state, currActivity) {
      state.activities.splice(
        state.activities.indexOf(currActivity),
        1,
        currActivity
      )
    },
    setCurrActivity(state, currActivity) {
      state.currActivity = currActivity
    },
    setCalendar(state, calendar) {
      state.calendar = calendar
    }
    // setPickDate (state, pickDate) {
    //   state.pickDate = pickDate
    // }
  }
}

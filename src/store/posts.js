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
    newPost: {},
    currPost: {},
    posts: [],
    notice: {
      alert: false,
      pending: false,
      message: ''
    }
  },
  actions: {
    async fetchPost({ commit }) {
      return await api()
        .get(`post/read`)
        .then(({ data }) => {
          commit('setPost', data.data)
        })
    },
    fetchCurrPost({ commit }, idCurr) {
      return api()
        .get(`post/read/${idCurr}`)
        .then(({ data }) => {
          commit('setCurrPost', data.data)
        })
    },
    async createPost({ commit, state }) {
      return await api()
        .post('post/add', state.newPost)
        .then(({ data }) => {
          commit('appendPost', data.data)
          commit('setNewPost', {})
          commit('setNotice', data.notice)
        })
        .catch((err) => {
          if (err) {
            state.notice['pending'] = false
          }
        })
    },
    deletePost({ commit }, currPost) {
      return api()
        .delete(`post/delete/${currPost._id}`)
        .then(({ data }) => {
          commit('removePost', currPost)
          commit('setNotice', data.notice)
        })
    },
    editPost({ commit, state }) {
      return api()
        .patch(`post/update/${state.currPost._id}`, state.currPost)
        .then(({ data }) => {
          // console.log(state.currPost)
          commit('updatePost', state.currPost)
          commit('setCurrPost', state.currPost)
          commit('setNotice', data.notice)
        })
    }
  },
  getters: {},
  mutations: {
    setCurrPost(state, currPost) {
      state.currPost = currPost
    },
    setPost(state, posts) {
      state.posts = posts
    },
    appendPost(state, post) {
      state.posts.unshift(post)
    },
    setNewPost(state, newPost) {
      state.newPost = newPost
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
    removePost(state, currPost) {
      state.posts.splice(state.posts.indexOf(currPost), 1)
    },
    updatePost(state, currPost) {
      state.posts.splice(state.posts.indexOf(currPost), 1, currPost)
    }
  }
}

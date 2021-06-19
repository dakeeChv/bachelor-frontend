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
      message: '',
      error: null
    }
  },
  actions: {
    fetchPost({ commit }) {
      return api()
        .get(`news/read`)
        .then(({ data }) => {
          commit('setPost', data.data)
        })
    },
    fetchCurrPost({ commit }, idCurr) {
      return api()
        .get(`news/${idCurr}`)
        .then(({ data }) => {
          commit('setCurrPost', data.data)
        })
    },
    async createPost({ commit, state }) {
      return await api()
        .post('news/add', state.newPost)
        .then(({ data }) => {
          commit('appendPost', data.data)
          commit('setNewPost', {})
          commit('setNotice', data.notice)
        })
        .catch((err) => {
          state.notice['error'] = !!err
          setTimeout(() => {
            state.notice['error'] = !err
          }, 5000)
        })
    },
    deletePost({ commit, state }, currPost) {
      return api()
        .delete(`news/${currPost._id}`)
        .then(({ data }) => {
          commit('removePost', currPost)
          commit('setNotice', data.notice)
        })
        .catch((err) => {
          state.notice['error'] = !!err
          setTimeout(() => {
            state.notice['error'] = !err
          }, 5000)
        })
    },
    editPost({ commit, state }) {
      return api()
        .patch(`news/${state.currPost._id}`)
        .then(({ data }) => {
          console.log(data)
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
      state.posts.push(post)
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

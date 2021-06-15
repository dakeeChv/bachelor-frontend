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
    currPost: null,
    posts: []
  },
  actions: {
    fetchPost({ commit }) {
      return api()
        .get(`news/read`)
        .then(({ data }) => {
          commit('setPost', data.data)
        })
    },
    async createPost({ commit, state }) {
      return await api()
        .post('news/add', state.newPost)
        .then(({ data }) => {
          commit('appendPost', data.data)
          commit('setNewPost', {})
        })
    }
  },
  getters: {},
  mutations: {
    setPost(state, posts) {
      state.posts = posts
    },
    appendPost(state, post) {
      state.posts.push(post)
    },
    setNewPost(state, newPost) {
      state.newPost = newPost
    }
  }
}

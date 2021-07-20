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
    newAddress: {},
    addresses: [],
    currAddress: {}
  },
  actions: {
    createAddress({ commit, state }) {
      return api()
        .post('address/add', state.newAddress)
        .then(({ data }) => {
          commit('appendAddress', data.data)
          commit('setNewAddress', {})
          commit('setCurrAddress', data.data)
        })
    },
    fetchAddress({ commit }) {
      return api()
        .get('address/')
        .then(({ data }) => {
          commit('setAddresses', data.data)
        })
    }
  },
  getters: {},
  mutations: {
    appendAddress(state, newAddress) {
      state.addresses.unshift(newAddress)
    },
    setNewAddress(state, newAddress) {
      state.newAddress = newAddress
    },
    setCurrAddress(state, address) {
      state.currAddress = address
      // console.log(address)
    },
    setAddresses(state, addresses) {
      state.addresses = addresses
      // console.log(addresses)
    }
  }
}

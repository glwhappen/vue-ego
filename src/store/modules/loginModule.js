export default {
  namespaced: true,
  state: {
    userinfo: {
      username: '',
      token: ''
    }
  },
  mutations: {
    // 设置用户信息
    setUser(state, payload) {
      state.userinfo = payload
    },
    clearUser(state) {
      state.userinfo = {
        username: '',
        token: ''
      }
    }
  },
  actions: {

  },
  getters: {

  }
}

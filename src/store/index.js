import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: !!localStorage.getItem('_token'),
    access_token: localStorage.getItem('_token') || null,
  },
  getters: {
    GET_LOGIN_INFO(state) {
      return state.access_token !== null
    },
  },
  mutations: {
    AUTH_LOGIN_TOGGLE(state, payload) {
      state.authenticated = payload
    },
    SET_TOKEN(state, payload) {
      state.access_token = payload
    },
  },
  actions: {
    login(context, user) {
      return new Promise(resolve => {
        this._vm.$axios.post('login', {
          email: user?.email,
          password: user?.password,
        }).then(response => {
          const token = response?.data?.data?._token
          localStorage.setItem('_token', token)
          context.commit('AUTH_LOGIN_TOGGLE', true)
          context.commit('SET_TOKEN', token)

          resolve(response.data)
        }).catch(error => resolve(error))
      })
    },
    logOut(context) {
      localStorage.removeItem('_token')
      context.commit('AUTH_LOGIN_TOGGLE', false)
      context.commit('SET_TOKEN', null)
    },
    getMemberList(context) {
      return new Promise((resolve, reject) => {
        this._vm.$axios.post('members/getMembers', {}, {
          headers: { Authorization: `Bearer ${context?.state?.access_token}` },
        }).then(response => {
          resolve(response?.data)
        }).catch(error => reject(error))
      })
    },
    getDistricts(context, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios.get(`getDistrict?id=${payload?.city}`).then(response => {
          resolve(response?.data)
        }).catch(error => reject(error))
      })
    },
    getNeighborhoods(context, payload) {
      return new Promise((resolve, reject) => {
        this._vm.$axios.get(`getNeighborhood?id=${payload?.city}&district=${payload?.district}`).then(response => {
          resolve(response?.data)
        }).catch(error => reject(error))
      })
    },
  },
  modules: {},
})

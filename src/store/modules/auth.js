import axios from '../../services/axios'
import mutations from '../mutations'
import localStorageAdapter from '../../helpers/localStorageAdapter'
import { JWT_TOKEN_NAME } from '../../helpers/vars'

const {
  REGISTER_START,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  LOGIN_START,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  GET_CURRENTUSER_START,
  GET_CURRENTUSER_FAILURE,
  GET_CURRENTUSER_SUCCESS,
  LOGOUT,
} = mutations

export default {
  namespaced: true,
  state: {
    isLoading: false,
    user: null,
    errors: null,
    isLoggedIn: null,
  },
  getters: {
    getErrors: ({ errors }) => errors,
    getUser: ({ user }) => user,
    isLoggedIn: ({ isLoggedIn }) => isLoggedIn,
    isLoading: ({ isLoading }) => isLoading,
  },
  mutations: {
    [REGISTER_START](state) {
      state.errors = null
      state.user = null
      state.isLoading = true
    },
    [REGISTER_FAILURE](state, payload) {
      state.isLoading = false
      state.user = null
      state.errors = payload
    },
    [REGISTER_SUCCESS](state, payload) {
      state.user = payload
      state.isLoading = false
      state.isLoggedIn = true
    },
    [LOGIN_START](state) {
      state.user = null
      state.errors = null
      state.isLoading = true
    },
    [LOGIN_FAILURE](state, payload) {
      state.errors = payload
      state.isLoading = false
    },
    [LOGIN_SUCCESS](state, payload) {
      state.isLoggedIn = true
      state.user = payload
      state.isLoading = false
    },
    [GET_CURRENTUSER_START](state) {
      state.user = null
      state.isLoading = true
    },
    [GET_CURRENTUSER_FAILURE](state, payload) {
      state.errors = payload
      state.isLoading = false
    },
    [GET_CURRENTUSER_SUCCESS](state, payload) {
      state.user = payload
      state.isLoggedIn = true
      state.isLoading = false
    },
    [LOGOUT](state) {
      state.user = null
      state.isLoggedIn = false
    },
  },
  actions: {
    async register({ commit }, { email, password }) {
      commit(REGISTER_START)
      try {
        const res = await axios.register({ email, password })
        if (res.status === 200) {
          commit(REGISTER_SUCCESS, res.data)
          localStorageAdapter.set(JWT_TOKEN_NAME, res.data.token)
        }
      } catch (error) {
        if (error.response) {
          commit(REGISTER_FAILURE, error.response.data)
        } else {
          commit(REGISTER_FAILURE, error.toString())
        }
      }
    },
    async login({ commit }, creds) {
      commit(LOGIN_START)
      try {
        const res = await axios.login(creds)
        if (res.status === 200) {
          commit(LOGIN_SUCCESS, res.data)
          localStorageAdapter.set(JWT_TOKEN_NAME, res.data.token)
        }
      } catch (error) {
        if (error.response) {
          commit(LOGIN_FAILURE, error.response.data)
        } else {
          commit(LOGIN_FAILURE, error)
        }
      }
    },
    async getCurrentUser({ commit }) {
      commit(GET_CURRENTUSER_START)
      try {
        const res = await axios.getCurrentUser()
        if (res.status === 200) {
          commit(GET_CURRENTUSER_SUCCESS, res.data)
        }
      } catch (err) {
        commit(GET_CURRENTUSER_FAILURE, { errors: err.message })
      }
    },
    logout({ commit }) {
      localStorageAdapter.set(JWT_TOKEN_NAME, '')
      commit(LOGOUT)
    },
  },
}

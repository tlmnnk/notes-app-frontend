import axios from '../../services/axios'
import mutations from '../mutations'

const {
  ADD_NOTE_START,
  ADD_NOTE_SUCCESS,
  ADD_NOTE_FAILURE,
  GET_TASKS_START,
  GET_TASKS_FAILURE,
  GET_TASKS_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_START,
  DELETE_TASK_SUCCESS,
} = mutations

export default {
  namespaced: true,
  state: {
    isLoading: false,
    tasks: [],
    errors: null,
  },
  getters: {
    getErrors: ({ errors }) => errors,
    tasks: ({ tasks }) => tasks,
    isLoading: ({ isLoading }) => isLoading,
  },
  mutations: {
    [ADD_NOTE_START](state) {
      state.isLoading = true
    },
    [ADD_NOTE_FAILURE](state, payload) {
      state.isLoading = false
      state.errors = payload
    },
    [ADD_NOTE_SUCCESS](state, payload) {
      state.tasks.push(payload)
      state.isLoading = false
    },
    [GET_TASKS_START](state) {
      state.isLoading = true
    },
    [GET_TASKS_FAILURE](state, payload) {
      state.errors = payload
      state.isLoading = false
    },
    [GET_TASKS_SUCCESS](state, payload) {
      state.tasks = payload
      state.isLoading = false
    },
    [DELETE_TASK_START](state) {
      state.isLoading = true
    },
    [DELETE_TASK_FAILURE](state, payload) {
      state.errors = payload
      state.isLoading = false
    },
    [DELETE_TASK_SUCCESS](state, payload) {
      state.tasks = state.tasks.filter((task) => task.id !== payload)
      state.isLoading = false
    },
  },
  actions: {
    async addTask({ commit }, task) {
      try {
        const res = await axios.addTask(task)
        if (res.status === 200) {
          commit(ADD_NOTE_SUCCESS, res.data)
        }
      } catch (error) {
        if (error.response) {
          commit(ADD_NOTE_FAILURE, error.response.data)
        } else {
          commit(ADD_NOTE_FAILURE, error)
        }
      }
    },
    async getTasks({ commit }) {
      commit(GET_TASKS_START)
      try {
        const res = await axios.getTasks()
        if (res.status === 200) {
          commit(GET_TASKS_SUCCESS, res.data)
        }
      } catch (error) {
        if (error.response) {
          commit(GET_TASKS_FAILURE, error.response.data)
        } else {
          commit(GET_TASKS_FAILURE, error)
        }
      }
    },
    async deleteTask({ commit }, id) {
      commit(DELETE_TASK_START)
      try {
        const res = await axios.deleteTask(id)
        if (res.status === 200) {
          commit(DELETE_TASK_SUCCESS, id)
        }
      } catch (error) {
        if (error.response) {
          commit(DELETE_TASK_FAILURE, error.response.data)
        } else {
          commit(DELETE_TASK_FAILURE, error)
        }
      }
    },
  },
}

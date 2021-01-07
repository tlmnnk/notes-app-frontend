import axios from 'axios'
import { JWT_TOKEN_NAME } from '../helpers/vars'
import LocalStorageAdapter from '../helpers/localStorageAdapter'

axios.defaults.baseURL = 'http://localhost:3000/'

axios.interceptors.request.use((config) => {
  const token = LocalStorageAdapter.get(JWT_TOKEN_NAME)
  const authToken = token ? `Token ${token}` : ''
  config.headers.Authorization = authToken
  return config
})

const getCurrentUser = () => {
  return axios.get('/users')
}
const register = ({ email, password }) => {
  return axios.post('/users', { email, password })
}
const login = ({ email, password }) => {
  return axios.post('/users/login', { email, password })
}
const getTasks = () => {
  return axios.get('/tasks')
}
const addTask = ({ title, description }) => {
  return axios.post('/tasks', { title, description })
}
const deleteTask = (id) => {
  return axios.delete(`/tasks/${id}`)
}

export default {
  getCurrentUser,
  register,
  login,
  getTasks,
  addTask,
  deleteTask,
}

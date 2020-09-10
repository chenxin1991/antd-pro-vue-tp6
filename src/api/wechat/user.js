import { axios } from '@/utils/request'

const api = {
  User: '/User'
}

export default api

export function getUsers (parameter) {
  return axios({
    url: api.User,
    method: 'get',
    params: parameter
  })
}

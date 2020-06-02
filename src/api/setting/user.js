import { axios } from '@/utils/request'

const api = {
  user: '/systemUser'
}

export default api

export function getUsers (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

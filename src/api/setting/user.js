import { axios } from '@/utils/request'

const api = {
  user: '/systemUser'
}

export default api

export function addUser (parameter) {
  return axios({
    url: api.user,
    method: 'post',
    data: parameter
  })
}

export function editUser (parameter) {
  return axios({
    url: api.user + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function getUsers (parameter) {
  return axios({
    url: api.user,
    method: 'get',
    params: parameter
  })
}

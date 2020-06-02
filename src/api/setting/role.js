import { axios } from '@/utils/request'

const api = {
  role: '/role'
}

export default api

export function addRole (parameter) {
  return axios({
    url: api.role,
    method: 'post',
    data: parameter
  })
}

export function editRole (parameter) {
  return axios({
    url: api.role + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delRole (parameter) {
  return axios({
      url: api.role + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getRoles (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

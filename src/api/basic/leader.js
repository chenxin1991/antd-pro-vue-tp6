import { axios } from '@/utils/request'

const api = {
  Leader: '/Leader'
}

export default api

export function addLeader (parameter) {
  return axios({
    url: api.Leader,
    method: 'post',
    data: parameter
  })
}

export function editLeader (parameter) {
  return axios({
    url: api.Leader + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delLeader (parameter) {
  return axios({
      url: api.Leader + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getLeaders (parameter) {
  return axios({
    url: api.Leader,
    method: 'get',
    params: parameter
  })
}

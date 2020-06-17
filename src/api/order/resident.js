import { axios } from '@/utils/request'

const api = {
  ResidentOrder: '/ResidentOrder'
}

export default api

export function addResidentOrder (parameter) {
  return axios({
    url: api.ResidentOrder,
    method: 'post',
    data: parameter
  })
}

export function editResidentOrder (parameter) {
  return axios({
    url: api.ResidentOrder + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delResidentOrder (parameter) {
  return axios({
      url: api.ResidentOrder + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getResidentOrders (parameter) {
  return axios({
    url: api.ResidentOrder,
    method: 'get',
    params: parameter
  })
}

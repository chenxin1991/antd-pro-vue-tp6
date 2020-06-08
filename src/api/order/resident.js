import { axios } from '@/utils/request'

const api = {
  residentOrder: '/residentOrder'
}

export default api

export function addResidentOrder (parameter) {
  return axios({
    url: api.residentOrder,
    method: 'post',
    data: parameter
  })
}

export function editResidentOrder (parameter) {
  return axios({
    url: api.residentOrder + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delResidentOrder (parameter) {
  return axios({
      url: api.residentOrder + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getResidentOrders (parameter) {
  return axios({
    url: api.residentOrder,
    method: 'get',
    params: parameter
  })
}

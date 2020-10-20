import { axios } from '@/utils/request'

const api = {
  CompanyOrder: '/CompanyOrder'
}

export default api

export function addCompanyOrder (parameter) {
  return axios({
    url: api.CompanyOrder,
    method: 'post',
    data: parameter
  })
}

export function editCompanyOrder (parameter) {
  return axios({
    url: api.CompanyOrder + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delCompanyOrder (parameter) {
  return axios({
      url: api.CompanyOrder + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getCompanyOrders (parameter) {
  return axios({
    url: api.CompanyOrder,
    method: 'get',
    params: parameter
  })
}

export function dispatchCompanyOrder (parameter) {
  return axios({
    url: api.CompanyOrder + '/dispatch/' + parameter.id,
    method: 'post',
    data: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  role: '/common/getRoles',
  car: '/common/getCars',
  on_off_good: '/common/getOnOffGoods',
  large_good: '/common/getLargeGoods'
}

export default api

export function getRoles (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getCars (parameter) {
  return axios({
    url: api.car,
    method: 'get',
    params: parameter
  })
}

export function getOnOffGoods (parameter) {
  return axios({
    url: api.on_off_good,
    method: 'get',
    params: parameter
  })
}

export function getLargeGoods (parameter) {
  return axios({
    url: api.large_good,
    method: 'get',
    params: parameter
  })
}

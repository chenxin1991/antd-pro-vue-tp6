import { axios } from '@/utils/request'

const api = {
  car: '/car'
}

export default api

export function addCar (parameter) {
  return axios({
    url: api.car,
    method: 'post',
    data: parameter
  })
}

export function editCar (parameter) {
  return axios({
    url: api.car + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delCar (parameter) {
  return axios({
      url: api.car + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getCars (parameter) {
  return axios({
    url: api.car,
    method: 'get',
    params: parameter
  })
}

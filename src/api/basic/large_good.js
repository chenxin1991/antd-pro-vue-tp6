import { axios } from '@/utils/request'

const api = {
  LargeGood: '/LargeGood'
}

export default api

export function addLargeGood (parameter) {
  return axios({
    url: api.LargeGood,
    method: 'post',
    data: parameter
  })
}

export function editLargeGood (parameter) {
  return axios({
    url: api.LargeGood + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delLargeGood (parameter) {
  return axios({
      url: api.LargeGood + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getLargeGoods (parameter) {
  return axios({
    url: api.LargeGood,
    method: 'get',
    params: parameter
  })
}

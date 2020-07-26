import { axios } from '@/utils/request'

const api = {
  Goods: '/Goods'
}

export default api

export function addGoods (parameter) {
  return axios({
    url: api.Goods,
    method: 'post',
    data: parameter
  })
}

export function editGoods (parameter) {
  return axios({
    url: api.Goods + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delGoods (parameter) {
  return axios({
      url: api.Goods + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getGoods (parameter) {
  return axios({
    url: api.Goods,
    method: 'get',
    params: parameter
  })
}

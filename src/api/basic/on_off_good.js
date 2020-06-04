import { axios } from '@/utils/request'

const api = {
  OnOffGood: '/OnOffGood'
}

export default api

export function addOnOffGood (parameter) {
  return axios({
    url: api.OnOffGood,
    method: 'post',
    data: parameter
  })
}

export function editOnOffGood (parameter) {
  return axios({
    url: api.OnOffGood + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delOnOffGood (parameter) {
  return axios({
      url: api.OnOffGood + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getOnOffGoods (parameter) {
  return axios({
    url: api.OnOffGood,
    method: 'get',
    params: parameter
  })
}

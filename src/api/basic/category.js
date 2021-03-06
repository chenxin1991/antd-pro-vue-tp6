import { axios } from '@/utils/request'

const api = {
  Category: '/Category'
}

export default api

export function addCategory (parameter) {
  return axios({
    url: api.Category,
    method: 'post',
    data: parameter
  })
}

export function editCategory (parameter) {
  return axios({
    url: api.Category + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function delCategory (parameter) {
  return axios({
      url: api.Category + '/' + parameter.id,
      method: 'delete',
      data: parameter
  })
}

export function getCategorys (parameter) {
  return axios({
    url: api.Category,
    method: 'get',
    params: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  add: '/role/add',
  edit: '/role/edit'
}

export default api

export function roleAdd (parameter) {
  return axios({
    url: api.add,
    method: 'post',
    data: parameter
  })
}

export function roleEdit (parameter) {
  return axios({
    url: api.edit + '/' + parameter.id,
    method: 'post',
    data: parameter
  })
}

import { axios } from '@/utils/request'

const api = {
  Setting: '/Setting'
}

export default api

export function editSetting (parameter) {
  return axios({
    url: api.Setting + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function getSetting (parameter) {
  return axios({
    url: api.Setting + '/' + parameter.id,
    method: 'get',
    params: parameter
  })
}

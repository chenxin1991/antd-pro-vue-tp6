import { axios } from '@/utils/request'

const api = {
  Setting: '/Setting'
}

export default api

export function editSetting (parameter) {
  return axios({
    url: api.Setting,
    method: 'put',
    data: parameter
  })
}

export function getSetting (parameter) {
  return axios({
    url: api.Setting,
    method: 'get',
    params: parameter
  })
}

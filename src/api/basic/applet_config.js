import { axios } from '@/utils/request'

const api = {
  AppletConfig: '/AppletConfig'
}

export default api

export function editAppletConfig (parameter) {
  return axios({
    url: api.AppletConfig + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function getAppletConfig (parameter) {
  return axios({
    url: api.AppletConfig + '/' + parameter.id,
    method: 'get',
    params: parameter
  })
}

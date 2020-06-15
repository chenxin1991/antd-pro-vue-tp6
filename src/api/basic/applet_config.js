import { axios } from '@/utils/request'

const api = {
  applet_config: '/applet_config'
}

export default api

export function editAppletConfig (parameter) {
  return axios({
    url: api.applet_config + '/' + parameter.id,
    method: 'put',
    data: parameter
  })
}

export function getAppletConfig (parameter) {
  return axios({
    url: api.applet_config + '/' + parameter.id,
    method: 'get',
    params: parameter
  })
}

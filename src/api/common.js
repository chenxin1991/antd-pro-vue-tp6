import { axios } from '@/utils/request'

const api = {
  role: '/common/getRoles'
}

export default api

export function getRoles (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

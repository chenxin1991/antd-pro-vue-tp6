import { axios } from '@/utils/request'

const api = {
  telephone: '/Statistics/telephone'
}

export default api

export function Telephone (parameter) {
  return axios({
    url: api.telephone,
    method: 'get',
    params: parameter
  })
}

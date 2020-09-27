import { axios } from '@/utils/request'

const api = {
  telephone: '/Statistics/telephone',
  partner: '/Statistics/partner'
}

export default api

export function Telephone (parameter) {
  return axios({
    url: api.telephone,
    method: 'get',
    params: parameter
  })
}

export function Partner (parameter) {
  return axios({
    url: api.partner,
    method: 'get',
    params: parameter
  })
}

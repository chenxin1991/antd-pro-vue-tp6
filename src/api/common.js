import { axios } from '@/utils/request'

const api = {
  role: '/common/getRoles',
  car: '/common/getCars',
  goods: '/common/getGoods',
  setting: '/common/getSetting',
  leader: '/common/getLeaders',
  category: '/common/getCategory',
  projectLeader: '/common/getProjectLeader'
}

export default api

export function getRoles (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getCars (parameter) {
  return axios({
    url: api.car,
    method: 'get',
    params: parameter
  })
}

export function getGoods (parameter) {
  return axios({
    url: api.goods,
    method: 'get',
    params: parameter
  })
}

export function getSetting (parameter) {
  return axios({
    url: api.setting,
    method: 'get',
    params: parameter
  })
}

export function getLeaders (parameter) {
  return axios({
    url: api.leader,
    method: 'get',
    params: parameter
  })
}

export function getCategory (parameter) {
  return axios({
    url: api.category,
    method: 'get',
    params: parameter
  })
}

export function getProjectLeader (parameter) {
  return axios({
    url: api.projectLeader,
    method: 'get',
    params: parameter
  })
}

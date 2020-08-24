import { request } from 'umi';
import { TableListParams } from "./data"

export async function queryUser(params?: TableListParams) {
  return request('/api/v1/base/users/?page=1&test=3', {
    params,
  });
}

export async function queryUserByID(params: string) {
  return request(`/api/v1/base/users/${params}`)
}

export async function getDeptTree(params?: any) {
  return request('/api/v1/base/dept-tree', {
    params
  });
}

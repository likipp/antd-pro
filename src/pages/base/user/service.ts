import { request } from 'umi';
import { TableListParams, UserStatus, UserInfo } from './data';

export async function queryUser(params?: TableListParams) {
  return request('/api/v1/base/users/?page=1&test=3', {
    params,
  });
}

export async function queryUserByID(params: string) {
  return request(`/api/v1/base/users/${params}`);
}

export async function getDeptTree(params?: any) {
  return request('/api/v1/base/dept-tree', {
    params,
  });
}

export async function setUserStatus(params: UserStatus) {
  return request(`/api/v1/base/users/${params.uuid}/${params.status}`, { method: 'patch' });
}

// url路径不能以/为结尾, 否则前端提示307 Status Code:307 Temporary Redirect
export async function CreateUser(params: UserInfo) {
  return request('/api/v1/base/user', {
    method: 'POST',
    // 看Fetch官网资料里需要怎么转化下。
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

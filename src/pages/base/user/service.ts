import { request } from 'umi';
import type {TableListParams, UserStatus, UserInfo, LoginParamsType} from './data';

export async function queryUser(params?: TableListParams) {
  return request('/api/user/getUserList', {
    params,
    method: 'POST',
  });
  // if (params?.filter !== undefined) {
  //   if (Object.keys(params.filter).length) {
  //     if (params.filter.status !== null) {
  //       return request('/api/user/getUserList', {
  //         method: 'POST',
  //         params: {
  //           page: 1,
  //           pageSize: 6,
  //         },
  //       });
  //     }
  //   }
  //   return request('/api/user/getUserList', {
  //     method: 'POST',
  //     params: {
  //       page: 1,
  //       pageSize: 5,
  //     },
  //   });
  // }
  // return request('/api/user/getUserList', { params: {
  //     page: 1,
  //     pageSize: 5,
  //   },
  //   method: 'POST',
  // });
}

export async function queryUserByID(params: string) {
  return request(`/api/v1/base/users/${params}`);
}

export async function getDeptTree(params?: any) {
  return request('/api/v1/base/dept-tree', {
    params,
  });
}

export async function updateUserStatus(params: UserStatus) {
  return request(`/api/v1/base/users/${params.uuid}/${params.status}`, { method: 'patch' });
}

// url路径不能以/为结尾, 否则前端提示307 Status Code:307 Temporary Redirect
export async function CreateUser(params: UserInfo) {
  return request('/api/v1/base/users', {
    method: 'POST',
    // 看Fetch官网资料里需要怎么转化下。
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function DeleteUser(params: string) {
  return request(`/api/v1/base/users/${params}`, {
    method: 'DELETE',
  });
}

export async function UserLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/api/v1/base/login', {
    method: 'POST',
    data: params,
  });
}

export async function getMenus() {
  return request(`/api/v1/base/menus`)
}

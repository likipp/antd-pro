import { request } from 'umi';
import { TableListParams, UserStatus, UserInfo } from './data';

export async function queryUser(params?: TableListParams) {
  console.log(params?.filter !== undefined, 'params', params?.filter);
  if (params?.filter !== undefined) {
    if (Object.keys(params.filter).length) {
      if (params.filter.status !== null) {
        return request('/api/v1/base/users', {
          params: {
            current: params.currentPage,
            pageSize: params.pageSize,
            status: params.filter.status[0],
          },
        });
      }
      console.log(Object.keys(params.filter).length, 'filter');
    }
    return request('/api/v1/base/users', {
      params: {
        current: params.currentPage,
        pageSize: params.pageSize,
        status: 3,
      },
    });
  }
  return request('/api/v1/base/users', { params });
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

export async function DeleteUser(params: string) {
  return request(`/api/v1/base/users/${params}`, {
    method: 'DELETE',
  });
}

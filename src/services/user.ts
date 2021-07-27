import { request } from 'umi';

export async function query() {
  return request<API.CurrentUser[]>('/api/users');
}

export async function queryCurrent(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/v1/base/currentUser', {method: 'GET', ...(options || {})})
}

export async function queryNotices(): Promise<any> {
  return request<{ data: API.NoticeIconData[] }>('/api/notices');
}

export async function logout() {
  return request('/api/v1/base/logout', {method: 'POST'})
}

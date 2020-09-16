import { request } from 'umi';

export async function queryRole() {
  return request('/api/v1/base/roles?page=1&pageSize=3');
}

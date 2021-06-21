import { request } from 'umi';

export async function queryRole(params: any) {
  // return request('/api/v1/base/roles?page=1&pageSize=3');
  return request('/api/v1/base/roles', {
    params,
  });
}

export async function queryRoleTabs(params: any) {
  console.log(params, '参数');
  return request(`/api/v1/base/roles/${params.id}/`, {
    params,
  });
}

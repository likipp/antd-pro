import { request } from 'umi';
import { DeptListParams } from '@/pages/base/department/data';

export async function queryDept(params?: DeptListParams) {
  return request('/api/v1/base/dept/?page=1', {
    params,
  });
}

export async function queryDeptTree() {
  return request('/api/v1/base/dept-tree');
}

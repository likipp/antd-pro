import {request} from 'umi'
import type { KPIItem } from '../data';

export async function getKPIList(params?: any) {
  return request('/api/kpi', {
    params: {
      page: params.params.current,
      pageSize: params.params.pageSize,
    },
  });
}

export async function AddKPI(params) {
  return request('/api/kpi', {
    method: 'POST',
    // 看Fetch官网资料里需要怎么转化下。
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export async function updateKPI(params: KPIItem) {
  return request(`/api/v1/base/kpi/${params.uuid}`, { method: 'patch', data:params});
}

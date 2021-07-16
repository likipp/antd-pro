import {request} from 'umi'
import { KPIItem } from '../data';

export async function getKPIList(params?: any) {
  return request('/api/v1/base/kpi', {
    params,
  });
}

export async function updateKPI(params: KPIItem) {
  return request(`/api/v1/base/kpi/${params.uuid}`, { method: 'patch', data:params});
}

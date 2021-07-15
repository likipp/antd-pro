import {request} from 'umi'

export async function getKPIList(params?: any) {
  return request('/api/v1/base/kpi', {
    params,
  });
}

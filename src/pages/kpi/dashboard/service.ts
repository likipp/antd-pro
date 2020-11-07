import { TableListParams } from '@/pages/base/user/data';
import { request } from '@@/plugin-request/request';

export async function queryKPIData(params?: TableListParams) {
  return request('/api/v1/base/kpi-data', { params });
}

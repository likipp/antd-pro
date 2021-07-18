import type { TableListParams, KPIDept } from '@/pages/dashboard/kpi/data';
import { request } from '@@/plugin-request/request';

export async function queryKPIData(params?: TableListParams) {
  return request('/api/v1/base/kpi-data', { params });
}

export async function queryKPILine(params?: TableListParams) {
  return request('/api/v1/base/kpi-line', { params });
}

export async function queryKPIDept(params?: KPIDept) {
  return request('/api/v1/base/group-kpi-dept', { params });
}

export async function getKPIWithDeptList() {
  return request('/api/v1/base/group-kpi')
}

import {request} from 'umi'
import {KPIDataInfo} from "@/pages/kpi/commit/data";

export async function createKPIData(params: KPIDataInfo) {
  return request('/api/v1/base/kpi-data', {
    method: 'POST',
    body: params,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

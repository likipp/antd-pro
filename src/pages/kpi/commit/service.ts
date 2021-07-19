import {request} from 'umi'

export async function createKPIData(params: any) {
  console.log(params, "params")
  return request('/api/v1/base/kpi-data', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'content-type': 'application/json',
    }
  })
}

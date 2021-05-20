export interface TableListItem {
  id: string;
  dept?: string;
  name: string;
  uLimit?: string;
  tValue?: string;
  lLimit?: string;
}

export interface TableListParams {
  dept?: string;
  kpi?: string;
}

export interface KPIDept {
  dept?: string;
  kpi?: string;
}

export interface QueryParams {
  dept_id?: string;
  dept_name?: string;
  kpi?: string;
  name?: string;
}

export interface LineTitle {
  type: string;
  unit: string;
}

export interface LineValues {
  date: string;
  l_limit: number;
  t_limit: number;
  type: string;
  u_limit: number;
  unit: string;
  value: number;
}

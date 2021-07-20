export interface KPISelectItem {
  uuid: string;
  t_limit: string;
  l_limit: string;
  u_limit: string;
  deptName: string;
  KPIName: string;
}

export interface ValueItem {
  t_limit: string;
  l_limit: string;
  u_limit: string;
  dept_name: string;
}

export interface KPIDataInfo {
  r_value: number,
  user: string,
  in_time: string,
  group_kpi: string
}

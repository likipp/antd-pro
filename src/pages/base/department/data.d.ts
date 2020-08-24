export interface DeptListItem {
  key: number;
  id: string;
  parent_id: string;
  deptName: string
  deptPath: string;
  leader: number;
  status: string
}

export interface DeptListParams {
  status?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}


export interface DepTreeData {
  id: number;
  key: string;
  value: string;
  title: string;
  children?: Array[DepTreeData];
}

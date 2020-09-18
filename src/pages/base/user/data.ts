export interface RolesItem {
  id: number;
}

export interface TableListItem {
  key: number;
  uuid: string;
  username: string;
  nickname: string;
  deptID: string;
  remark: string;
  sex: string;
  status: number;
  DeptName: string;
  roles: number[];
}

export interface UserInfo {
  username: string;
  nickname: string;
  deptID: string;
  remark?: string;
  sex?: string;
  status?: number;
  roles?: Array<any>;
}

export interface UserDetailInfo {
  key?: number;
  uuid?: string;
  username: string;
  nickname: string;
  deptID: string;
  remark?: string;
  sex?: string;
  status?: number;
  DeptName?: string;
  createdAt?: number;
  updatedAt?: number;
  roles: Array<any>;
}

export interface TableListData {
  list: TableListItem[];
}

export interface TableListParams {
  status?: string;
  username?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

export interface UserStatus {
  status: number;
  uuid: string;
}

export interface Page {
  pageSize: number;
  current: number;
}

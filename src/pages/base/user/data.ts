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
  roles: any[];
}

export interface UserInfo {
  username: string;
  nickname: string;
  deptID: string;
  remark?: string;
  sex?: string;
  status?: number;
  roles?: any[];
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
  roles: any[];
}

export interface TableListData {
  list: TableListItem[];
}

export interface TableListParams {
  status?: string;
  username?: string;
  nickname?: string;
  pageSize?: number;
  current?: number;
  page?: number;
  id?: number;
  members?: boolean;
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

export interface DepTree {
  title: string;
  status: string;
  parent_id?: string;
  leader?: number;
  key?: string;
  en_users_count?: number;
  dis_users_count?: number;
  deptPath?: string;
  children?: DepTree[];
}

export interface DeptTreeItem {
  title: string;
  value: string;
  leader?: number;
  parent_id?: string;
  sort?: number;
  key?: string;
  dis_users_count?: number;
  en_users_count?: number;
  deptPath?: string;
  children?: DeptTreeItem;
}

export interface LoginParamsType {
  username: string;
  password: string;
}

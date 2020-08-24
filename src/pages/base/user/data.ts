export interface TableListItem {
  key: number;
  uuid: string;
  username: string;
  nickname: string;
  deptID: string,
  remark: string,
  sex: string,
  status: number,
  DeptName: string
}

export interface UserDetailInfo {
  key?: number;
  uuid?: string;
  username: string;
  nickname: string;
  deptID: string,
  remark?: string,
  sex?: string,
  status?: number,
  DeptName?: string
  createdAt?: number
}

export interface DisplayUserInfo{
  Data: UserDetailInfo,
  Status: string
}

export interface TableListData {
  list: TableListItem[]
}

export interface TableListParams {
  status?: string;
  username?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

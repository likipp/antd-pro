import { UserInfo } from '@/pages/base/user/data';

export interface TableListItem {
  id: number;
  roleName: string;
  permCount: number;
  members: number;
  Users: UserInfo[];
}

export interface RoleTabsItem {
  activeKey?: string;
  roleName?: string;
  id?: number;
}

export interface UserTabsTableListItem {
  id: number;
  nickname: string;
}

export interface TabsTableListParams {
  pageSize: number;
  current: number;
  id: number;
  members?: boolean;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}

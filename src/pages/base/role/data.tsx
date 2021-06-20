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

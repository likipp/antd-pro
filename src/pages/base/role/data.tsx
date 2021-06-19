import {UserInfo} from "@/pages/base/user/data";

export interface TableListItem {
  ID: number;
  roleName: string;
  permCount: number;
  members: number;
  Users: UserInfo[]
}

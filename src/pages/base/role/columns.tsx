import type { ProColumns } from '@ant-design/pro-table';

import {TableListItem} from "@/pages/base/role/data";

const Columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'roleId',
    valueType: 'indexBorder'
  },
  {
    title: '角色名称',
    dataIndex: 'roleName',
  },
  {
    title: '功能数量',
    dataIndex: 'permCount',
  },
  {
    title: '成员',
    dataIndex: 'members'
  }
]

export default Columns

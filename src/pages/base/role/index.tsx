import React, {useState} from 'react';
import ProTable from '@ant-design/pro-table'

import {TableListItem} from "@/pages/base/role/data";
import Columns from "@/pages/base/role/columns"
import {queryRole} from "@/pages/base/role/service";
import {TableListParams} from "@/pages/base/user/data";


const RolesList: React.FC = () => {
  const [initPageInfo] = useState<TableListParams>({pageSize: 5, current: 1})

  return (
    <ProTable<TableListItem>
      columns={Columns}
      request={async (
        params,
        sorter,
        filter,
      ) => {
        return Promise.resolve(queryRole({ ...initPageInfo, sorter, filter })).then((res) => res)
      }}
      />
  )
}

export default RolesList

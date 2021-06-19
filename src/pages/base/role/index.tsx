import React, {useState} from 'react';
import ProTable, {ProColumns} from '@ant-design/pro-table'

import {TableListItem} from "@/pages/base/role/data";
// import Columns from "@/pages/base/role/columns"
import {queryRole} from "@/pages/base/role/service";
import {TableListParams} from "@/pages/base/user/data";
import {PageContainer} from "@ant-design/pro-layout";
import UpdateForm from "@/pages/base/role/UpdateForm";


const RolesList: React.FC = () => {
  const [initPageInfo] = useState<TableListParams>({pageSize: 5, current: 1})
  const [modal, setModal] = useState(false)
  const columns: ProColumns<TableListItem>[] = [
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
      dataIndex: 'members',
      render: (_, record) => {
        return <a
          // onMouseOver={}
          onClick={() => {
            setModal(true)}
          }>
          {record.Users.length}</a>
      }
    }
  ]

  return (
    <PageContainer>
      <ProTable<TableListItem>
        columns={columns}
        request={async (
          params,
          sorter,
          filter,
        ) => {
          return Promise.resolve(queryRole({ ...initPageInfo, sorter, filter })).then((res) => res)
        }}
      />
      <UpdateForm updateModalVisible={modal} onCancel={() => {setModal(false)}}></UpdateForm>
    </PageContainer>
  )
}

export default RolesList

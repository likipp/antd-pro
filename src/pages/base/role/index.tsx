import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';

import type { RoleTabsItem, TableListItem } from '@/pages/base/role/data';
import type { TableListParams } from '@/pages/base/user/data';
// import Columns from "@/pages/base/role/columns"
import { queryRole } from '@/pages/base/role/service';

import { PageContainer } from '@ant-design/pro-layout';
import UpdateForm from '@/pages/base/role/UpdateForm';

const RolesList: React.FC = () => {
  const [initPageInfo] = useState<TableListParams>({ pageSize: 5, current: 1 });
  const [modal, setModal] = useState(false);
  const [iniItem, setItem] = useState<RoleTabsItem>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'indexBorder',
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
        return (
          <a
            // onMouseOver={}
            onClick={() => {
              setModal(true);
              setItem(() => {
                return { activeKey: 'members' };
              });
            }}
          >
            {record.members}
          </a>
        );
      },
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            // action?.startEditable?.(record.id);
            setModal(true);
            setItem(() => {
              return { activeKey: 'base', roleName: record.roleName, id: record.id };
            });
          }}
        >
          编辑
        </a>,
        <a target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        columns={columns}
        request={async (params, sorter, filter) => {
          return Promise.resolve(queryRole({ ...initPageInfo, sorter, filter })).then((res) => res);
        }}
      />
      {iniItem?.activeKey !== undefined ? (
        <UpdateForm
          updateModalVisible={modal}
          roleTabs={iniItem}
          onCancel={() => {
            setModal(false);
          }}
        />
      ) : (
        <div />
      )}
    </PageContainer>
  );
};

export default RolesList;

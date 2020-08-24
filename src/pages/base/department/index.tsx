import React from 'react';
import { Tree } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';

import { DeptListItem } from '@/pages/base/department/data';
import { queryDept } from '@/pages/base/department/service';

const DeptList: React.FC<{}> = () => {

  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
        },
      ],
    },
  ];


  const columns: ProColumns<DeptListItem>[] = [
    {
      title: '名称',
      dataIndex: 'deptName',
      rules: [
        {
          required: true,
          message: '名称不能为空'
        }
      ]
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success' }
      },
      rules: [
        {
          required: true,
          message: '状态不能为空'
        }
      ]
    }
  ]

  return (
    <PageContainer>
      <ProTable<DeptListItem>
        headerTitle="查询部门"
        columns={columns}
        rowKey="id"
        request={(params, sorter, filter) => queryDept({ ...params, sorter, filter })}
      />
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        treeData={treeData}
      />
    </PageContainer>

  )
}

export default DeptList




import React, { useEffect, useState } from 'react';
import { Tree, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';

import { DeptListItem, DepTreeData } from '@/pages/base/department/data';
import { queryDept, queryDeptTree } from '@/pages/base/department/service';

const DeptList: React.FC<{}> = () => {
  const initTreeDate: DepTreeData[] = [
    { title: 'Expand to load', key: '0' },
    { title: 'Expand to load', key: '1' },
    { title: 'Tree Node', key: '2', isLeaf: true },
  ];
  const [treeData, setTreeData] = useState(initTreeDate);
  const columns: ProColumns<DeptListItem>[] = [
    {
      title: '名称',
      dataIndex: 'deptName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success' },
      },
    },
  ];

  useEffect(() => {
    queryDeptTree().then((res) => {
      setTreeData(res.depTree);
    });
  });

  return (
    <PageContainer>
      <ProTable<DeptListItem>
        headerTitle="查询部门"
        columns={columns}
        rowKey="id"
        request={(params, sorter, filter) => queryDept({ ...params, sorter, filter })}
      />
      <Input style={{ marginBottom: 8 }} placeholder="Search" />
      <Tree showIcon treeData={treeData} switcherIcon={<DownOutlined />} />
    </PageContainer>
  );
};

export default DeptList;

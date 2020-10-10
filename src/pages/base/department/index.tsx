import React, { useEffect, useState } from 'react';
import { Tree } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';

import { DeptListItem, DepTreeData } from '@/pages/base/department/data';
import { queryDept, queryDeptTree } from '@/pages/base/department/service';

const DeptList: React.FC<{}> = () => {
  // const treeData1 = [
  //   {
  //     title: 'parent 1',
  //     key: '0-0',
  //     children: [
  //       {
  //         title: 'parent 1-0',
  //         key: '0-0-0',
  //         disabled: true,
  //         children: [
  //           {
  //             title: 'leaf',
  //             key: '0-0-0-0',
  //             disableCheckbox: true,
  //           },
  //           {
  //             title: 'leaf',
  //             key: '0-0-0-1',
  //           },
  //         ],
  //       },
  //       {
  //         title: 'parent 1-1',
  //         key: '0-0-1',
  //         children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
  //       },
  //     ],
  //   },
  // ];
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
      <Tree treeData={treeData} />
    </PageContainer>
  );
};

export default DeptList;

import React, { useEffect, useState } from 'react';
import { Tree, Input } from 'antd';
import { HomeOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';

import { DeptListItem, DepTreeData } from '@/pages/base/department/data';
import { queryDept, queryDeptTree } from '@/pages/base/department/service';

const DeptList: React.FC<{}> = () => {
  const [treeData, setTreeData] = useState<DepTreeData[]>([]);
  // 用于初始化后默认展开第一层级树, 配合Tree expandedKeys使用
  const [parentNode, setParentNode] = useState('');
  // 用于第一次加载后断数据, 配合useEffect使用
  const [loading] = useState(false);
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

  // 根据是否有parent_id字段, 设置节点图标
  const SetIcon = (data: DepTreeData[]) => {
    const dataTem = data;
    for (let i = 0; i < data.length; i += 1) {
      if (dataTem[i].parent_id !== '') {
        // @ts-ignore
        dataTem[i].icon = ({ selected }) =>
          selected ? (
            <FolderOpenOutlined style={{ color: '#40a9ff' }} />
          ) : (
            <FolderOutlined style={{ color: '#40a9ff' }} />
          );
      } else {
        setParentNode(dataTem[i].key);
        dataTem[i].icon = <HomeOutlined style={{ color: '#52c41a' }} />;
      }
      if (dataTem[i].children.length) {
        SetIcon(dataTem[i].children);
      }
    }
  };

  useEffect(() => {
    queryDeptTree().then((res) => {
      SetIcon(res.depTree);
      setTreeData(res.depTree);
    });
  }, [loading]);

  return (
    <PageContainer>
      <ProTable<DeptListItem>
        headerTitle="查询部门"
        columns={columns}
        rowKey="id"
        request={(params, sorter, filter) => queryDept({ ...params, sorter, filter })}
      />
      <Input style={{ marginBottom: 8 }} placeholder="Search" />
      <Tree showIcon treeData={treeData} expandedKeys={[parentNode]} />
    </PageContainer>
  );
};

export default DeptList;

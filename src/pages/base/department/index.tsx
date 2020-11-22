import React, { useEffect, useState } from 'react';
import { Input, Tree } from 'antd';
import { HomeOutlined, FolderOutlined, FolderOpenOutlined } from '@ant-design/icons';

import { DepTreeData } from '@/pages/base/department/data';
import { queryDeptTree } from '@/pages/base/department/service';

const { Search } = Input;
const DeptList: React.FC<{}> = () => {
  const [treeData, setTreeData] = useState<DepTreeData[]>([]);
  // 用于初始化后默认展开第一层级树, 配合Tree expandedKeys使用
  const [parentNode, setParentNode] = useState('');
  // 用于第一次加载后断数据, 配合useEffect使用
  const [loading, setLoading] = useState(false);

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

  const SearchDept = (data: string) => {
    console.log(data, 'data');
    setLoading(true);
  };

  useEffect(() => {
    queryDeptTree().then((res) => {
      SetIcon(res.depTree);
      setTreeData(res.depTree);
    });
  }, [loading]);

  return (
    // expandedKeys={[parentNode]}
    <div>
      <Search
        placeholder="请输入要搜索的部门"
        onSearch={(value) => {
          SearchDept(value);
          console.log(value);
        }}
        enterButton
      />
      <Tree showIcon treeData={treeData} expandedKeys={[parentNode]} />
    </div>
  );
};

export default DeptList;

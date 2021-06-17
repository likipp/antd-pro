import React, {useState} from "react";
import {TreeSelect} from "antd";
import {getDeptTree} from '@/pages/base/user/service';

const CTreeSelect: React.FC = () => {
  const [initValue, setValue] = useState('');
  const [treeData, setTreeData] = useState(undefined)
  //
  const onLoadData = (treeNode: any) => getDeptTree().then((res: any) => {
    console.log(treeNode)
    setTreeData(() => {
      return res.depTree
    });
  });

  const onChange = (value: string) => {
    setValue(value)
  };

  const dropdownVisibleChange = (open: boolean) => {
    if (!open) {
      return
    }
    getDeptTree().then((res: any) => {
      setTreeData(() => {
        return res.depTree
      });
    });
  }
  return (
    <TreeSelect
      treeDataSimpleMode
      style={{ width: '100%' }}
      value={initValue}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="请选择一个所属部门"
      onChange={onChange}
      loadData={onLoadData}
      onDropdownVisibleChange={dropdownVisibleChange}
      treeData={treeData}
    />
  )
}

export default CTreeSelect

import React, {useState} from "react";
import {TreeSelect} from "antd";
import {getDeptTree} from '@/pages/base/user/service';

const CTreeSelect: React.FC = () => {
  const [initValue, setValue] = useState('');
  const [treeData, setTreeData] = useState(undefined)
  //
  const onLoadData = (treeNode: any) => getDeptTree().then((res: any) => {
    // tempDep[0].title = res.depTree[0].deptName
    console.log(treeNode)
    setTreeData(() => {
      return res.depTree
    });
  });

    // new Promise<void>(resolve => {
    //   console.log("测试", treeNode)
    //   // const { id } = treeNode.props;
    //   setTimeout(() => {
    //     resolve();
    //   }, 300);
    // });

  const onChange = (value: string) => {
    setValue(value)
  };

  const dropdownVisibleChange = () => {
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
      placeholder="Please select"
      onChange={onChange}
      loadData={onLoadData}
      onDropdownVisibleChange={dropdownVisibleChange}
      treeData={treeData}
    />
  )
}

export default CTreeSelect

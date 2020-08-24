import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined, EditOutlined, DeleteOutlined, FileTextOutlined, DownOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Menu,
  Dropdown,
  Radio,
  TreeSelect,
  Tag,
  Space,
} from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table'
import { PageContainer } from '@ant-design/pro-layout';

import { TableListItem } from '@/pages/base/user/data';
// 不需要加{}, 加了会报错 Module '"./components/UserDetailInfoCard"' has no exported member 'UserDetailInfoCard'
import UserDetailInfoCard from './components/UserDetailInfoCard'

import { queryUser, getDeptTree, queryUserByID } from '@/pages/base/user/service';
import CreateForm from '@/pages/base/user/components/CreateForm';
import UpdateForm from '@/pages/base/user/components/UpdateForm';
import {UserDetailInfo} from './data'

const TableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalUserVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [deptTree, setDeptTree] = useState(false)
  const [selectDept, setSelectDept] = useState(undefined)
  const [treeData, setTreeDate] = useState(undefined)
  const [drop, setDrop] = useState(false)
  const [userInfoVisible, SetUserInfoVisible] = useState('none')
  const [userID, SetUserID] = useState('')
  const defaultUserInfo: UserDetailInfo = {
    uuid: '',
    username: '',
    nickname: '',
    deptID: ''
  }
  const [userInfo, setUserInfo] = useState<UserDetailInfo>(defaultUserInfo)
  //   uuid: '',
  //   username: '',
  //   nickname: '',
  //   createdAt: '',
  //   deptID: '',
  // })
  const actionRef = useRef<ActionType>()

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        详情
      </Menu.Item>
      <Menu.Item danger key="2" icon={<DeleteOutlined />}>
        删除
      </Menu.Item>
    </Menu>
  );
  const onChange = (value: number) => {
    // @ts-ignore
    setSelectDept(value)
    setDrop(false)
  };

  // 接受后端数据后, 转换成antd能够识别的数据格式(title, value, key)
  const ReplaceDept = (value: any) => {
    value.forEach((item: any) => {
      const tempItem = item
      tempItem.title = tempItem.deptName
      tempItem.value = tempItem.deptID
      tempItem.key = tempItem.deptID
      if (tempItem.children) {
        ReplaceDept(tempItem.children)
      }
    })
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'indexBorder',
      valueType: 'indexBorder'
    },
    {
      title: '帐号',
      dataIndex: 'username',
      rules: [
        {
          required: true,
          message: '帐号'
        }
      ],
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      rules: [
        {
          required: true,
          message: '姓名不能为空'
        }
      ],
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {text: '禁用', status: 'Error'},
        1: {text: '启用', status: 'Success'}
      },
      // rules: [
      //   {
      //     type: 'array',
      //     required: true,
      //     message: '状态不能为空'
      //   }
      // ],
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <Radio.Group defaultValue={0}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          )
        }
        return defaultRender(_);
      },
      render: (_, row) => [
        <Tag color={row.sex ? "magenta" : "blue"} key={row.uuid}>
          {row.sex ? "女" : "男"}
        </Tag>
      ]
    },
    {
      title: '部门',
      dataIndex: 'deptID',
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <TreeSelect
              treeDataSimpleMode
              showSearch
              allowClear
              treeIcon
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择所属部门"
              onChange={onChange}
              value={selectDept}
              // loadData={onLoadData}
              open={drop}
              treeData={treeData}
              // 下拉时加载数据
              onDropdownVisibleChange={(info:boolean) => {
                // 点击了下拉, info返回true
                if (info) {
                  setDrop(true)
                  getDeptTree().then((res) => {
                    ReplaceDept(res.depTree)
                    // tempDep[0].title = res.depTree[0].deptName
                    setTreeDate(res.depTree)
                    setDeptTree(true)
                  })
                } else {
                  return deptTree
                }
                return deptTree
              }}
            />
          )
        }
        // if (type === 'table') {
        //   return (
        //
        //   )
        // }
        return defaultRender(_);
      },
      render: (_, row) => [
        <span key={row.uuid}>{row.DeptName}</span>
      ]
    },
    {
      title: '描述',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInTable: true,
      labelCol: {
        xs: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 20 },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            size="small"
            icon={<EditOutlined />}
            onClick = {() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Dropdown overlay={menu}>
            <Button
              onClick = {() => {
                setStepFormValues(record);
              }}
            >
              更多 <DownOutlined />
            </Button>

          </Dropdown>
        </>
      ),

    }
  ];


  function handleMenuClick(e: any) {
    console.log(e, 'e', typeof e)
    // if (e.key === '1') {
    //   showDrawer()
    // }
  }
  function handleMouseUp(uuid: string): void {
    if (uuid) {
      SetUserInfoVisible('inline')
      queryUserByID(uuid).then(res => {
        setUserInfo({
          deptID: res.data.deptID,
          nickname: res.data.nickname,
          remark: '',
          sex: res.data.sex,
          status: res.data.status,
          username: res.data.username,
          createdAt: res.data.createdAt
        })
      })
    } else {
      SetUserInfoVisible('none')
    }
  }


  useEffect(() => {
    handleMouseUp(userID)
  }, [userID])

  return (
    <PageContainer>
      <ProTable<TableListItem>
        className="userTable"
        id="userTable"
        headerTitle="用户列表"
        rowKey="uuid"
        columns={columns}
        actionRef={actionRef}
        rowSelection={{}}
        tableAlertOptionRender={(props) => {
          const { onCleanSelected } = props;
          return (
            <Space>
              <a>自定义</a>
              <a onClick={onCleanSelected}>清空</a>
            </Space>
          );
        }}
        tableRender ={(_, dom: any) => (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end'
            }}
          >
            <div style={{width:"200px", borderRight: "1px solid #eee"}}>
              <span>组织树</span>
            </div>
            <div
              style={{
                flex: 1
              }}
            >
              {dom}
            </div>
            <UserDetailInfoCard Data={userInfo} Status={userInfoVisible}/>
          </div>
        )}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined />新建
          </Button>
        ]}
        request={(params, sorter, filter) => (
          queryUser({ ...params, sorter, filter })
        )}
        onRow={record => {
          return {
            // 点击行时，显示出用户信息
            onClick: () => {SetUserID(record.uuid)},
            // onMouseLeave: () => {SetUserID(0)}
          }
        }}
      />

    <CreateForm modalVisible={createModalVisible} onCancel={() => handleModalVisible(false)}>
      <ProTable<TableListItem, TableListItem>
        rowKey="uuid"
        type="form"
        columns={columns}
        rowSelection={{}}
        onSubmit={async (value) => {
          console.log(value, 'value111')
          }
        }
      />
    </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          updateModalVisible={updateModalUserVisible}
          values={stepFormValues}
          onCancel={() => {
            handleUpdateModalVisible(false)
            setStepFormValues({})
          }} />
      ) : null}
    </PageContainer>
  )
}

export default TableList;

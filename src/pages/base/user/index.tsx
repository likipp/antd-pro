import React, { useCallback, useEffect, useRef, useState } from 'react';
import { EditOutlined, DeleteOutlined, FileTextOutlined, DownOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Menu,
  Dropdown,
  Radio,
  TreeSelect,
  Tag,
  Space,
  Select,
  Input,
  message,
} from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { FormInstance } from 'antd/lib/form';

import { TableListItem } from '@/pages/base/user/data';
// 不需要加{}, 加了会报错 Module '"./components/UserDetailInfoCard"' has no exported member 'UserDetailInfoCard'

import {
  queryUser,
  getDeptTree,
  queryUserByID,
  CreateUser,
  DeleteUser,
} from '@/pages/base/user/service';
import CreateForm from '@/pages/base/user/components/CreateForm';
import UpdateForm from '@/pages/base/user/components/UpdateForm';
import UserDetailInfoCard from './components/UserDetailInfoCard';
import { UserDetailInfo, UserInfo } from './data';

const { Option } = Select;

const TableList: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalUserVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [deptTree, setDeptTree] = useState(false);
  const [selectDept, setSelectDept] = useState(undefined);
  const [treeData, setTreeDate] = useState(undefined);
  const [drop, setDrop] = useState(false);
  const [userInfoVisible, SetUserInfoVisible] = useState('none');
  const [userID, SetUserID] = useState('');
  const [selectedRowsState, setSelectedRows] = useState<string[]>([]);
  // const defaultUserInfo: UserDetailInfo = {
  //   roles: [],
  //   uuid: '',
  //   username: '',
  //   nickname: '',
  //   deptID: '',
  // };
  const [userInfo, setUserInfo] = useState<UserDetailInfo>({
    roles: [],
    uuid: '',
    username: '',
    nickname: '',
    deptID: '',
  });
  const actionRef = useRef<ActionType>();
  const ref = useRef<FormInstance>();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);

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
    setSelectDept(value);
    setDrop(false);
  };

  // 接受后端数据后, 转换成antd能够识别的数据格式(title, value, key)
  const ReplaceDept = (value: any) => {
    value.forEach((item: any) => {
      const tempItem = item;
      tempItem.title = tempItem.deptName;
      tempItem.value = tempItem.deptID;
      tempItem.key = tempItem.deptID;
      if (tempItem.children) {
        ReplaceDept(tempItem.children);
      }
    });
  };

  const handleSelectStatus = (value: number) => {
    console.log(value, '选中值');
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'indexBorder',
      valueType: 'indexBorder',
    },
    {
      title: '帐号',
      dataIndex: 'username',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '帐号',
          },
        ],
        labelCol: {
          xs: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 20 },
        },
      },
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '姓名不能为空',
          },
        ],
        labelCol: {
          xs: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 20 },
        },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success' },
      },
      formItemProps: {
        labelCol: {
          xs: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 20 },
        },
        // initialValues: 1,
      },
      renderFormItem: (_, { type, defaultRender }) => {
        // console.log('item:', _);
        // console.log('config:', { type, defaultRender, ...rest });
        // console.log('form:', form);
        if (type === 'form') {
          if (ref.current !== undefined) {
            ref.current.setFieldsValue({
              status: 1,
            });
          }
          return (
            <Select allowClear onChange={handleSelectStatus}>
              <Option value={0}>禁用</Option>
              <Option value={1}>启用</Option>
            </Select>
          );
        }
        return defaultRender(_);
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      filters: true,
      formItemProps: {
        labelCol: {
          xs: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 20 },
        },
        // initialValues: 0,
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          if (ref.current !== undefined) {
            ref.current.setFieldsValue({
              sex: 0,
            });
          }
          return (
            <Radio.Group defaultValue={0}>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          );
        }
        return defaultRender(_);
      },
      render: (_, row) => [
        <Tag color={row.sex ? 'magenta' : 'blue'} key={row.uuid}>
          {row.sex ? '女' : '男'}
        </Tag>,
      ],
    },
    {
      title: '部门',
      dataIndex: 'deptID',
      formItemProps: {
        labelCol: {
          xs: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 20 },
        },
        validateStatus: 'validating',
        hasFeedback: true,
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
              onDropdownVisibleChange={(info: boolean) => {
                // 点击了下拉, info返回true
                if (info) {
                  setDrop(true);
                  getDeptTree().then((res) => {
                    ReplaceDept(res.depTree);
                    // tempDep[0].title = res.depTree[0].deptName
                    setTreeDate(res.depTree);
                    setDeptTree(true);
                  });
                } else {
                  return deptTree;
                }
                return deptTree;
              }}
            />
          );
        }
        return defaultRender(_);
      },
      render: (_, row) => [<span key={row.uuid}>{row.DeptName}</span>],
    },
    {
      title: '描述',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInTable: true,
      formItemProps: {
        labelCol: {
          xs: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 20 },
        },
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return <Input placeholder="请输入描述" />;
        }
        return defaultRender(_);
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
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Dropdown overlay={menu}>
            <Button
              onClick={() => {
                setStepFormValues(record);
              }}
            >
              更多 <DownOutlined />
            </Button>
          </Dropdown>
        </>
      ),
    },
  ];

  function handleMenuClick(e: any) {
    console.log(e, 'e', typeof e);
    // if (e.key === '1') {
    //   showDrawer()
    // }
  }

  // function handleMouseUp(uuid: string): void {
  //   if (uuid) {
  //     SetUserInfoVisible('inline')
  //     queryUserByID(uuid).then(res => {
  //       setUserInfo({
  //         deptID: res.data.deptID,
  //         nickname: res.data.nickname,
  //         remark: '',
  //         sex: res.data.sex,
  //         status: res.data.status,
  //         username: res.data.username,
  //         createdAt: res.data.createdAt
  //       })
  //     })
  //   } else {
  //     SetUserInfoVisible('none')
  //   }
  // }

  // 设置用户卡片的动态显示隐藏
  const GetAndSetDisplayStatus = (status: string) => {
    SetUserInfoVisible(status);
  };

  // 通过子组件传递过来用户的状态， 卡片上的按钮及状态Tag实时变更
  const GetAndSetUserInfo = (status: number) => {
    setUserInfo((prevState) => {
      return { ...prevState, status };
    });
    // 判断actionRef.current != undefined的情况下，执行页面刷新
    // 当子组件传递过来用户的状态时， Table表单页面的状态实时刷新
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };

  const MouseUp = useCallback(
    (uuid: string) => {
      if (uuid) {
        SetUserInfoVisible('inline');
        queryUserByID(uuid).then((res) => {
          setUserInfo((prevState) => {
            return { ...prevState, ...res.data };
          });
        });
      } else {
        SetUserInfoVisible('none');
      }
    },
    [userID],
  );

  // 设置loading条件，获取用户列表，
  useEffect(() => {
    setLoading(true);
    queryUser().then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    MouseUp(userID);
  }, [MouseUp]);

  // 删除用户
  const handleDeleteUser = async () => {
    const hide = message.loading('正在删除');
    try {
      if (selectedRowsState.length === 1) {
        hide();
        await DeleteUser(selectedRowsState[0]).then((res) => {
          message.success(res.msg);
          return true;
        });
      }
    } catch (error) {
      // message.error(error);
    }
  };

  return (
    <PageContainer style={{ minHeight: '645px' }}>
      <ProTable<TableListItem>
        className="userTable"
        id="userTable"
        headerTitle="用户列表"
        rowKey="uuid"
        loading={loading}
        columns={columns}
        actionRef={actionRef}
        rowSelection={{
          onChange: (selectedRowKeys) => setSelectedRows(selectedRowKeys as string[]),
        }}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <Space size={24}>
              <span>已选 {selectedRowKeys.length} 项</span>
            </Space>
          );
        }}
        options={{
          // reload: () => {
          //   setLoading(true);
          //   // setTimeout(() => {
          //   //   console.log("刷新了")
          //   //   setLoading(false);
          //   // }, 1000)
          //   queryUser().then((res) => {
          //     setDataSource(res.data);
          //     setLoading(false);
          //   });
          // },
          fullScreen: false,
          setting: false,
        }}
        tableAlertOptionRender={(props) => {
          const { onCleanSelected } = props;
          return (
            <Space>
              <Button type="link" onClick={onCleanSelected}>
                取消选择
              </Button>
              <Button danger type="link">
                批量删除
              </Button>
            </Space>
          );
        }}
        tableRender={(_, dom: any) => (
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-end',
              height: '560px',
            }}
          >
            <div style={{ width: '200px', borderRight: '1px solid #eee' }}>
              <span>组织树</span>
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              {dom}
            </div>
            <UserDetailInfoCard
              Data={userInfo}
              Status={userInfoVisible}
              DisplayStatus={GetAndSetDisplayStatus}
              UserInfo={GetAndSetUserInfo}
            />
          </div>
        )}
        toolBarRender={() => [
          <Button
            onClick={() => {
              queryUser().then((res) => {
                setDataSource(res.data);
                setLoading(false);
              });
            }}
          >
            刷新
          </Button>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
          <Button
            type="primary"
            onClick={async () => {
              await handleDeleteUser();
              setSelectedRows([]);
              // actionRef.current?.reload?.();
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }}
          >
            删除
          </Button>,
        ]}
        // 使用request时， actionRef.current.reload()可以生效
        // request={(params, sorter, filter) => queryUser()}
        // 使用dataSource时， actionRef.current.reload()不能生效， 需要手动重新获取列表
        dataSource={dataSource}
        onRow={(record) => {
          return {
            // 点击行时，显示出用户信息
            onClick: () => {
              SetUserID(record.uuid);
            },
            // onMouseLeave: () => {SetUserID(0)}
          };
        }}
      />

      <CreateForm modalVisible={createModalVisible} onCancel={() => handleModalVisible(false)}>
        <ProTable<TableListItem, TableListItem>
          rowKey="uuid"
          type="form"
          columns={columns}
          formRef={ref}
          onSubmit={async (value) => {
            // console.log(ref.current.getFieldsValue("status"), "status")
            // console.log(value);
            CreateUser(value as UserInfo).then((res) => {
              console.log(res, 'res');
            });
          }}
          form={{
            layout: 'vertical',
          }}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          updateModalVisible={updateModalUserVisible}
          values={stepFormValues}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
        />
      ) : null}
    </PageContainer>
  );
};

export default TableList;

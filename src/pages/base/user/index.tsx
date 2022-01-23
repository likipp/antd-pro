import React, {useRef, useState, useMemo, useCallback} from 'react';
import { DeleteOutlined, FileTextOutlined } from '@ant-design/icons';
import {
  Transfer,
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
  message
} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import type { FormInstance } from 'antd/lib/form';

import type {TableListItem, TableListParams} from '@/pages/base/user/data';
// 不需要加{}, 加了会报错 Module '"./components/UserDetailInfoCard"' has no exported member 'UserDetailInfoCard'

import {
  queryUser,
  getDeptTree,
  CreateUser,
  DeleteUser,
} from '@/pages/base/user/service';
import CreateForm from '@/pages/base/user/components/CreateForm';
import UpdateForm from '@/pages/base/user/components/UpdateForm';
import type {TransferItem} from "antd/es/transfer";
import DeptList from "@/pages/base/department";
import type {DeptTreeItem} from "@/pages/base/user/data";
import UserDetailInfoCard from './components/UserDetailInfoCard';
import type { UserInfo, RolesItem } from './data';
import {useAccess, Access} from "umi";

const { Option } = Select;

const TableList: React.FC = () => {
  const access = useAccess()
  const [,setLoading] = useState(true);
  // const [transferLoading, setTransferLoading] = useState(true);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalUserVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [selectDept, setSelectDept] = useState(undefined);
  const [treeData, setTreeData] = useState([{}]);
  const [userInfoVisible, SetUserInfoVisible] = useState('none');
  const [userID, SetUserID] = useState('');
  const [selectedRowsState, setSelectedRows] = useState<string[]>([]);

  // const [oneWay, setOneWay] = useState(false);
  const [sourceData, setSourceData] = useState<TransferItem[]>();
  const [targetKeys, setTargetKeys] = useState<string[]>();
  const [targetData, setTargetData] = useState<RolesItem[]>([])
  const actionRef = useRef<ActionType>();
  const ref = useRef<FormInstance>();
  const [,setDataSource] = useState<TableListItem[]>([]);
  const [initPageInfo, setPageInfo] = useState<TableListParams>({pageSize: 5, current: 1, page: 1})

  const menu = (
    <Menu>
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
  };

  // 接受后端数据后, 转换成antd能够识别的数据格式(title, value, key)
  const ReplaceDept = (value: DeptTreeItem[]) => {
    const tempValue: DeptTreeItem[] = []
    value.forEach((item: any) => {
      const tempItem = item
      tempItem.value = item.key
      // tempItem.key = item.title
      if (tempItem.children) {
        ReplaceDept(item.children);
      }
      tempValue.push(tempItem)
    });
    return tempValue
  };

  // useEffect(() => {
  //
  // }, []);

  const treeCallBack =  useCallback(() => {
    getDeptTree().then((res) => {
      const result = ReplaceDept(res.depTree);
      setTreeData(() => {
        return result
      });
    });
    const newTargetKeys: string[] =[];
    const newMockData: TransferItem[] = [];
    queryUser().then((res) => {
      for (let i = 0; i < res.data.length; i += 1) {
        const data: TransferItem = {
          key: res.data[i].ID,
          title: res.data[i].roleName,
          name: res.data[i].roleName,
        };
        newMockData.push(data);
      }
    })
    setTargetKeys(newTargetKeys);
    setSourceData(newMockData);
  }, [createModalVisible])

  const handleChange = (newTargetKeys: string[]) => {
    const newTarData: any[] = []
    for (let i = 0; i < newTargetKeys.length; i += 1) {
      const tarData = {
        id: newTargetKeys[i]
      }
      newTarData.push(tarData)
    }
    setTargetData(newTarData)
    setTargetKeys(newTargetKeys);
  };

  // 当组织树中选择了角色, 将选中的值赋值给form表单
  const handleSelect = ((value: any) => {
    ref.current!.setFieldsValue({
      deptID: value
    })
  })

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'indexBorder',
      valueType: 'indexBorder',
    },
    {
      title: '帐号',
      dataIndex: 'userName',
      formItemProps: {
        hasFeedback: true,
        rules: [
          {
            required: true,
            message: '帐号',
          },
        ],
        labelCol: {
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
        },
      },
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      copyable: true,
      ellipsis: true,
      formItemProps: {
        hasFeedback: true,
        rules: [
          {
            required: true,
            message: '姓名不能为空',
          },
        ],
        labelCol: {
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
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
        hasFeedback: true,
        labelCol: {
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
        },
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <Select defaultValue={1}>
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
        hasFeedback: true,
        labelCol: {
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
        },
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
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
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
        },
        hasFeedback: true,
        rules: [
          // eslint-disable-next-line prefer-promise-reject-errors
          { validator:(_, value) => value ? Promise.resolve() : Promise.reject('请至少选择一个所属部门') }
        ]
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <TreeSelect
              // treeDataSimpleMode
              showSearch
              allowClear
              treeIcon
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="请选择所属部门"
              onChange={onChange}
              value={selectDept}
              treeData={treeData}
              onSelect={handleSelect}
            />
          );
        }
        return defaultRender(_);
      },
      render: (_, row) => [<span key={row.uuid}>{row.DeptName}</span>],
    },
    {
      title: '角色',
      dataIndex: 'roles',
      hideInTable: true,
      formItemProps: {
        labelCol: {
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
        },
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return <Transfer
            listStyle={{
              width: 250,
              height: 250,
            }}
            dataSource={sourceData}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={item => item.title as string}
            pagination
          />
        }
        return defaultRender(_);
      },
    },
    {
      title: '描述',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInTable: true,
      formItemProps: {
        labelCol: {
          xs: { span: 4, offset: 2 },
        },
        wrapperCol: {
          xs: { span: 20, offset: 2 },
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
          <Access accessible={access.canAdmin} fallback={null}>
            <Button
              type="link"
              size="small"
              onClick={() => {
                handleUpdateModalVisible(true);
                setStepFormValues(record);
              }}
            >
              编辑
            </Button>
            <Divider type="vertical" />
            <Dropdown.Button overlay={menu} size="small"
                             style={{marginLeft: "7px"}}
                             onClick={() => {
                               setStepFormValues(record);
                             }}>
              更多
            </Dropdown.Button>
          </Access>

        </>
      ),
    },
  ];

  // 设置用户卡片的动态显示隐藏
  const GetAndSetDisplayStatus = (status: string) => {
    SetUserInfoVisible(status);
    treeCallBack()
  };

  // 通过子组件传递过来用户的状态， 卡片上的按钮及状态Tag实时变更
  const GetAndSetUserInfo = (useInfo: boolean) => {
    // 判断actionRef.current != undefined的情况下，执行页面刷新
    // 当子组件传递过来用户的状态时， Table表单页面的状态实时刷新
    if (useInfo) {
      if (actionRef.current) {
        // 需要重置userID值，否则不能再次点击当前选中行
        SetUserID("")
        actionRef.current.reload();
      }
    }
  };

  // 设置loading条件，获取用户列表，
  // useEffect(() => {
  //   setLoading(true);
  //   queryUser(initPageInfo).then((res) => {
  //     setDataSource(res.data);
  //     setLoading(false);
  //   });
  // }, [initPageInfo]);

  useMemo(() => {
    let status: string
    if (userID) {
      status = 'inline'
    } else {
      status = 'none'
    }
    SetUserInfoVisible(status);
    treeCallBack()
  }, [treeCallBack, userID]);

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
      message.error(error as string);
    }
  };

  // 页码发生变化时回调的方法
  const pageOnChange = (pageNumber: number, pageSize: number | undefined) => {
    setPageInfo({pageSize: pageSize as number, current: pageNumber as number})
  }
  // 页面条目数量变化时回调方法
  const pageSizeOnChange = (current: number, size: number) => {
    setPageInfo({pageSize: size, current})
  }

  return (
    <PageContainer style={{ minHeight: '645px' }}>
      <ProTable<TableListItem>
        className="userTable"
        id="userTable"
        headerTitle="用户列表"
        rowKey="uuid"
        // loading={loading}
        columns={columns}
        actionRef={actionRef}
        // dataSource={dataSource}
        search={{
          labelWidth: 120,
        }}
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
              height: '640px',
            }}
          >
            <div style={{ width: '200px', height: '650px', borderRight: '1px solid #eee' }}>
               <DeptList />
            </div>
            <div
              style={{
                flex: 1,
              }}
            >
              {dom}
            </div>
            {
              userID !== '' ?
                <UserDetailInfoCard
                  UUID={userID}
                  Status={userInfoVisible}
                  DisplayStatus={GetAndSetDisplayStatus}
                  UserInfo={GetAndSetUserInfo}
                />
                : <div/>
            }
          </div>
        )}
        toolBarRender={() => [
          <Button
            onClick={() => {
              queryUser(initPageInfo).then((res) => {
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
        // request={(params, sorter, filter) => queryUser({ ...initPageInfo, sorter, filter })}
        request={async (params) => {
          const msg = await queryUser({page: 1, pageSize: 5})
          return {
            data: msg.data.list,
            success: msg.code === 0,
            total: msg.data.total
          }
          // @ts-ignore
          // return Promise.resolve(queryUser({ ...initPageInfo, sorter, filter })).then((res) => res)
        }}
        // dataSource={dataSource}
        onRow={(record) => {
          return {
            // 点击行时，显示出用户信息
            onClick: () => {
              SetUserID(record.uuid);
            },
          };
        }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          // hideOnSinglePage: true,
          defaultPageSize: 5,
          onChange: pageOnChange,
          onShowSizeChange: pageSizeOnChange,
          // pageSizeOptions: ['3', '6', '9', '12', '15']
        }}
      />

      <CreateForm modalVisible={createModalVisible} onCancel={() => {
        handleModalVisible(false)
        setSelectDept(undefined)
        setTargetKeys([])
      }}>
        <ProTable<TableListItem, TableListItem>
          rowKey="uuid"
          type="form"
          columns={columns}
          formRef={ref}
          onSubmit={async (value) => {
            // ES建议不修改原始数据, 所以重新创建了一个变更接收数据
            const temValue: UserInfo = value
            temValue.roles = targetData
            CreateUser(temValue).then((res) => {
              if (res.code === 200) {
                message.success(res.msg)
                handleModalVisible(false)
              } else {
                message.error(res.msg)
              }
            })
          }}
          onReset={ ()=> {
            setSelectDept(undefined)
            setTargetKeys([])
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

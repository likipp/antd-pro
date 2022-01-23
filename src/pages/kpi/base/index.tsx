import React, { useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Badge, Button, message, Switch} from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { getKPIList, updateKPI } from './service';
import { PageContainer } from '@ant-design/pro-layout';
import AllotStepsForm from '../components/kpiOwers';
import type { KPIItem } from '../data';
import CreateKPI from "@/pages/kpi/base/create";
// import RadioList from "@/pages/kpi/components/radioList";

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [createModal, setCreateModal] = useState(false)

  // type KPIItem = {
  //   id: number;
  //   uuid: string;
  //   name: string;
  //   unit: string;
  //   status: number;
  // };

  // const valueEnum = {
  //   // all: { text: '全部', status: 'Default' },
  //   1: {
  //     text: '启用',
  //     status: 'Success'
  //   },
  //   2: {
  //     text: '禁用',
  //     status: 'Error'
  //   }
  // };

  const columns: ProColumns<KPIItem>[] = [
    {
      dataIndex: 'id',
      title: '序号',
      align: 'center',
      valueType: 'indexBorder',
      width: 100,
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
      copyable: true,
      ellipsis: true,
      // tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '单位',
      dataIndex: 'unit',
      align: 'center',
      ellipsis: true,
      hideInSearch: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: 1,
      align: 'center',
      filters: true,
      onFilter: true,
      valueType: 'radio',
      // valueEnum,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      renderFormItem: (_, { type, defaultRender }) => {
        if (type === 'form') {
          return (
            <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
          );
        }
        return defaultRender(_);
      },
      render: (_, row) => {
        if (row?.status) {
          return <Badge color="green" text="启用" />
        }
        return <Badge color="red" text="禁用" />
      }
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a key="view"
           onClick={() => {handleModalVisible(true)}}
        >
          分配部门
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<KPIItem>
        columns={columns}
        actionRef={actionRef}
        request={async (params) => {
          const msg = await getKPIList({ params })
          return {
            data: msg.data.list,
            success: msg.code === 0,
            total: msg.data.total
          }
          // return Promise.resolve(getKPIList({ params })).then((res) => res)
        }}
        editable={{
          type: 'single',
          editableKeys,
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
          onSave: (_, row) => {
            return updateKPI(row).then((res) => {
              // console.log(res, "res")
              if (res.success) {
                message.success(res.errorMessage);
              }
            });
          },
          // onValuesChange: (changeValues, allValues) => {
          //   console.log(changeValues, allValues)
          // }
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => {setCreateModal(true)}}>
            新建
          </Button>
        ]}
      />
      <AllotStepsForm
        onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}
      />
      {
        createModal ? <CreateKPI modalVisible={createModal} onCancel={setCreateModal}/> : null
      }
    </PageContainer>)
};

export default TableList

import React, { useEffect, useState } from 'react';
// import { ModalForm } from '@ant-design/pro-form';
import { Tabs, Form, Input, Modal } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { RoleTabsItem, UserTabsTableListItem } from '@/pages/base/role/data';
import type { ProColumns } from '@ant-design/pro-table';
import type { TabsTableListParams } from '@/pages/base/role/data';
import { queryRoleTabs } from '@/pages/base/role/service';

// import style from '@/pages/base/role/style.less'

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface updateFormProps {
  onCancel: (flag?: boolean) => void;
  updateModalVisible: boolean;
  roleTabs: RoleTabsItem;
}

const { TabPane } = Tabs;

const UpdateForm: React.FC<updateFormProps> = (props) => {
  const { onCancel: handleUpdateModalVisible, updateModalVisible, roleTabs } = props;
  const [initPageInfo, setPageInfo] = useState<TabsTableListParams>({
    pageSize: 5,
    current: 1,
    members: false,
    id: 1,
  });
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = Form.useForm();
  const callback = (key: any) => {
    console.log(key);
  };

  const columns: ProColumns<UserTabsTableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      valueType: 'indexBorder',
    },
    {
      title: '姓名',
      dataIndex: 'nickname',
    },
  ];

  // 页码发生变化时回调的方法
  const pageOnChange = (pageNumber: number, pageSize: number | undefined) => {
    setPageInfo({
      pageSize: pageSize as number,
      current: pageNumber as number,
      members: true,
      id: 1,
    });
  };
  // 页面条目数量变化时回调方法
  const pageSizeOnChange = (current: number, size: number) => {
    setPageInfo({ pageSize: size, current, members: true, id: 1 });
  };

  useEffect(() => {
    let mem: boolean = false;
    if (roleTabs.activeKey) {
      mem = true;
    }
    setPageInfo({
      pageSize: 5,
      current: 1,
      members: mem,
      id: 1,
    });
  }, [roleTabs]);

  return (
    // <ModalForm
    //   title="编辑角色"
    //   visible={updateModalVisible}
    //   modalProps={{
    //     onCancel: () => handleUpdateModalVisible(),
    //   }}
    //   // trigger={
    //   //   <Button type="primary">
    //   //     新建角色
    //   //   </Button>
    //   // }
    // >
    //
    // </ModalForm>
    // style="width: 800px; transform-origin: -159px 226px;"
    <Modal
      style={{ width: '800px', transformOrigin: '-159px 226px' }}
      width="800px"
      title="编辑角色"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
    >
      <Tabs defaultActiveKey={roleTabs.activeKey} onChange={callback}>
        <TabPane tab="角色信息" key="base">
          <Form
            {...layout}
            form={form}
            labelAlign={'left'}
            name="basic"
            initialValues={{ roleName: roleTabs.roleName, id: roleTabs.id }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Form.Item
              label="序号"
              name="id"
              // rules={[{ required: true, message: '请输入角色名称' }]}
            >
              <a>{roleTabs.id}</a>
            </Form.Item>
            <Form.Item
              label="角色名称"
              name="roleName"
              rules={[{ required: true, message: '请输入角色名称' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="功能权限" key="perm">
          功能权限
        </TabPane>
        <TabPane tab="成员设置" key="members">
          <ProTable<UserTabsTableListItem>
            columns={columns}
            search={{
              filterType: 'light',
            }}
            request={async (params, sorter, filter) => {
              return Promise.resolve(queryRoleTabs({ ...initPageInfo, sorter, filter })).then(
                (res) => res,
              );
            }}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              defaultPageSize: 5,
              onChange: pageOnChange,
              onShowSizeChange: pageSizeOnChange,
            }}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default UpdateForm;

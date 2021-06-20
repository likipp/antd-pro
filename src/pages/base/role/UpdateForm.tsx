import React from 'react';
import { ModalForm } from '@ant-design/pro-form';
import { Tabs, Form, Input } from 'antd';
import { RoleTabsItem } from '@/pages/base/role/data';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface updateFormProps {
  onCancel: (flag?: boolean) => void;
  updateModalVisible: boolean;
  roleTabs: RoleTabsItem;
}

const { TabPane } = Tabs;

const UpdateForm: React.FC<updateFormProps> = (props) => {
  const { onCancel: handleUpdateModalVisible, updateModalVisible, roleTabs } = props;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const callback = (key: any) => {
    console.log(key);
  };

  return (
    <ModalForm
      title="编辑角色"
      visible={updateModalVisible}
      modalProps={{
        onCancel: () => handleUpdateModalVisible(),
      }}
      // trigger={
      //   <Button type="primary">
      //     新建角色
      //   </Button>
      // }
    >
      <Tabs defaultActiveKey={roleTabs.activeKey} onChange={callback}>
        <TabPane tab="角色信息" key="base">
          <Form
            {...layout}
            name="basic"
            // initialValues={{ remember: true }}
          >
            <Form.Item
              label="角色名称:"
              name="角色名称:"
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
          成员设置
        </TabPane>
      </Tabs>
    </ModalForm>
  );
};

export default UpdateForm;

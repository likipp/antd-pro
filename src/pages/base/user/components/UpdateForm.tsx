import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

import { TableListItem } from '@/pages/base/user/data';

export interface FormValueType extends Partial<TableListItem> {
  username?: string;
  nickname?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

// const FormItem = Form.Item;

// export interface UpdateFormState {
//   formVals: formValsueType;
// }

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formValues] = useState<FormValueType>({
    username: props.values.username,
    nickname: props.values.nickname
  });
  const [form] = Form.useForm()
  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    // values,
  } = props;
  // const renderFooter = () => {
  //   return (
  //     <>
  //       <Button key="back">
  //         取消
  //       </Button>,
  //       <Button key="submit" type="primary">
  //         提交
  //       </Button>,
  //     </>
  //   )
  // }

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px'}}
      destroyOnClose
      title="编辑用户"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
      // footer={renderFooter()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          username: formValues.username,
          nickname: formValues.nickname
        }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="姓名"
          name="nickname"
          rules={[{ required: true, message: '姓名不能为空' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UpdateForm

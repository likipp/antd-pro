import React from "react";
import ProForm, {ModalForm, ProFormText, ProFormSwitch} from "@ant-design/pro-form";

import { AddKPI } from '../service';
import {message} from "antd";

interface CreateKPIProps {
  modalVisible: boolean;
  onCancel: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateKPI: React.FC<CreateKPIProps> = (props) => {
  const {modalVisible, onCancel} = props
  return <ModalForm<{
    name: string;
    company: string;
  }>
    title="新建KPI"
    autoFocusFirstInput
    modalProps={{
      destroyOnClose: true,
      onCancel: () => console.log('run'),
    }}
    width={600}
    visible={modalVisible}
    onVisibleChange={onCancel}
    onFinish={async (values) => {
      // console.log(values);
      AddKPI(values).then(() => {
        message.success('创建成功');
      })
      // message.success('提交成功');
      return true;
    }}
  >
    <ProFormText
      width="md"
      name="name"
      label="KPI名称"
      placeholder="请输入名称"
      rules={[{required: true, message: "名称不能为空"}]}
    />
    <ProForm.Group>
      <ProFormText width="md" name="unit" label="单位" placeholder="请输入单位" rules={[{required: true, message: "单位不能为空"}]}/>
      <ProFormSwitch name="status" label="启用" checkedChildren="启用" unCheckedChildren="禁用" fieldProps={{defaultChecked: true, onChange: (checked) => {console.log(checked)}}} />
    </ProForm.Group>
  </ModalForm>
}

export default CreateKPI

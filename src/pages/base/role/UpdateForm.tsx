import React from "react";
import {ModalForm} from "@ant-design/pro-form";
import {Tabs} from "antd";

export interface updateFormProps {
  onCancel: (flag?: boolean) => void,
  updateModalVisible: boolean
}

const {TabPane} = Tabs

const UpdateForm: React.FC<updateFormProps> = (props) => {

  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible} = props

  const callback = (key: any) => {
    console.log(key)
  }

  return (
    <ModalForm
      title="编辑角色"
      visible={updateModalVisible}
      modalProps={{
        onCancel: () => handleUpdateModalVisible()
      }}
      // trigger={
      //   <Button type="primary">
      //     新建角色
      //   </Button>
      // }
    >
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="角色信息" key="1">
          角色信息
        </TabPane>
        <TabPane tab="功能权限" key="2">
          功能权限
        </TabPane>
        <TabPane tab="成员设置" key="3">
          成员设置
        </TabPane>
      </Tabs>
    </ModalForm>
  )
}

export default UpdateForm

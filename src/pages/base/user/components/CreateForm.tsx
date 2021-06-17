import React from 'react';
import { Modal } from 'antd';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onCancel } = props
  return (
      <Modal
        centered
        destroyOnClose
        title="新增用户"
        width={700}
        visible={modalVisible}
        onCancel={() => onCancel()}
        footer={null}
      >
        {props.children}
      </Modal>
  );
};

export default CreateForm;

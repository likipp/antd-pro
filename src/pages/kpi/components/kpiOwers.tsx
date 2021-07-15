import  {
  ModalForm, ProFormDateRangePicker, ProFormSelect, ProFormText, StepsForm,
} from '@ant-design/pro-form';
import moment, { Moment } from 'moment';
import React from 'react';

interface StepsFormProps {
  modalVisible: boolean;
  onCancel: () => void;
}

const AllotSetpsForm: React.FC<StepsFormProps> = (props) => {
  const { modalVisible, onCancel } = props;
  type FormValue = {
    jobInfo: {
      name: string;
      type: number;
    };
    syncTableInfo: {
      timeRange: [Moment, Moment];
      title: string;
    };
  };
  const formValue: FormValue = {
    jobInfo: {
      name: 'normal job',
      type: 1,
    },
    syncTableInfo: {
      timeRange: [moment().subtract('month'), moment()],
      title: 'example table title',
    },
  };
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formValue);
      }, time);
    });
  };
  const jobType = [
    {
      value: 1,
      label: '国企',
    },
    {
      value: 2,
      label: '私企',
    },
  ];

  return <ModalForm
    visible={modalVisible}
    modalProps={{
      onCancel: () => onCancel(),
    }}
  >
    <StepsForm
      onFinish={(values) => {
        console.log(values);
        return Promise.resolve(true);
      }}
    >
      <StepsForm.StepForm name="step1" title="工作信息">
        <ProFormText label="姓名" name={['jobInfo', 'name']} />
        <ProFormSelect label="工作类型" name={['jobInfo', 'type']} options={jobType} />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="step2" title={'同步表单信息'}>
        <ProFormDateRangePicker label="时间区间" name={['syncTableInfo', 'timeRange']} />
        <ProFormText label="标题" name={['syncTableInfo', 'title']} />
      </StepsForm.StepForm>
    </StepsForm>
  </ModalForm>;
}

export default AllotSetpsForm

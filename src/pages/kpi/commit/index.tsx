import { PageContainer } from '@ant-design/pro-layout';
import {
  Card,
  Space,
  Tag,
  Progress,
  Form,
  DatePicker,
  Select,
  Input,
  Row,
  Col,
  Button,
  Alert,
} from 'antd';
import ProList from '@ant-design/pro-list';
import { getKPIWithDeptList } from '@/pages/dashboard/kpi/service';
import { useEffect, useState } from 'react';
import type { KPISelectItem, ValueItem } from '@/pages/kpi/commit/data';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';

export default () => {
  const [kpi, setKpi] = useState([]);
  const [value, setValue] = useState<ValueItem>();
  const [month, setMonth] = useState('2021-07');
  useEffect(() => {
    setMonth(moment().format('YYYY-MM'));
  });
  const data = [
    '语雀的天空',
    'Ant Design',
    '蚂蚁金服体验科技',
    'TechUI',
    'TechUI 2.0',
    'Big',
    'Umi',
  ].map((item) => ({
    title: item,
    subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
    content: (
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <div
          style={{
            width: 200,
          }}
        >
          <div>发布中</div>
          <Progress percent={80} />
        </div>
      </div>
    ),
  }));

  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
    },
  };

  const [form] = Form.useForm();
  // let dae_now = Date.now()
  // eslint-disable-next-line global-require
  // const moment = require('moment')

  const onDropdownVisibleChange = () => {
    getKPIWithDeptList().then((res) => {
      setKpi(res.data);
    });
  };

  const onSelect = (_: any, option: ValueItem) => {
    setValue(() => {
      return {
        dept_name: option.dept_name,
        u_limit: option.u_limit,
        l_limit: option.l_limit,
        t_limit: option.t_limit,
      };
    });
  };

  // const onChange = (value, option, array) => {
  //   console.log(value, option, array)
  // }
  const options = kpi.map((d: KPISelectItem) => (
    <Option
      key={d.uuid}
      value={d.KPIName}
      t_limit={d.t_limit}
      l_limit={d.l_limit}
      u_limit={d.u_limit}
      dept_name={d.deptName}
    >
      {d.KPIName}
    </Option>
  ));
  return (
    <PageContainer title="输入表单">
      <Card>
        <div style={{ margin: '0px 0px 10px 80px', width: '50%' }}>
          <Alert
            message="温馨提示"
            description="注意：录入及修改日期为每月1~15号.如果不在区间内,提交按钮不可用！"
            type="info"
            showIcon
          />
        </div>
        <Form
          name="KPIInput"
          {...formItemLayout}
          form={form}
          initialValues={{ name: '冯十五', month: moment(month), kpi: '' }}
          scrollToFirstError
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="name" label="录入人">
                <Input disabled bordered={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="dept" label="部门">
                <span>{value?.dept_name}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item name="month" label="当前月份">
                <DatePicker picker="month" disabled bordered={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="kpi_name"
                label="KPI名称"
                rules={[{ required: true, message: '请至少选择一项KPI' }]}
              >
                <Select
                  placeholder="请选择一项KPI"
                  allowClear
                  onDropdownVisibleChange={onDropdownVisibleChange}
                  // @ts-ignore
                  onSelect={onSelect}
                >
                  {options}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="kpi"
                label="实际KPI"
                rules={[{ required: true, message: '请实际KPI值' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={11} offset={1}>
              <Space style={{ marginBottom: '30px', alignItems: 'center' }}>
                <span>下限值:</span>
                <Tag color="#f5222d">{value?.l_limit}</Tag>
                <span>目标值:</span>
                <Tag color="#faad14">{value?.t_limit}</Tag>
                <span>上限值:</span>
                <Tag color="#52c41a">{value?.u_limit}</Tag>
              </Space>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="备注" name="comments">
                <TextArea allowClear showCount maxLength={100} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => {
                  form.resetFields();
                  setValue({ dept_name: '', u_limit: '', t_limit: '', l_limit: '' });
                }}
              >
                重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <ProList<any>
        pagination={{
          defaultPageSize: 5,
          showSizeChanger: true,
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {},
        }}
        headerTitle="翻页"
        dataSource={data}
      />
    </PageContainer>
  );
};

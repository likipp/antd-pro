import { PageContainer } from '@ant-design/pro-layout';
import {Card, Space, Tag, Progress, Form, DatePicker, Select, Input} from 'antd';
import ProList from '@ant-design/pro-list';
import {getKPIWithDeptList} from "@/pages/dashboard/kpi/service";
import {useState} from "react";

export default () => {
  const [kpi, setKpi] = useState([])
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

  const onDropdownVisibleChange = () => {
    getKPIWithDeptList().then((res) => {
      setKpi(res.data)
    })
  }
  const options = kpi.map(d => <Option key={d.uuid} value={d.KPIName}>{d.KPIName}</Option>);
  return (
    <PageContainer title="输入表单">
      <Card>
        <Form name="time_related_controls" {...formItemLayout} form={form} scrollToFirstError>
          <Form.Item
            name="用户名"
            label="用户名"
          >
            <p>冯十五</p>
          </Form.Item>
          <Form.Item name="当前月份r" label="当前月份r">
            <DatePicker picker="month" />
          </Form.Item>
          <Form.Item
            name="KPI名称"
            label="KPI名称"
            rules={[{ required: true, message: '请至少选择一项KPI' }]}
          >
            <Select placeholder="请选择一项KPI" allowClear
              onDropdownVisibleChange={onDropdownVisibleChange}
            >
              {options}
            </Select>
          </Form.Item>
        </Form>
          <Space style={{ marginBottom: '30px' }}>
            <Tag color="#f5222d">下限值</Tag>
            <Tag color="#faad14">目标值</Tag>
            <Tag color="#52c41a">上限值</Tag>
          </Space>
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

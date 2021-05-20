import React, { useState, useReducer, useEffect } from 'react';
import type { QueryParams } from '@/pages/kpi/dashboard/data';
import { Card, Select, Form, Button, Spin } from 'antd';

import { queryKPIDept } from '@/pages/kpi/dashboard/service';
import OneLineChart from '@/pages/kpi/dashboard/oneLine';
import AllLineChart from '@/pages/kpi/dashboard/allLine';
import KPITable from '@/pages/kpi/dashboard/table';
import DashContext from '@/pages/kpi/dashboard/dashContext';
import kpiReducer from '@/reducers/kpiReducer';
// import styles from './databoard.less';

const TableList: React.FC = () => {
  // 定义antd Select组件
  const { Option } = Select;
  // 定义antd Form组件
  const [form] = Form.useForm();
  // Table组件的数据来源
  const [initQueryParams, setQueryParams] = useState<QueryParams[]>([]);
  const [fetching, setFetching] = useState(false);
  const initialState = { initDept: '', initKPI: '' };
  const [state, dispatch] = useReducer(kpiReducer, initialState);

  const [initStatus, setStatus] = useState('none');

  // 获取有KPI数据的部门
  const handleGetDept = () => {
    queryKPIDept().then((res) => {
      if (res.result.length > 0) {
        setQueryParams(res.result);
        setFetching(true);
      }
    });
  };

  // 点击清除按钮后的回调方法
  const handleClearKPIParams = () => {
    dispatch({ type: 'clearKPI' });
  };

  // const handleChangeDeptParams = (value: string) => {
  //   dispatch({ type: 'setDept', payload: value });
  //   setStatus(() => {
  //     return 'block'
  //   })
  // };

  const handleSelectDept = (value: string) => {
    // if (state.initDept !== value && state.initDept !== '') {
    //   form.setFieldsValue({ kpi: '' });
    // }
    dispatch({ type: 'setDept', payload: value });
    setStatus(() => {
      return 'block';
    });
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
    setStatus(() => {
      return 'none';
    });
    form.resetFields();
  };

  // 在部门选择之后, 获取相关的KPI数据
  const handleGetKPI = () => {
    const initParams = { dept: state.initDept, kpi: state.initKPI };
    queryKPIDept(initParams).then((res) => {
      if (res.result.length <= 0) {
        return;
      }
      setQueryParams(res.result);
      setFetching(true);
    });
  };

  const handleChangeKPIParams = (value: string) => {
    dispatch({ type: 'setKPI', payload: value });
  };

  useEffect(() => {}, [state.initKPI, state.initDept]);
  return (
    <div>
      <Card style={{ marginBottom: '30px' }}>
        <Form layout="inline" form={form}>
          <Form.Item label="部门:" name="dept">
            <Select
              allowClear
              style={{ width: 240 }}
              value={state.initDept}
              placeholder="请选择部门"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onDropdownVisibleChange={handleGetDept}
              // onChange={handleChangeDeptParams}
              onClear={handleReset}
              onSelect={handleSelectDept}
            >
              {initQueryParams.map((d) =>
                d.dept_id !== undefined && d.dept_id !== '' ? (
                  <Option key={d.dept_id} value={d.dept_id}>
                    {d.dept_name}
                  </Option>
                ) : null,
              )}
            </Select>
          </Form.Item>
          <Form.Item label="KPI指标:" name="kpi">
            <Select
              allowClear
              style={{ width: 240 }}
              value={state.initKPI}
              placeholder="请选择KPI"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              disabled={state.initDept === '' || state.initDept === undefined}
              onDropdownVisibleChange={handleGetKPI}
              onSelect={handleChangeKPIParams}
              onClear={handleClearKPIParams}
            >
              {initQueryParams.map((d) =>
                d.kpi !== '' && d.kpi !== undefined ? (
                  <Option key={d.kpi} value={d.kpi}>
                    {d.name}
                  </Option>
                ) : null,
              )}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              type="primary"
              onClick={handleReset}
              disabled={state.initDept === ''}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <DashContext.Provider value={{ dept: state.initDept, kpi: state.initKPI }}>
        <Card style={{ marginBottom: '20px', display: initStatus }}>
          <KPITable />
        </Card>
        <div style={{ display: initStatus }}>
          <div style={{ margin: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button style={{ border: '1px solid #ff4d4f', backgroundColor: '#fff' }}>上一年</Button>
            <Button
              style={{ marginLeft: '10px', border: '1px solid #ff4d4f', backgroundColor: '#fff' }}
            >
              下一年
            </Button>
          </div>
        </div>
        <Card style={{ marginTop: '20px', display: initStatus }}>
          <div>{state.initKPI === '' ? <AllLineChart /> : <OneLineChart />}</div>
        </Card>
      </DashContext.Provider>
    </div>
  );
};

export default TableList;

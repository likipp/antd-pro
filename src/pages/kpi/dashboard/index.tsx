import React, { useState, useReducer, useEffect } from 'react';
import { QueryParams } from '@/pages/kpi/dashboard/data';
import { Card, Select, Form, Button, Spin } from 'antd';

import { queryKPIDept } from '@/pages/kpi/dashboard/service';
import LineChart from '@/pages/kpi/dashboard/line';
import KPITable from '@/pages/kpi/dashboard/table';
import DashContext from '@/pages/kpi/dashboard/dashContext';
import styles from './databoard.less';

const TableList: React.FC = () => {
  // 定义antd Select组件
  const { Option } = Select;
  // 定义antd Form组件
  const [form] = Form.useForm();
  // Table组件的数据来源
  const [initQueryParams, setQueryParams] = useState<QueryParams[]>([]);
  const [initDept, setDept] = useState('');
  const [initKPI, setKPI] = useState('');
  const [fetching, setFetching] = useState(false);

  const initialState = { initDept: '', initKPI: '' };
  const [state, dispatch] = useReducer(reducer, initialState);

  // 定义一个reducer供useReducer使用
  function reducer(preState: any, action: any) {
    switch (action.type) {
      case 'reset':
        return { initDept: '', initKPI: '' };
      case 'setKPI':
        return { initDept, initKPI };
      case 'setDept':
        return { initDept, initKPI };
      case 'clearKPI':
        return { initDept, initKPI: '' };
      default:
        throw new Error();
    }
  }

  // 获取有KPI数据的部门
  const handleGetDept = () => {
    queryKPIDept().then((res) => {
      if (res.result.length > 0) {
        setQueryParams(res.result);
        setFetching(true);
      }
    });
  };

  const handleChangeDeptParams = (value: string) => {
    setDept(() => {
      return value;
    });
    dispatch({ type: 'setDept' });
  };

  // 点击清除按钮后的回调方法
  const handleClearKPIParams = () => {
    dispatch({ type: 'clearKPI' });
    setKPI(() => {
      return '';
    });
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
    form.resetFields();
    setDept(() => {
      return '';
    });
    setKPI(() => {
      return '';
    });
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
    setKPI(() => {
      return value;
    });
    dispatch({ type: 'setKPI' });
  };

  useEffect(() => {
    console.log('主页面刷新');
  }, [state.initKPI, state.initDept]);
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
              onChange={handleChangeDeptParams}
              onClear={handleReset}
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
              disabled={state.initDept === ''}
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
        <Card
          style={{ marginBottom: '30px' }}
          className={state.initDept === '' ? styles.selected : styles.unSelect}
        >
          <KPITable />
        </Card>
        <Card className={state.initDept === '' ? styles.selected : styles.unSelect}>
          <LineChart />
        </Card>
      </DashContext.Provider>
    </div>
  );
};

export default TableList;

import React, { useState, useEffect, useReducer } from 'react';
import { TableListItem, QueryParams } from '@/pages/kpi/dashboard/data';
import { Tag, Space, Card, Select, Form, Button, Spin } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { queryKPIData, queryKPIDept } from '@/pages/kpi/dashboard/service';
import LineDemo from '@/pages/kpi/dashboard/line';
import DashContext from '@/pages/kpi/dashboard/dashContext';
import styles from './databoard.less';

const TableList: React.FC = () => {
  // 定义antd Select组件
  const { Option } = Select;
  // 定义antd Form组件
  const [form] = Form.useForm();
  // Table组件的数据来源
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [initQueryParams, setQueryParams] = useState<QueryParams[]>([]);
  const [loading, setLoading] = useState(true);
  const [initDept, setDept] = useState('');
  const [initKPI, setKPI] = useState('');
  const [fetching, setFetching] = useState(false);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'indexBorder',
      align: 'center',
      valueType: 'indexBorder',
    },
    {
      title: 'KPI',
      align: 'center',
      dataIndex: 'name',
    },
    {
      title: '下限值',
      align: 'center',
      dataIndex: 'lLimit',
    },
    {
      title: '目标值',
      align: 'center',
      dataIndex: 'tValue',
    },
    {
      title: '上限值',
      align: 'center',
      dataIndex: 'uLimit',
    },
  ];
  const [initColumns] = useState(() => {
    let a: any;
    for (let i = 1; i <= 12; i += 1) {
      if (i < 10) {
        a = {
          key: `2020/0${i}`,
          title: `2020/0${i}`,
          align: 'center',
          dataIndex: `2020/0${i}`,
          onCell: (record: any) => {
            if (
              record[`2020/0${i}`] !== undefined &&
              record[`2020/0${i}`] !== null &&
              record[`2020/0${i}`] !== '-'
            ) {
              if (
                parseInt(record[`2020/0${i}`] as string, 10) < parseInt(record.lLimit as string, 10)
              ) {
                return {
                  style: {
                    backgroundColor: '#f5222d',
                  },
                };
              }
              if (
                parseInt(record[`2020/0${i}`] as string, 10) > parseInt(record.tValue as string, 10)
              ) {
                return {
                  style: {
                    backgroundColor: '#52c41a',
                  },
                };
              }
              return {
                style: {
                  backgroundColor: '#faad14',
                },
              };
            }
            return {
              style: {
                backgroundColor: '#d9d9d9',
              },
            };
          },
          render: (value: any) => {
            if (value !== undefined && value !== null && value !== '-') {
              return <span>{value}</span>;
            }
            return <span>空</span>;
          },
        };
        columns.push(a);
      } else {
        a = {
          title: `2020/${i}`,
          align: 'center',
          dataIndex: `2020/${i}`,
          onCell: (record: any) => {
            if (
              record[`2020/${i}`] !== undefined &&
              record[`2020/${i}`] !== null &&
              record[`2020/${i}`] !== '-'
            ) {
              if (
                parseInt(record[`2020/${i}`] as string, 10) < parseInt(record.lLimit as string, 10)
              ) {
                return {
                  style: {
                    backgroundColor: '#f5222d',
                  },
                };
              }
              if (
                parseInt(record[`2020/${i}`] as string, 10) > parseInt(record.tValue as string, 10)
              ) {
                return {
                  style: {
                    backgroundColor: '#52c41a',
                  },
                };
              }
              return {
                style: {
                  backgroundColor: '#faad14',
                },
              };
            }
            return {
              style: {
                backgroundColor: '#d9d9d9',
              },
            };
          },
          render: (value: any) => {
            if (value !== undefined && value !== null && value !== '-') {
              return <span>{value}</span>;
            }
            return <span>空</span>;
          },
        };
        columns.push(a);
      }
    }
    return columns;
  });

  const initialState = { initDept: '', initKPI: '' };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setLoading(true);
    queryKPIData({ dept: state.initDept, kpi: state.initKPI }).then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, [state]);

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
      case 'clearDept':
        return { initDept: '', initKPI: '' };
      default:
        throw new Error();
    }
  }

  // 获取有KPI数据的部门
  const handleGetDept = () => {
    console.log(2121);
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

  const handleClearDeptParams = () => {
    dispatch({ type: 'reset' });
  };

  const handleClearKPIParams = () => {
    dispatch({ type: 'clearKPI' });
  };

  const handleReset = () => {
    dispatch({ type: 'reset' });
  };

  // 在部门选择之后, 获取相关的KPI数据
  const handleGetKPI = () => {
    const initParams = { dept: state.initDept, kpi: state.initKPI };
    queryKPIDept(initParams).then((res) => {
      if (res.result.length > 0) {
        setQueryParams(res.result);
        setFetching(true);
      }
    });
  };

  const handleChangeKPIParams = (value: string) => {
    setKPI(() => {
      return value;
    });
    dispatch({ type: 'setKPI' });
  };

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
              onSelect={handleChangeDeptParams}
              onClear={handleClearDeptParams}
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
            <Button htmlType="button" type="primary" onClick={handleReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card
        style={{ marginBottom: '30px' }}
        className={state.initDept === '' ? styles.selected : styles.unSelect}
      >
        <div>
          <Space style={{ marginBottom: '30px' }}>
            <Tag color="#d9d9d9">未输入</Tag>
            <Tag color="#f5222d">未达标</Tag>
            <Tag color="#faad14">已达标</Tag>
            <Tag color="#52c41a">超额达标</Tag>
          </Space>
        </div>
        <ProTable<TableListItem>
          rowKey="kpi"
          bordered
          columns={initColumns}
          dataSource={dataSource}
          loading={loading}
          search={false}
          pagination={false}
          toolBarRender={false}
        />
      </Card>
      <Card className={initDept === '' ? styles.selected : styles.unSelect}>
        <DashContext.Provider value={{ dept: state.initDept, kpi: state.initKPI }}>
          <LineDemo />
        </DashContext.Provider>
      </Card>
    </div>
  );
};

export default TableList;

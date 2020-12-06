import React, { useState, useEffect, useRef } from 'react';
import { TableListItem, QueryParams, TableListParams } from '@/pages/kpi/dashboard/data';
import { Tag, Space, Card, Select, Form, Button, Spin } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

import { queryKPIData, queryKPIDept } from '@/pages/kpi/dashboard/service';

import LineDemo from '@/pages/kpi/dashboard/line';
import DashContext from '@/pages/kpi/dashboard/dashContext';

const TableList: React.FC = () => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [initQueryParams, setQueryParams] = useState<QueryParams[]>([]);
  const initDept = useRef('');
  const initKPI = useRef('');
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  // const [initParams, setParams] = useState<TableListParams[]>({ dept: '', group_kpi: null });
  const initParams = useRef<TableListParams>({ dept: '', kpi: '' });
  // 323404962476326913
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

  const onReset = () => {
    form.resetFields();
  };

  // 获取有KPI数据的部门
  const handleGetDept = () => {
    queryKPIDept().then((res) => {
      if (res.result.length > 0) {
        setQueryParams(res.result);
        setFetching(true);
      }
    });
  };

  // 在部门选择之后, 获取相关的KPI数据
  const handleGetKPI = () => {
    initParams.current = { dept: initDept.current, kpi: initKPI.current };
    queryKPIDept(initParams.current).then((res) => {
      if (res.result.length > 0) {
        setQueryParams(res.result);
        setFetching(true);
      }
    });
  };

  // 通过ref设置部门值
  const handleChangeDeptParams = (value: string) => {
    initDept.current = value;
    initParams.current = { dept: value, kpi: '' };
    // setParams({ dept: initDept, kpi: '' });
  };

  // 通过ref设置KPI值
  const handleChangeKPIParams = (value: string) => {
    initKPI.current = value;
    // setParams({ dept: initDept, kpi: initKPI });
  };

  // 当部门改变时, 重新获取Table的datasource
  useEffect(() => {
    setLoading(true);
    queryKPIData(initParams.current).then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, [initParams.current]);

  return (
    <div>
      <Card style={{ marginBottom: '30px' }}>
        <Form layout="inline">
          <Form.Item label="部门:" name="dept">
            <Select
              style={{ width: 240 }}
              // value={}
              allowClear
              placeholder="请选择部门"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onDropdownVisibleChange={handleGetDept}
              onSelect={handleChangeDeptParams}
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
          <Form.Item label="KPI指标:">
            <Select
              style={{ width: 240 }}
              placeholder="请选择KPI"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              disabled={initDept.current === ''}
              allowClear
              onDropdownVisibleChange={handleGetKPI}
              onSelect={handleChangeKPIParams}
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
            <Button htmlType="button" type="primary" onClick={onReset}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card style={{ marginBottom: '30px' }}>
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
      <Card>
        <DashContext.Provider value={{ dept: initDept.current, kpi: initKPI.current }}>
          <LineDemo />
        </DashContext.Provider>
      </Card>
    </div>
  );
};

export default TableList;

import React, { useState, useEffect, useContext, useReducer } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Tag, Space } from 'antd';

import { queryKPIData } from '@/pages/kpi/dashboard/service';
import { TableListItem } from '@/pages/kpi/dashboard/data';
import DashContext from '@/pages/kpi/dashboard/dashContext';
import tableReducer from '@/reducers/tableReducer';

const KPITable: React.FC = () => {
  const { dept, kpi } = useContext(DashContext);
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [loading, setLoading] = useState(true);

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
  const initMonth = { columns };
  const [values, dispatch] = useReducer(tableReducer, initMonth);

  const getMonths = (datas: any) => {
    let a: any;
    for (let i = 1; i < datas.length; i += 1) {
      const month = datas[i];
      a = {
        key: month,
        title: month,
        align: 'center',
        dataIndex: month,
        onCell: (record: any) => {
          if (record[month] !== undefined && record[month] !== null && record[month] !== '-') {
            if (record[month] === 'N/A') {
              return {
                style: {
                  backgroundColor: '#d9d9d9',
                },
              };
            }
            if (parseInt(record[month] as string, 10) < parseInt(record.lLimit as string, 10)) {
              return {
                style: {
                  backgroundColor: '#f5222d',
                },
              };
            }
            if (parseInt(record[month] as string, 10) > parseInt(record.tValue as string, 10)) {
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
          if (value !== undefined && value !== null && value !== '-' && value !== 'N/A') {
            return <span>{value}</span>;
          }
          return <span>{value}</span>;
        },
      };
      columns.push(a);
    }
    return columns;
  };

  useEffect(() => {
    if (dept !== '' || kpi !== '') {
      setLoading(true);
      queryKPIData({ dept, kpi }).then((res) => {
        setDataSource(res.data);
        let months = [];
        months = Object.keys(res.data[0]).slice(0, 12);
        dispatch({ type: 'change', payload: getMonths(months) });
        setLoading(false);
      });
    }
  }, [dept, kpi]);

  return (
    <div>
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
        columns={values.columns}
        dataSource={dataSource}
        loading={loading}
        search={false}
        toolBarRender={false}
        pagination={false}
      />
    </div>
  );
};

export default KPITable;

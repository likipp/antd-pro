import React, { useState, useEffect, useContext } from 'react';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { Tag, Space } from 'antd';

import { queryKPIData } from '@/pages/kpi/dashboard/service';
import { TableListItem } from '@/pages/kpi/dashboard/data';
import DashContext from '@/pages/kpi/dashboard/dashContext';

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

  useEffect(() => {
    if (dept !== '' || kpi !== '') {
      setLoading(true);
      queryKPIData({ dept, kpi }).then((res) => {
        setDataSource(res.data);
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
        columns={initColumns}
        dataSource={dataSource}
        loading={loading}
        search={false}
        pagination={false}
        toolBarRender={false}
      />
    </div>
  );
};

export default KPITable;
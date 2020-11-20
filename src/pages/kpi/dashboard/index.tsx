import React, { useState } from 'react';
import { TableListItem } from '@/pages/kpi/dashboard/data';
import { Tag } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';

// import {queryKPIData} from "@/pages/kpi/dashboard/service";

const TableList: React.FC = () => {
  const [dataSource] = useState<TableListItem[]>([
    {
      key: 1,
      kpiName: '测试1',
      tValue: '70',
      uLimit: '30',
      '2020-01': '30',
      '2020-02': '30',
      '2020-03': '40',
      '2020-04': '100',
      '2020-05': '30',
      '2020-06': '40',
      '2020-07': '40',
      '2020-08': '100',
      '2020-09': '30',
      '2020-10': '100',
      '2020-11': '30',
      '2020-12': '20',
    },
    {
      key: 2,
      kpiName: '测试2',
    },
    {
      key: 3,
      kpiName: '测试3',
    },
  ]);
  // const [loading, setLoading] = useState(true);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'indexBorder',
      valueType: 'indexBorder',
    },
    {
      title: 'KPI',
      dataIndex: 'kpiName',
    },
    {
      title: '目标值',
      dataIndex: 'tValue',
    },
    {
      title: '下限值',
      dataIndex: 'uLimit',
    },
  ];

  // useEffect(() => {
  //   setLoading(true);
  //   queryKPIData().then((res) => {
  //     console.log(res, "res")
  //     setDataSource(res.data);
  //     // console.log(dataSource)
  //     setLoading(false);
  //   });
  // }, []);

  let i;
  let a;
  for (i = 1; i <= 12; i += 1) {
    if (i < 10) {
      a = {
        title: `2020-0${i}`,
        dataIndex: `2020-0${i}`,
        render: (value: any, record: any) => {
          if (value !== undefined && value !== null && value !== '-') {
            if (parseInt(value as string, 10) < parseInt(record.uLimit as string, 10)) {
              return <Tag color="#f5222d">{value}</Tag>;
            }
            if (parseInt(value as string, 10) > parseInt(record.tValue as string, 10)) {
              return <Tag color="#52c41a">{value}</Tag>;
            }
            return <Tag color="#faad14">{value}</Tag>;
          }
          return <Tag color="#d9d9d9">空</Tag>;
        },
      };
      columns.push(a);
    } else {
      a = {
        title: `2020-${i}`,
        dataIndex: `2020-${i}`,
        render: (value: any, record: any) => {
          if (value !== undefined && value !== null && value !== '-') {
            if (parseInt(value as string, 10) < parseInt(record.uLimit as string, 10)) {
              return <Tag color="#f5222d">{value}</Tag>;
            }
            if (parseInt(value as string, 10) > parseInt(record.tValue as string, 10)) {
              return <Tag color="#52c41a">{value}</Tag>;
            }
            return <Tag color="#faad14">{value}</Tag>;
          }
          return <Tag color="#d9d9d9">空</Tag>;
        },
      };
      columns.push(a);
    }
  }

  return (
    <ProTable<TableListItem>
      columns={columns}
      dataSource={dataSource}
      rowKey="kpiName"
      // loading={loading}
    />
  );
};

export default TableList;

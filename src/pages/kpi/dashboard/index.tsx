import React, { useState } from 'react';
import { TableListItem } from '@/pages/kpi/dashboard/data';
import ProTable, { ProColumns } from '@ant-design/pro-table';
// import {queryKPIData} from "@/pages/kpi/dashboard/service";

const TableList: React.FC = () => {
  const [dataSource] = useState<TableListItem[]>([
    {
      key: 1,
      kpiName: '测试1',
      tValue: 70,
      rValue: {
        '2020-08': 100,
        '2020-09': 30,
        '2020-10': 40,
      },
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

  // for (let i = 0; i < 5; i += 1) {
  //   dataSource.push({
  //     key: 1,
  //     kpiName: "测试1"
  //   },
  //     {
  //       key: 2,
  //       kpiName: "测试2"
  //     },
  //     {
  //       key: 3,
  //       kpiName: "测试3"
  //     },
  //     )
  // }

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
      title: '2020-08',
      dataIndex: '2020-08',
    },
    {
      title: '2020-09',
      dataIndex: '2020-09',
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
  return (
    <ProTable<TableListItem>
      columns={columns}
      dataSource={dataSource}
      rowKey="kpi"
      // loading={loading}
    />
  );
};

export default TableList;

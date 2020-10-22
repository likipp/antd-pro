import React from 'react';
import { TableListItem } from '@/pages/kpi/dashboard/data';
import ProTable, { ProColumns } from '@ant-design/pro-table';

const columns: ProColumns<TableListItem>[] = [
  {
    title: '序号',
    dataIndex: 'id',
    key: 'indexBorder',
    valueType: 'indexBorder',
  },
  {
    title: 'KPI',
    dataIndex: 'kpi',
  },
];

export default () => {
  return <ProTable<TableListItem> columns={columns} />;
};

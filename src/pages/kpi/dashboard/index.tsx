import React, { useState, useEffect } from 'react';
import { TableListItem } from '@/pages/kpi/dashboard/data';
// import { Tag } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import styles from './databoard.less';

import { queryKPIData } from '@/pages/kpi/dashboard/service';

const TableList: React.FC = () => {
  const [dataSource, setDataSource] = useState<TableListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [classColor, setClassColor] = useState(styles.normal);
  const [initParams] = useState({ dept: '323404962476326913' });
  const [initState, setState] = useState('');
  // const [rowClassName, setRowClassName] = useState("clickRowStyl")
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
    let i;
    let a: any;
    for (i = 1; i <= 12; i += 1) {
      if (i < 10) {
        a = {
          title: `2020/0${i}`,
          align: 'center',
          dataIndex: `2020/0${i}`,
          render: (value: any, record: any) => {
            if (value !== undefined && value !== null && value !== '-') {
              if (parseInt(value as string, 10) < parseInt(record.uLimit as string, 10)) {
                setClassColor(styles.fail);
                return <span>{value}</span>;
              }
              if (parseInt(value as string, 10) > parseInt(record.tValue as string, 10)) {
                setClassColor(styles.success);
              } else {
                setClassColor(styles.nesc);
                return <span>{value}</span>;
              }
            }
            setClassColor(styles.normal);
            return <span>空</span>;
          },
          className: classColor,
        };
        columns.push(a);
      } else {
        a = {
          title: `2020/${i}`,
          align: 'center',
          dataIndex: `2020/${i}`,
          className: classColor,
          render: (value: any, record: any) => {
            if (value !== undefined && value !== null && value !== '-') {
              if (parseInt(value as string, 10) < parseInt(record.uLimit as string, 10)) {
                setClassColor(styles.fail);
                return <span>{value}</span>;
              }
              if (parseInt(value as string, 10) > parseInt(record.tValue as string, 10)) {
                setClassColor(styles.success);
                return <span>{value}</span>;
              }
              setClassColor(styles.nesc);
              return <span>{value}</span>;
            }
            setClassColor(styles.normal);
            return <span>空</span>;
          },
        };
        columns.push(a);
      }
    }
    return columns;
  });

  // const colList :any[] = []

  // setColumns(prevState => {
  //   return {...prevState, ...colList}
  // })

  // useEffect(() => {
  //
  // }, colList)

  // const getColumns = () => {
  //
  // }

  useEffect(() => {
    setLoading(true);

    queryKPIData(initParams).then((res) => {
      setDataSource(res.data);
      setLoading(false);
    });
  }, []);

  const setRowClass = (record: any) => {
    return record.id === initState ? styles.clickRowStyl : styles.clickRowStyl1;
  };

  return (
    <ProTable<TableListItem>
      bordered
      columns={initColumns}
      dataSource={dataSource}
      rowKey="kpi"
      loading={loading}
      rowClassName={setRowClass}
      onRow={(record) => {
        return {
          onMouseEnter: () => {
            setState(record.id);
          }, // 鼠标移入行
        };
      }}
    />
  );
};

export default TableList;

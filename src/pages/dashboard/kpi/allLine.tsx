import React, { useState, useContext, useMemo } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/dashboard/kpi/service';
import DashContext from '@/pages/dashboard/kpi/dashContext';
import useLine from '@/hooks/useLine';

const AllLineChart: React.FC = () => {
  const { dept } = useContext(DashContext);
  const [data, setData] = useState([]);
  const [lineMin, lineMax] = useLine(data);

  useMemo(() => {
    const asyncFetch = () => {
      queryKPILine({ dept, kpi: '' }).then((res) => {
        setData(() => {
          return res.data;
        });
      });
    };
    asyncFetch();
  }, [dept]);

  const allConfig = {
    data,
    xField: 'date',
    yField: 'value',
    xAxis: {
      nice: true,
      label: {
        style: {
          fill: '#aaa',
          fontSize: 12,
        },
        // rotate: Math.PI / 6,
      },
    },
    yAxis: {
      line: {
        style: {
          stroke: '#aaa',
        },
      },
      tickLine: {
        style: {
          lineWidth: 2,
          stroke: '#aaa',
        },
        length: 5,
      },
      grid: {
        line: {
          style: {
            stroke: '#ddd',
            lineDash: [4, 2],
          },
        },
        alternateColor: 'rgba(0,0,0,0.05)',
      },
      max: lineMax * 2.0,
      min: lineMin * 0.5,
    },
    label: {
      layout: [{ type: 'hide-overlap' }], // 隐藏重叠label
      style: {
        textAlign: 'right',
      },
    },
    seriesField: 'type',
    color: ['#F4664A', '#30BF78', '#FAAD14'],
    // 线性上的数据点
    point: {
      size: 5,
      // 数据点形状
      shape: 'circle',
      // 数据点样式
      // style: {
      //   fill: 'white',
      //   stroke: '#69c0ff',
      //   lineWidth: 2,
      // },
    },
    legend: {
      position: 'top-right',
      itemName: {
        style: {
          fill: '#000',
        },
      },
    },
  };
  if (data === null) {
    return <span>暂无数据</span>;
  }
  // @ts-ignore
  return <Line {...allConfig} style={{ height: '500px' }} />;
};

export default AllLineChart;

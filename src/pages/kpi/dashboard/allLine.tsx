import React, { useState, useContext, useMemo } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/kpi/dashboard/service';
import DashContext from '@/pages/kpi/dashboard/dashContext';
import {CompareWithArray} from "@/utils/compare";
// import {LineValues} from "@/pages/kpi/dashboard/data";
// import useLine from "@/pages/kpi/dashboard/useLine";

const AllLineChart: React.FC = () => {
  const { dept } = useContext(DashContext);
  const [data, setData] = useState([]);
  const [lineMin, setLinMin] = useState(0);
  const [lineMax, setLinMax] = useState(0);
  // const [iniLine, setIniLine] = useLine([])

  useMemo(() => {
    const asyncFetch = () => {
      queryKPILine({ dept, kpi: '' }).then((res) => {
        setData(res.data);
        if (res.data != null) {
          const result = CompareWithArray(res.data);
          setLinMax(() => {
            let value = result.tMax;
            if (value === 0) {
              value = 2;
            }
            return value;
          });
          setLinMin(() => {
            let value = result.tMin;
            if (value === 0) {
              value = -1;
            }
            return value;
          });
        }

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

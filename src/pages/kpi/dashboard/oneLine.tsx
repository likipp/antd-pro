import React, { useState, useContext, useReducer, useMemo } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/kpi/dashboard/service';
import DashContext from '@/pages/kpi/dashboard/dashContext';
import lineReducer from '@/reducers/lineReducer';
import { CompareWithArray } from '@/utils/compare';

const OneLineChart: React.FC = () => {
  const { dept, kpi } = useContext(DashContext);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [data, setData] = useState([]);
  const [lineMin, setLinMin] = useState(0);
  const [lineMax, setLinMax] = useState(0);

  const initValues = { type: '', unit: '' };
  const [values, dispatch] = useReducer(lineReducer, initValues);

  useMemo(() => {
    const asyncFetch = () => {
      queryKPILine({ dept, kpi }).then((res) => {
        setData(res.data);
        const result = CompareWithArray(res.data);
        // 判断数据长度是否小于等于1, 如果是, 则需要对线性的Y轴起点与终点值, 上下限值线性值设置
        if (result.tLen <= 1) {
          result.tMax = res.data[0].u_limit;
          result.tMin = res.data[0].l_limit;
        }
        console.log(res.data);
        setMax(() => {
          return res.data[0].u_limit;
        });
        setMin(() => {
          return res.data[0].l_limit;
        });

        // 设置线性中的最大值与最小值
        setLinMax(() => {
          return result.tMax;
        });
        setLinMin(() => {
          return result.tMin;
        });
        console.log(max, lineMin);
        dispatch({ type: 'change', payload: res.data[0] });
      });
    };
    asyncFetch();
  }, [dept, kpi]);

  const oneConfig = {
    data,
    xField: 'date',
    yField: 'value',
    yAxis: {
      title: {
        text: `${values.type}(${values.unit})`,
        style: {
          fontSize: 16,
        },
      },
      // 设置Y轴max值, 高于最大值
      max: lineMax * 1.2,
      min: lineMin * 0.5,
    },
    point: {
      size: 5,
      // 数据点形状
      shape: 'hexagon',
    },
    annotations: [
      {
        type: 'text',
        position: ['min', min],
        content: `下限值:${min}`,
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
          fill: '#F4664A',
          fontSize: 15,
          fontWeight: 'normal',
        },
      },
      {
        type: 'line',
        start: ['min', min],
        end: ['max', min],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
      {
        type: 'text',
        position: [0, max],
        content: `上限值:${max}`,
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
          fontSize: 15,
          fill: '#52c41a',
          fontWeight: 'normal',
        },
      },
      {
        type: 'line',
        start: ['min', max],
        end: ['max', max],
        style: {
          stroke: '#52c41a',
          lineDash: [2, 2],
        },
      },
    ],
  };
  // @ts-ignore
  return <Line {...oneConfig} style={{ height: '500px' }} />;
};

export default OneLineChart;

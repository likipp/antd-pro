import React, { useState, useContext, useReducer, useMemo } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/kpi/dashboard/service';
import DashContext from '@/pages/kpi/dashboard/dashContext';

const OneLineChart: React.FC = () => {
  const { dept, kpi } = useContext(DashContext);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [data, setData] = useState([]);
  const [lineMin, setLinMin] = useState(0);
  const [lineMax, setLinMax] = useState(0);

  const initValues = { type: '', unit: '' };
  const [values, dispatch] = useReducer(reducer, initValues);
  function reducer(preState: any, action: any) {
    switch (action.type) {
      case 'change':
        return { type: action.payload.type, unit: action.payload.unit };
      case 'clear':
        return { type: '', unit: '' };
      default:
        throw new Error('未知的操作类型, 请联系管理员');
    }
  }

  useMemo(() => {
    const asyncFetch = () => {
      queryKPILine({ dept, kpi }).then((res) => {
        setData(res.data);
        // 定义一个空数组存储实际KPI数据
        const arr: number[] = [];
        res.data.forEach((item: any) => {
          arr.push(item.value);
        });
        setMax(() => {
          return res.data[0].u_limit;
        });
        setMin(() => {
          return res.data[0].l_limit;
        });

        // 设置线性中的最大值与最小值
        setLinMax(() => {
          return Math.max(...arr);
        });
        setLinMin(() => {
          return Math.min(...arr);
        });
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

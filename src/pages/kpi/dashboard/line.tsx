import React, { useState, useEffect, useContext } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/kpi/dashboard/service';
import DashContext from '@/pages/kpi/dashboard/dashContext';

const LineDemo: React.FC = () => {
  const { dept, kpi } = useContext(DashContext);
  const [min, setMin] = useState(30);
  const [max, setMax] = useState(60);
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    queryKPILine({ dept, kpi }).then((res) => {
      setData(res.data);
      if (kpi !== '') {
        setMin(res.data[0].l_limit);
        setMax(res.data[0].u_limit);
      }
    });
  };

  useEffect(() => {
    asyncFetch();
  }, [dept, kpi]);

  const allConfig = {
    data,
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        formatter: function formatter(v: any) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    label: {},
    seriesField: 'type',
    color: ['#F4664A', '#30BF78', '#FAAD14'],
    // 线性上的数据点
    point: {
      size: 5,
      // 数据点形状
      shape: 'circle',
      // 数据点样式
      style: {
        fill: 'white',
        stroke: '#69c0ff',
        lineWidth: 2,
      },
    },
    tooltip: { showMarkers: false },
    lineStyle: function lineStyle(_ref2: any) {
      const { type } = _ref2;
      if (type === 'register') {
        return {
          lineDash: [4, 4],
          opacity: 1,
        };
      }
      return { opacity: 0.5 };
    },
  };

  const oneConfig = {
    data,
    xField: 'date',
    yField: 'value',
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
  if (data === null) {
    return <span>null</span>;
  }

  if (kpi === '') {
    return <Line {...allConfig} />;
  }
  // @ts-ignore
  return <Line {...oneConfig} />;
};

export default LineDemo;

import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/kpi/dashboard/service';

const LineDemo: React.FC = () => {
  const [initParams] = useState({ dept: '323404962476326913' });
  const [data, setData] = useState([]);

  const asyncFetch = () => {
    queryKPILine(initParams).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const config = {
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
    seriesField: 'type',
    color: ['#F4664A', '#30BF78', '#FAAD14'],
    point: {
      size: 5,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
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
  return <Line {...config} />;
};

export default LineDemo;

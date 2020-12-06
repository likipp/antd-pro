import React, { useState, useEffect } from 'react';
import { Line } from '@ant-design/charts';

import { queryKPILine } from '@/pages/kpi/dashboard/service';

interface ChildProps {
  groupKPI: string;
  dept: string;
}

const LineOne: React.FC<ChildProps> = (props) => {
  // const { groupKPI, dept } = props;
  // console.log(groupKPI, 'kpi');
  const [initParams] = useState({ dept: props.dept, kpi: props.groupKPI });
  const [data, setData] = useState([]);
  // const [initValue, setValue] = useState({date: "", value: 0})
  // const [lLimit, setLLimit] = useState(0)
  // const [uLimit, setULimit] = useState(0)

  // let lLimit = 0
  // let uLimit = 0
  const asyncFetch = () => {
    console.log(initParams, 'initParams');
    queryKPILine(initParams).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    asyncFetch();
  }, [initParams.kpi]);

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    annotations: [
      {
        type: 'text',
        position: ['min', 50],
        content: '下限值',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
          // fill: '#8c8c8c',
          fontSize: 15,
          fontWeight: 'normal',
        },
      },
      {
        type: 'line',
        start: ['min', 50],
        end: ['max', 50],
        style: {
          stroke: '#F4664A',
          lineDash: [2, 2],
        },
      },
      {
        type: 'text',
        position: [0, 100],
        content: '上限值',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
          // fontSize: 15,
          // fontWeight: 'normal'
        },
      },
      {
        type: 'line',
        start: ['min', 100],
        end: ['max', 100],
        style: {
          stroke: '#52c41a',
          lineDash: [2, 2],
        },
      },
    ],
  };
  // @ts-ignore
  return <Line {...config} />;
};
export default LineOne;

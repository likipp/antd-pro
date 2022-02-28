import React, {useEffect, useState} from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import {DualAxes, G2, PlotEvent,} from '@ant-design/plots';
import CusTable from "@/pages/table";

const data = [
  {
    "Date": "1月",
    "type": "海外销售收入",
    "value": 636
  },
  {
    "Date": "2月",
    "type": "海外销售收入",
    "value": 0
  },
  {
    "Date": "3月",
    "type": "海外销售收入",
    "value": 879
  },
  {
    "Date": "4月",
    "type": "海外销售收入",
    "value": 842
  },
  {
    "Date": "5月",
    "type": "海外销售收入",
    "value": 1336
  },
  {
    "Date": "6月",
    "type": "海外销售收入",
    "value": 968
  },
  {
    "Date": "7月",
    "type": "海外销售收入",
    "value": 1578
  },
  {
    "Date": "8月",
    "type": "海外销售收入",
    "value": 1028
  },{
    "Date": "9月",
    "type": "海外销售收入",
    "value": 1546
  },
  {
    "Date": "10月",
    "type": "海外销售收入",
    "value": 1190
  },
  {
    "Date": "11月",
    "type": "海外销售收入",
    "value": 941
  },{
    "Date": "12月",
    "type": "海外销售收入",
    "value": 2901
  },


  {
    "Date": "1月",
    "type": "招投标销售收入",
    "value": 561
  },
  {
    "Date": "2月",
    "type": "招投标销售收入",
    "value": 28
  },{
    "Date": "3月",
    "type": "招投标销售收入",
    "value": 1115
  },{
    "Date": "4月",
    "type": "招投标销售收入",
    "value": 994
  },
  {
    "Date": "5月",
    "type": "招投标销售收入",
    "value": 1711
  },{
    "Date": "6月",
    "type": "招投标销售收入",
    "value": 1851
  },{
    "Date": "7月",
    "type": "招投标销售收入",
    "value": 1901
  },{
    "Date": "8月",
    "type": "招投标销售收入",
    "value": 1457
  },{
    "Date": "9月",
    "type": "招投标销售收入",
    "value": 752
  },{
    "Date": "10月",
    "type": "招投标销售收入",
    "value": 197
  },{
    "Date": "11月",
    "type": "招投标销售收入",
    "value": 554
  },{
    "Date": "12月",
    "type": "招投标销售收入",
    "value": 1403
  },

  {
    "Date": "1月",
    "type": "国内销售收入",
    "value": 376
  },
  {
    "Date": "2月",
    "type": "国内销售收入",
    "value": 48
  },
  {
    "Date": "3月",
    "type": "国内销售收入",
    "value": 913
  },
  {
    "Date": "4月",
    "type": "国内销售收入",
    "value": 1242
  },
  {
    "Date": "5月",
    "type": "国内销售收入",
    "value": 1105
  },
  {
    "Date": "6月",
    "type": "国内销售收入",
    "value": 999
  },
  {
    "Date": "7月",
    "type": "国内销售收入",
    "value": 961
  },
  {
    "Date": "8月",
    "type": "国内销售收入",
    "value": 995
  },
  {
    "Date": "9月",
    "type": "国内销售收入",
    "value": 826
  },
  {
    "Date": "10月",
    "type": "国内销售收入",
    "value": 651
  },
  {
    "Date": "11月",
    "type": "国内销售收入",
    "value": 1060
  },
  {
    "Date": "12月",
    "type": "国内销售收入",
    "value": 874
  }
]

const lineData = [
  {
  "Date": "1月",
  "合计": 1574
},
{
  "Date": "2月",
  "合计": 76
},{
  "Date": "3月",
    "合计": 2906
},{
  "Date": "4月",
    "合计": 3078
},{
  "Date": "5月",
    "合计": 4152
},{
  "Date": "6月",
    "合计": 3818
},{
    "Date": "7月",
    "合计": 4441
},{
  "Date": "8月",
    "合计": 3480
},{
  "Date": "9月",
    "合计": 3124
},{
  "Date": "10月",
    "合计": 2038
},{
  "Date": "11月",
    "合计": 2555
},
{
  "Date": "12月",
  "合计": 5178
},
]

export type Member = {
  name: string;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
};

export default (): React.ReactNode => {
  let tableListDataSource = [
    {
      "name": "海外销售收入",
      "1": 636,
      "2": 0,
      "3": 879,
      "4": 842,
      "5": 1336,
      "6": 968,
      "7": 1578,
      "8": 1028,
      "9": 1546,
      "10": 1190,
      "11": 941,
      "12": 2901
    },
    {
      "name": "招投标销售收入",
      "1": 561,
      "2": 28,
      "3": 1115,
      "4": 994,
      "5": 1711,
      "6": 1851,
      "7": 1901,
      "8": 1457,
      "9": 752,
      "10": 197,
      "11": 554,
      "12": 1403
    },
    {
      "name": "国内销售收入",
      "1": 376,
      "2": 48,
      "3": 913,
      "4": 1242,
      "5": 1105,
      "6": 999,
      "7": 961,
      "8": 995,
      "9": 826,
      "10": 651,
      "11": 1060,
      "12": 874
    },
  ];

  const [tableData, setTableData] = useState([{
    "name": "海外销售收入",
    "1": 636,
    "2": 0,
    "3": 879,
    "4": 842,
    "5": 1336,
    "6": 968,
    "7": 1578,
    "8": 1028,
    "9": 1546,
    "10": 1190,
    "11": 941,
    "12": 2901
  },
    {
      "name": "招投标销售收入",
      "1": 561,
      "2": 28,
      "3": 1115,
      "4": 994,
      "5": 1711,
      "6": 1851,
      "7": 1901,
      "8": 1457,
      "9": 752,
      "10": 197,
      "11": 554,
      "12": 1403
    },
    {
      "name": "国内销售收入",
      "1": 376,
      "2": 48,
      "3": 913,
      "4": 1242,
      "5": 1105,
      "6": 999,
      "7": 961,
      "8": 995,
      "9": 826,
      "10": 651,
      "11": 1060,
      "12": 874
    }])

  // useEffect(() => {
  //   console.log(tableData, "useEffect")
  // }, [tableData])

  const { registerInteraction } = G2

  G2.registerShape('point', 'custom-point', {
    draw(cfg, container) {
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group = container.addGroup();
      group.addShape('circle', {
        name: 'outer-point',
        attrs: {
          x: point.x as number,
          y: point.y as number,
          fill: cfg.color || 'red',
          opacity: 0.5,
          r: 6,
        },
      });
      group.addShape('circle', {
        name: 'inner-point',
        attrs: {
          x: point.x as number,
          y: point.y as number,
          fill: cfg.color || 'red',
          opacity: 1,
          r: 2,
        },
      });
      return group;
    },
  });
  registerInteraction('custom-marker-interaction', {
    start: [
      {
        trigger: 'tooltip:show',
        action: 'custom-marker-action:active',
      },
    ],
    end: [
      {
        trigger: 'tooltip:hide',
        action: 'custom-marker-action:reset',
      },
    ],
  });

  registerInteraction('element-single-selected', {
    start: [{ trigger: 'element:click', action: 'element-single-selected:toggle' }],
  });




  const config = {
    data: [data, lineData],
    seriesField: 'type',
    xField: 'Date',
    yField: ['value', '合计'],
    yAxis: {
      min: -100
    },
    slider: {
      // start: 5,
      // end: 9,
      // formatter: (value: any, datum: any, index: number) => {
      //   console.log(index, "value")
      //   // console.log(datum, "datum")
      //   // console.log(index, "index")
      //
      // },
    },
    geometryOptions: [
      {
        geometry: 'column',
        isStack: true,
        seriesField: 'type',
        label: {
          // 可手动配置 label 数据标签位置
          position: 'middle', // 'top', 'bottom', 'middle'
        },
        connectedArea: {
          style: (oldStyle: any[]) => {
            return {
              fill: 'rgba(0,0,0,0.25)',
              stroke: oldStyle.fill,
              lineWidth: 0.5,
            };
          },
        },
      },
      {
        geometry: 'line',
        smooth: true,
        point: {
          size: 5,
          shape: 'custom-point',
          style: {
            fill: 'white',
            stroke: '#5B8FF9',
            lineWidth: 2,
          },
        },
      },
    ],
  };

  return (
    <PageContainer>
      {/*<Line {...lineConfig} />*/}
      {/*<Column {...columnConfig} />*/}
      <DualAxes {...config} onReady={(legend) => {
        legend.on('legend-item:click', (ev) => {
          // const { x, y } = evt;
          // // const { xField } = legend.options;
          // const tooltipData = legend.chart.getTooltipItems({ x, y });
          // console.log(legend.chart.getElements())
          // console.log(tooltipData);
          const target = ev.target;
          const delegateObject = target.get('delegateObject');
          const item = delegateObject.item; // 图例选项

          // setTableData((prev) => {
          //   return prev.filter(i => i.name != item.name)
          // })
        });
      }} />
      <CusTable data={tableData}/>
    </PageContainer>
  );
};

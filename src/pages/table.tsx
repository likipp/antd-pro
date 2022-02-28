import ProTable, {ProColumns} from "@ant-design/pro-table";
import React, {useEffect, useState} from "react";
import type {Member} from "@/pages/Welcome";
import {Switch, Table} from "antd";
import QueueAnim from "rc-queue-anim";

interface Items {
  items?: string,
  data: any
}

const CusTable: React.FC<Items> = (props) => {
  const {data} = props
  const [check, setCheck] = useState(false)

  const columns: ProColumns<Member>[] = [
    {
      dataIndex: 'name',
      title: '名称',
      render: (value: any) => {
        if (value == "招投标销售收入") {
          return (
            <><div style={{backgroundColor: "#61DDAA", marginRight: "10px", width: "10px", height: "10px", display: "inline-block"}}/><span>{value}</span></>
          )
        } else if (value == "海外销售收入") {
          return (
            <><div style={{backgroundColor: "#5B8FF9", marginRight: "10px", width: "10px", height: "10px", display: "inline-block"}}/><span>{value}</span></>
          )
        }
        return <><div style={{backgroundColor: "#65789B", marginRight: "10px", width: "10px", height: "10px", display: "inline-block"}}/><span>{value}</span></>
      }
    },
    {
      dataIndex: '1',
      title: '1月',
    },
    {
      dataIndex: '2',
      title: '2月',
    },{
      dataIndex: '3',
      title: '3月',
    },{
      dataIndex: '4',
      title: '4月',
    },{
      dataIndex: '5',
      title: '5月',
    },{
      dataIndex: '6',
      title: '6月',
    },{
      dataIndex: '7',
      title: '7月',
    },{
      dataIndex: '8',
      title: '8月',
    },{
      dataIndex: '9',
      title: '9月',
    },
    {
      dataIndex: '10',
      title: '10月',
    },{
      dataIndex: '11',
      title: '11月',
    },
    {
      dataIndex: '12',
      title: '12月',
    },
  ];

  return (
    <div>
      <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked={check} onClick={() => {setCheck(!check)}} style={{margin: "10px 0"}} />
      <QueueAnim
        delay={300}
        type={['right', 'left']}
        ease={['easeOutQuart', 'easeInOutQuart']}
      >
        {
          check ? <Table dataSource={data} columns={columns} pagination={false}/>
            : null
        }
      </QueueAnim>
    </div>
  )
}

export default CusTable

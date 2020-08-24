import React from 'react';

import { Layout, Button, Space,  Row, Col, Avatar, Tag, Divider } from 'antd'
import { CloseOutlined, ManOutlined } from '@ant-design/icons'

import style from './index.less'

const { Header, Footer, Content } = Layout

const UserDetailInfoCard: React.FC = (prp:any) => {
  // const [modalVisible, setModalVisible]= useState(false)
  const DemoBox = (props: any) => {
    return (
      <Row>
        <Col span={6} className={style.DetailRowKey}>
          <span>{props.title}:</span>
        </Col>
        <Col span={18}>
          <span className={props.value ? style.DetailRowValue : style.DetailRowValueColor}>{props.value ? props.value : "未设置"}</span>
        </Col>
      </Row>
    )

  }
  return (
    // <div className="details-info" style={{
    //   width:"400px",
    //   height: "100%",
    //   position: "absolute",
    //   zIndex: 13,
    //   top: 0,
    //   display: "block",
    //   background: "#fff",
    //   boxSizing: "border-box"
    //   // transition: all .3s ease
    // }}>
    //   <header>
    //     <p>用户信息</p>
    //   </header>
    // </div>
   <Layout className={style.DetailLayout}>
     <Header className={style.DetailHeader}>
       <Row>
         <Col span={8}>用户信息</Col>
         <Col span={2} offset={14}>
           <CloseOutlined />
         </Col>
       </Row>
     </Header>
     <Content className={style.DetailContent}>
       <Row justify="space-around" align="middle">
         <Col span={4}>
           <Row>
             <Avatar size={60} style={{lineHeight: "33px", marginBottom: "10px"}}>三</Avatar>
           </Row>
         </Col>
         <Col span={16}>
           <Col style={{display: "inline-block"}}>{prp.name}</Col>
           <span style={{margin: "0px 30px 0px 10px"}}>
               <ManOutlined style={{ fontSize: '16px', color: '#08c' }} />
             </span>
           <Tag color="blue">禁用</Tag>
           <Row>
             <span>帐号:</span>
             <span style={{marginLeft: "5px"}}>zs</span>
           </Row>
         </Col>
       </Row>
       <DemoBox title="登录名" value="" />
       <DemoBox title="生日" value="1990-09-01" />
       <Divider style={{margin: "10px 0px"}} type="horizontal"/>
     </Content>
     <Footer className={style.DetailFooter}>
       <Space size={5}>
         <Button size="middle">编辑</Button>
         <Button size="middle">启用</Button>
         <Button size="middle" danger>删除</Button>
       </Space>
     </Footer>
   </Layout>
  )
}

export default UserDetailInfoCard

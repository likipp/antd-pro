import React from 'react';

import { Layout, Button, Space,  Row, Col, Avatar, Tag, Divider } from 'antd'
import { CloseOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons'

import style from './index.less'
import { UserDetailInfo } from '@/pages/base/user/data';

interface DisplayUserInfo{
  Data: UserDetailInfo,
  Status: string
}

const { Header, Footer, Content } = Layout

const UserDetailInfoCard: React.FC<DisplayUserInfo> = (info) => {
  console.log(info, "prp")
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
    <Layout className={style.DetailLayout} style={{display: info.Status}}>
      <Header className={style.DetailHeader}>
        <Row>
          <Col span={8}>用户信息</Col>
          <Col span={2} offset={14}>
            <CloseOutlined/>
          </Col>
        </Row>
      </Header>
      <Content className={style.DetailContent}>
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <Row>
              {info.Data.sex
                ? <Avatar size={60} style={{lineHeight: "33px", marginBottom: "10px", backgroundColor: 'red'}}>
                  {info.Data.nickname.substring(1)}</Avatar>
                : <Avatar size={60} style={{lineHeight: "33px", marginBottom: "10px", backgroundColor: '#08c'}}>
                  {info.Data.nickname.substring(1)}</Avatar>}
            </Row>
          </Col>
          <Col span={16}>
            <Col style={{display: "inline-block"}}>{info.Data.nickname}</Col>
            <span style={{margin: "0px 30px 0px 10px"}}>
             {info.Data.sex
               ? <WomanOutlined style={{fontSize: '16px', color: 'red'}} />
               : <ManOutlined style={{ fontSize: '16px', color: '#08c' }} />}
             </span>
            <Tag color={info.Data.status ? "blue" : "red"}>{info.Data.status ? "启用" : "禁用"}</Tag>
            <Row>
              <span>帐号:</span>
              <span style={{marginLeft: "5px"}}>{info.Data.username}</span>
            </Row>
          </Col>
        </Row>
        <DemoBox title="登录名" value="" />
        <DemoBox title="创建日期" value={info.Data.createdAt} />
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

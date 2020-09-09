import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';

import { Layout, Button, Space, Row, Col, Avatar, Tag, Divider, message } from 'antd';
import { CloseOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

import { UserDetailInfo } from '@/pages/base/user/data';
import { setUserStatus } from '@/pages/base/user/service';

import style from './index.less';

interface DisplayUserInfo {
  Data: UserDetailInfo;
  Status: string;
  DisplayStatus: Function;
  UserInfo: Function;
}

const { Header, Footer, Content } = Layout;

const UserDetailInfoCard: React.FC<DisplayUserInfo> = (info) => {
  const { Data, Status, DisplayStatus, UserInfo } = info;
  const [initUUID, setUUID] = useState('');
  const [initUserStatus, setUserStatusState] = useState(Data.status);
  const DemoBox = (props: any) => {
    return (
      <Row>
        <Col span={6} className={style.DetailRowKey}>
          <span>{props.title}:</span>
        </Col>
        <Col span={18}>
          <span className={props.value ? style.DetailRowValue : style.DetailRowValueColor}>
            {props.value ? props.value : '未设置'}
          </span>
        </Col>
      </Row>
    );
  };

  const handleCloseCard = () => {
    DisplayStatus('none');
  };

  const handleSetUserStatus = () => {
    if (Data.status) {
      setUserStatusState(0);
    } else {
      setUserStatusState(1);
    }
    setUUID(Data.uuid as string);
  };

  // useEffect({}, [info.Data.status])
  useEffect(() => {
    if (typeof initUserStatus === 'number') {
      setUserStatus({
        uuid: initUUID,
        status: initUserStatus,
      }).then((res) => {
        message.success(res.msg);
      });
      // DisplayStatus(Status)
      UserInfo(initUserStatus);
    }
  }, [initUserStatus]);
  return (
    <Layout className={style.DetailLayout} style={{ display: Status }}>
      <Header className={style.DetailHeader}>
        <Row>
          <Col span={8}>用户信息</Col>
          <Col span={2} offset={14}>
            <CloseOutlined onClick={handleCloseCard} />
          </Col>
        </Row>
      </Header>
      <Content className={style.DetailContent}>
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <Row>
              <Avatar size={60} className={info.Data.sex ? style.Woman : style.Man}>
                {Data.nickname.substring(1)}
              </Avatar>
            </Row>
          </Col>
          <Col span={16}>
            <Col style={{ display: 'inline-block' }}>{Data.nickname}</Col>
            <span style={{ margin: '0px 30px 0px 10px' }}>
              {Data.sex ? (
                <WomanOutlined style={{ fontSize: '16px', color: 'red' }} />
              ) : (
                <ManOutlined style={{ fontSize: '16px', color: '#08c' }} />
              )}
            </span>
            <Tag color={info.Data.status ? 'blue' : 'red'}>{Data.status ? '启用' : '禁用'}</Tag>
            <Row>
              <span>帐号:</span>
              <span style={{ marginLeft: '5px' }}>{Data.username}</span>
            </Row>
          </Col>
        </Row>
        <DemoBox title="登录名" value="" />
        <DemoBox title="创建日期" value={moment(Data.createdAt).format('YYYY-MM-DD hh:mm')} />
        <DemoBox title="更新日期" value={moment(Data.updatedAt).format('YYYY-MM-DD hh:mm')} />
        <DemoBox title="部门" value="信息部" />
        <DemoBox title="岗位" value="管理员" />
        <DemoBox title="上级领导" value={0} />
        <DemoBox title="下级" value={1} />
        <DemoBox title="所属角色" value={Data.roles.length} />
        <Divider style={{ margin: '10px 0px' }} type="horizontal" />
      </Content>
      <Footer className={style.DetailFooter} style={{ textAlign: 'center' }}>
        <Space size={5}>
          <Button size="middle">编辑</Button>
          <Button size="middle" onClick={handleSetUserStatus}>
            {Data.status ? '禁用' : '启用'}
          </Button>
          <Button size="middle" danger>
            删除
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};

export default UserDetailInfoCard;

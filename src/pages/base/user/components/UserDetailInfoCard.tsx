import React, { useReducer, useMemo } from 'react';
import moment from 'moment/moment';

import { Layout, Button, Space, Row, Col, Avatar, Tag, Divider, message } from 'antd';
import { CloseOutlined, ManOutlined, WomanOutlined } from '@ant-design/icons';

import { queryUserByID, DeleteUser, updateUserStatus} from '@/pages/base/user/service';
import userDetailReducer from "@/reducers/userDetailReducer";
import style from './index.less';

interface DisplayUserInfo {
  UUID: string;
  Status: string;
  DisplayStatus: Function;
  UserInfo: Function;
}

const { Header, Footer, Content } = Layout;

// @ts-ignore
const UserDetailInfoCard: React.FC<DisplayUserInfo> = (info) => {
  const { UUID, Status, DisplayStatus, UserInfo } = info;
  const initialInfo = {
      key: 0,
      uuid: '',
      username: '',
      nickname: '',
      deptID: '',
      remark: '',
      sex: '',
      status: 0,
      DeptName: '',
      createdAt: 0,
      updatedAt: 0,
      roles: []
  }
  const [userInfos, dispatch] = useReducer(userDetailReducer, initialInfo);
  const UserDetailRow = (props: any) => {
    return (
      <Row style={{ marginBottom: '10px' }}>
        <Col span={6}>
          <span className={style.DetailRowValueColor}>{props.title}:</span>
        </Col>
        <Col span={18}>
          <span className={props.value ? style.DetailRowValue : style.DetailRowValueColor}>
            {props.value ? props.value : '未设置'}
          </span>
        </Col>
      </Row>
    );
  };

  useMemo(() => {
    queryUserByID(UUID).then((res) => {
      dispatch({type: 'change', payload: res.result})
    });
  }, [UUID]);

  const handleCloseCard = () => {
    DisplayStatus('none');
  };

  // 根据父组件传递过来的状态，相应的变更用户状态
  const handleSetUserStatus = () => {
    let status: number
    if (userInfos.status === 0) {
      status = 1
    } else {
      status = 0
    }
    updateUserStatus({
      uuid: userInfos.uuid,
      status,
    }).then((res) => {
      message.success(res.msg);
      DisplayStatus('none');
      UserInfo(true);
    });
  };

  const handleDeleteUser = () => {
    DeleteUser(userInfos.uuid).then(res => {
      message.success(res.msg);
      DisplayStatus('none');
      UserInfo(true);
    })
  }

  // useEffect(() => {
  // }, [initUserStatus]);

  return (
    <Layout className={style.DetailLayout} style={{ display: Status }}>
      <Header className={style.DetailHeader}>
        <p style={{display: "inline-block"}}>用户详情</p>
        <div style={{display: "inline-block", float: "right", marginLeft: "3px"}}>
          <CloseOutlined onClick={handleCloseCard} />
        </div>
      </Header>
      <Content className={style.DetailContent}>
        <Row justify="space-around" align="middle">
          <Col span={4}>
            <Row>
              <Avatar size={60} className={userInfos.sex ? style.Woman : style.Man}>
                <span style={{ fontSize: '20px', fontWeight: 600 }}>
                  {userInfos.nickname.substring(1)}
                </span>
              </Avatar>
            </Row>
          </Col>
          <Col span={18}>
            <Col
              style={{
                display: 'inline-block',
                fontSize: '20px',
                fontWeight: 600,
                verticalAlign: 'middle',
                overflow: 'hidden',
              }}
              span={10}
            >
              {userInfos.nickname}
            </Col>
            <Col span={14} style={{ display: 'inline-block' }}>
              <span style={{ margin: '0px 30px 0px 10px' }}>
                {userInfos.sex ? (
                  <WomanOutlined style={{ fontSize: '16px', color: 'red' }} />
                ) : (
                  <ManOutlined style={{ fontSize: '16px', color: '#08c' }} />
                )}
              </span>
              <Tag color={userInfos.status === 1 ? 'blue' : 'red'}>
                {userInfos.status === 1 ? '启用' : '禁用'}
              </Tag>
            </Col>
            <Row>
              <span style={{ color: '#787878' }}>帐号:</span>
              <span style={{ marginLeft: '5px' }}>{userInfos.username}</span>
            </Row>
          </Col>
        </Row>
        <Divider style={{ margin: '10px 0px' }} type="horizontal" />
        <UserDetailRow title="登录名" value="" />
        <UserDetailRow
          title="创建日期"
          value={moment(userInfos.createdAt).format('YYYY-MM-DD hh:mm')}
        />
        <UserDetailRow
          title="更新日期"
          value={moment(userInfos.updatedAt).format('YYYY-MM-DD hh:mm')}
        />
        <UserDetailRow title="部门" value="信息部" />
        <UserDetailRow title="岗位" value="管理员" />
        <UserDetailRow title="上级领导" value={0} />
        <UserDetailRow title="下级" value={1} />
        <UserDetailRow title="所属角色" value={userInfos.roles.length} />
        {/* <Divider style={{ margin: '10px 0px' }} type="horizontal" /> */}
      </Content>
      <Footer className={style.DetailFooter} style={{ textAlign: 'center' }}>
        <Space size={5}>
          <Button size="middle">编辑</Button>
          <Button size="middle" onClick={handleSetUserStatus}>
            {userInfos.status === 1 ? '禁用' : '启用'}
          </Button>
          <Button size="middle" danger onClick={handleDeleteUser}>
            删除
          </Button>
        </Space>
      </Footer>
    </Layout>
  );
};

export default UserDetailInfoCard;

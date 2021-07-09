// import React from 'react';
import { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig, Link } from 'umi';
// import RightContent from '@/components/RightContent';
// import Footer from '@/components/Footer';
import { RequestOptionsInit, ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
// import defaultSettings from '../config/defaultSettings';
import { RunTimeLayoutConfig } from '@@/plugin-layout/layoutExports';
import { getMenus } from '@/pages/base/user/service';
import fixMenuItemIcon from '@/utils/fixMenuItemIcon';

const loginPath = '/user/login';
const routes = [
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/kpi',
    name: '仪表盘',
    icon: 'setting',
    routes: [
      {
        path: '/kpi/dashboard',
        name: 'KPI视图',
        component: './kpi/dashboard',
      },
    ],
  },
  {
    component: './404',
  },
]

export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrent();
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    // menuItemRender: (menuItemProps, defaultDom) => {
    //   if (
    //     menuItemProps.isUrl ||
    //     !menuItemProps.path ||
    //     location.pathname === menuItemProps.path
    //   ) {
    //     return defaultDom;
    //   }
    //   return (
    //     <Link to={menuItemProps.path}>
    //       {menuItemProps.pro_layout_parentKeys &&
    //         menuItemProps.pro_layout_parentKeys.length > 0 &&
    //         menuItemProps.icon}
    //       {defaultDom}
    //     </Link>
    //   );
    // },
    menu: {
      // 取消菜单多国语言报错
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        UUID: initialState?.currentUser?.UUID,
      },
      request: async () => {
        // initialState.currentUser 中包含了所有用户信息
        const menuData = await getMenus().then((res) => {
          const result = [...routes, ...res.result]
          return result;
        });
        fixMenuItemIcon(menuData);
        return menuData;
      },
    },
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

const authHeaderInterceptor = (url: string, options: RequestOptionsInit) => {
  const authHeader = { Authorization: `Bearer ${  localStorage.getItem('token')}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
};

import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import {notification, message} from 'antd';
import type {RequestConfig, RunTimeLayoutConfig} from 'umi';
import {history, Link} from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import {queryCurrent} from './services/ant-design-pro/api';
import { logout } from './services/user';
// import {getMenus} from '@/pages/base/user/service';
// import fixMenuStruct from '@/utils/fixMenuStruct';
// import {defaultRoutes} from '../config/defaultRoutes';
// import baseRoutes from '../config/baseRoutes';
// import { BookOutlined, LinkOutlined } from '@ant-design/icons';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const initPath = '/'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
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
  if (history.location.pathname !== loginPath  && history.location.pathname !== initPath) {
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

/**
 * 异常处理程序
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
 //-----English
    200: The server successfully returned the requested data. ',
    201: New or modified data is successful. ',
    202: A request has entered the background queue (asynchronous task). ',
    204: Data deleted successfully. ',
    400: 'There was an error in the request sent, and the server did not create or modify data. ',
    401: The user does not have permission (token, username, password error). ',
    403: The user is authorized, but access is forbidden. ',
    404: The request sent was for a record that did not exist. ',
    405: The request method is not allowed. ',
    406: The requested format is not available. ',
    410':
        'The requested resource is permanently deleted and will no longer be available. ',
    422: When creating an object, a validation error occurred. ',
    500: An error occurred on the server, please check the server. ',
    502: Gateway error. ',
    503: The service is unavailable. ',
    504: The gateway timed out. ',
 * @see https://beta-pro.ant.design/docs/request-cn
 */

// 验证Header传递的token
const authHeaderInterceptor = (url: string, options: any) => {
  // const authHeader = { Authorization: `Bearer ${localStorage.getItem('x-token')}` };
  const authHeader = { "x-token": `${localStorage.getItem('x-token')}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  errorHandler: (error: any) => {
    const { response } = error;

    if (!response) {
      notification.error({
        description: '您的网络发生异常，无法连接服务器',
        message: '网络异常',
      });
    }
    throw error;
  },
  requestInterceptors: [authHeaderInterceptor],
};


// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {

  return {
    rightContentRender: () => <RightContent />,
    // layout布局不一样时, 此处写法不一样
    menuItemRender: (menuItemProps, defaultDom) => {
      if (
        menuItemProps.isUrl ||
        !menuItemProps.path
        // || location.pathname === menuItemProps.path
      ) {
        return defaultDom;
      }
      return (
        <Link to={menuItemProps.path}>
          {menuItemProps.pro_layout_parentKeys &&
            menuItemProps.pro_layout_parentKeys.length > 0 &&
            menuItemProps.icon}
          {defaultDom}
        </Link>
      );
    },
    // menu: {
    //   // 取消菜单多国语言报错
    //   locale: false,
    //   // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
    //   params: {
    //     uuid: initialState?.currentUser?.uuid,
    //   },
    //   request: async () => {
    //     // let menuData: any
    //     // if (initialState?.currentUser?.uuid) {
    //     //
    //     // }
    //     // menuData = [];
    //     const menuData = await getMenus().then((res) => {
    //       return [...defaultRoutes, ...res.data, ...baseRoutes];
    //     });
    //     fixMenuStruct(menuData);
    //     // initialState.currentUser 中包含了所有用户信息
    //     return menuData;
    //   },
    // },
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    // links: isDev
    //   ? [
    //       <Link to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: false,
   // 自定义 403 页面
    unAccessible: <div>unAccessible</div>,
    logout: () => {
      alert('退出登录成功');
      console.log("点击退出按钮")
      logout().then((res) => {
        message.success('退出登录成功,即将跳转到登录页');
        history.push('/');
      })
    },
    ...initialState?.settings,
  };
};

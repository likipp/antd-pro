import type {Settings as LayoutSettings} from '@ant-design/pro-layout';
import {PageLoading} from '@ant-design/pro-layout';
import {message, notification} from 'antd';
import type {RequestConfig} from 'umi';
import {history, Link} from 'umi';
import type {RequestOptionsInit, ResponseError} from 'umi-request';
import {queryCurrent} from './services/user';
import type {RunTimeLayoutConfig} from '@@/plugin-layout/layoutExports';
import {getMenus} from '@/pages/base/user/service';
import fixMenuStruct from '@/utils/fixMenuStruct';
import routes from '../config/defaultRoutes';
import RightContent from './components/RightContent';

// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const initPath = '/'

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState(): Promise<{
  name?: string;
  avatar?: string;
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await queryCurrent();
      console.log(res, "app.tsx中的fetchUserInfo")
      return res
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath && history.location.pathname !== initPath) {
    const currentUser = await fetchUserInfo();
    console.log(currentUser, "登录后的currentUser")
    const name = currentUser?.nickname;
    // const avatar = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';
    const avatar = currentUser?.avatar
    return {
      name,
      avatar,
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
  console.log("layout中的initialState", initialState)
  return {
    rightContentRender: () => <RightContent />,
    // menuDataRender: () => [],
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
    menu: {
      // 取消菜单多国语言报错
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        uuid: initialState?.currentUser?.uuid,
      },
      // params: initialState,
      request: async () => {
        const haveToken = localStorage.getItem("token")
        if (haveToken === null) {
          return []
        }
        // initialState.currentUser 中包含了所有用户信息
        const menuData = await getMenus().then((res) => {
          return [...routes, ...res.data];
        });
        fixMenuStruct(menuData);
        return menuData;
      },
    },
    menuHeaderRenderer: undefined,
    disableContentMargin: false,
    // 页面水印
    waterMarkProps: {
      content: initialState?.currentUser?.nickname,
    },
    onPageChange: () => {
      const { location } = history;
      // 暂时不知道initialState 不知道怎么使用， 先用localStorage临时代替
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser?.uuid && location.pathname !== loginPath) {
      //   history.push(loginPath);
      //
      // initialState?.currentUser
      // }
      console.log(initialState?.currentUser?.uuid, "initialState?.currentUser?.uuid", initialState?.currentUser?.nickname)
      if (localStorage.getItem("token") === null && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      message.success('退出登录成功,即将跳转到登录页');
      history.push('/');
    },
    ...initialState?.settings,
  };
};

// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   405: '请求方法不被允许。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  // data是后端返回的异步结果
  const { response, data } = error;
  if (response && response.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    // const { status, url } = response;
    const { status } = response;
    notification.error({
      // message: `请求错误 ${status}: ${url}`,
      message: `请求错误 ${status}`,
      description: data.errorMessage,
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
  const authHeader = { Authorization: `Bearer ${localStorage.getItem('token')}` };
  return {
    url: `${url}`,
    options: { ...options, interceptors: true, headers: authHeader },
  };
};

export const request: RequestConfig = {
  errorHandler,
  requestInterceptors: [authHeaderInterceptor],
};

// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './defaultRoutes'

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  // 只需要 dev，这么配
  mfsu: {},
  // 如果需要针对生产环境生效，这么配
  // mfsu: { production: { output: '.mfsu-production' } },
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // Can't read property 'ModuleFederationPlugin' of undefined.
  webpack5: {},
  // layout: {
  //   name: 'Ant Design Pro',
  //   locale: false,
  //   siderWidth: 208,
  // },
  // layout: 'sidemenu',
  // contentWidth: 'Fluid',
  // fixedHeader: false,
  // fixSiderbar: false,
  // title: 'Ant Design Pro',
  // pwa: false,
  // iconfontUrl: '',
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  // routes: [
  //   {
  //     path: '/user',
  //     layout: false,
  //     routes: [
  //       {
  //         name: 'login',
  //         path: '/user/login',
  //         component: './user/login',
  //       },
  //     ],
  //   },
  //
  //   {
  //     path: '/welcome',
  //     name: 'welcome',
  //     icon: 'smile',
  //     component: './Welcome',
  //   },
  //   {
  //     path: '/admin',
  //     name: 'admin',
  //     icon: 'crown',
  //     access: 'canAdmin',
  //     component: './Admin',
  //     routes: [
  //       {
  //         path: '/admin/sub-page',
  //         name: 'sub-page',
  //         icon: 'smile',
  //         component: './Welcome',
  //       },
  //     ],
  //   },
  //   {
  //     path: '/base',
  //     name: '系统设置',
  //     icon: 'setting',
  //     // component: '',
  //     routes: [
  //       {
  //         path: '/base/user',
  //         name: 'userManager',
  //         component: '@/pages/base/user',
  //         // routes: [],
  //         parent_id: "362166697114730497",
  //         parent_path: "",
  //         sequence: 0,
  //         show_status: 1,
  //         status: 0,
  //         uuid: "362186518489464833",
  //         icon: "smile"
  //       },
  //       {
  //         path: '/base/department',
  //         name: 'deptManager',
  //         component: '@/pages/base/department',
  //       },
  //       {
  //         path: '/base/role',
  //         name: 'roleManager',
  //         component: '@/pages/base/role',
  //       },
  //     ],
  //   },
  //   {
  //     name: 'list.table-list',
  //     icon: 'table',
  //     path: '/list',
  //     component: './ListTableList',
  //   },
  //   {
  //     path: '/',
  //     redirect: '/welcome',
  //   },
  //   {
  //     component: './404',
  //   },
  // ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  // Fast Refresh 热更新
  fastRefresh: {},
  routes,
  // openAPI: [
  //   {
  //     requestLibPath: "import { request } from 'umi'",
  //     // 或者使用在线的版本
  //     // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
  //     // schemaPath: join(__dirname, 'oneapi.json'),
  //     mock: false,
  //   },
  //   {
  //     requestLibPath: "import { request } from 'umi'",
  //     schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
  //     projectName: 'swagger',
  //   },
  // ],
  nodeModulesTransform: { type: 'none' },
  exportStatic: {},
});

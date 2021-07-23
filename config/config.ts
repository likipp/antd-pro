// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import {defaultRoutes} from "./defaultRoutes"

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
  // fastRefresh: {},
  // routes: defaultRoutes,
  nodeModulesTransform: { type: 'none' },
  exportStatic: {},
});

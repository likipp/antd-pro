export const defaultRoutes = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: './Welcome',
  },
  {
    uuid: '362166697114730497',
    path: '/kpi',
    name: '仪表盘',
    icon: 'setting',
    routes: [
      {
        parent_id: '362166697114730497',
        path: '/kpi/dashboard',
        name: 'KPI视图',
        component: '@/pages/kpi/dashboard',
      },
    ],
  },
  {
    component: './404',
  },
];

export default [
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
    hideInMenu:true,
    component: './Welcome',
  },
  {
    path: '/kpi',
    name: '仪表盘',
    icon: 'dashboard',
    routes: [
      {
        path: '/kpi/dashboard',
        icon: 'lineChart',
        name: 'KPI视图',
        component: '@/pages/kpi/dashboard',
      },
    ]
  },
  {
      path: '/',
      redirect: '/welcome',
  },
  {
    component: './404',
  }
]


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
    path: '/dashboard',
    name: '仪表盘',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard/kpi',
        icon: 'lineChart',
        name: 'KPI视图',
        component: '@/pages/dashboard/kpi',
      },
    ]
  },
  {
    path: '/kpibase',
    name: 'KPI模块',
    icon: 'dashboard',
    routes: [
      {
        path: '/kpi/base',
        icon: 'lineChart',
        name: '基础数据',
        component: '@/pages/kpi/base',
      },
      {
        path: '/kpi/assign',
        icon: 'lineChart',
        name: '分配部门',
        component: '@/pages/kpi/assign',
      },
      {
        path: '/kpi/commit',
        icon: 'lineChart',
        name: 'KPI汇报',
        component: '@/pages/kpi/commit',
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


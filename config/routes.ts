export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
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
  path: '/kpi',
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
    path: '/base',
    name: '基础资料',
    icon: 'dashboard',
    routes: [
      {
        path: '/base/department',
        icon: 'lineChart',
        name: '部门',
        component: '@/pages/base/department',
      },
      {
        path: '/base/role',
        icon: 'lineChart',
        name: '角色',
        component: '@/pages/base/role',
      },
      {
        path: '/base/user',
        icon: 'lineChart',
        name: '用户',
        component: '@/pages/base/user',
      },
    ]
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

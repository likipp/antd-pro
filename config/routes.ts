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
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    routes: [
      {
        path: '/dashboard/kpi',
        icon: 'lineChart',
        name: 'kpi',
        component: '@/pages/dashboard/kpi',
      },
    ]
  },
  {
  path: '/kpi',
  name: 'kpi',
  icon: 'safety',
  routes: [
    {
      path: '/kpi/base',
      icon: 'file',
      name: 'base',
      component: '@/pages/kpi/base',
    },
    {
      path: '/kpi/assign',
      icon: 'antDesign',
      name: 'assign',
      component: '@/pages/kpi/assign',
    },
    {
      path: '/kpi/commit',
      icon: 'form',
      name: 'commit',
      component: '@/pages/kpi/commit',
    },
  ]
},
  {
    path: '/base',
    name: 'base',
    icon: 'setting',
    routes: [
      {
        path: '/base/department',
        icon: 'apartment',
        name: 'deptManager',
        component: '@/pages/base/department',
      },
      {
        path: '/base/role',
        icon: 'team',
        name: 'roleManager',
        component: '@/pages/base/role',
      },
      {
        path: '/base/user',
        icon: 'user',
        name: 'userManager',
        component: '@/pages/base/user',
      },
    ]
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

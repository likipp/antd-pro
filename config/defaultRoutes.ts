export default [{
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
    icon: 'skype',
    component: './Welcome',
  },
  {
    path: '/kpi',
    name: '仪表盘',
    icon: 'setting',
    children: [
      {
        path: '/kpi/dashboard',
        icon: 'smile',
        name: 'KPI视图',
        component: '@/pages/kpi/dashboard',
      },
    ]
  },
  {
    component: './404',
  },]


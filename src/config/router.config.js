// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: 'dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: { title: '仪表盘', keepAlive: true, icon: bxAnaalyse, permission: ['dashboard'] },
        children: [
          {
            path: 'analysis/:pageNo([1-9]\\d*)?',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', keepAlive: false, permission: ['dashboard'] }
          },
          {
            path: 'workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', keepAlive: true, permission: ['dashboard'] }
          },
          {
            path: 'monitor',
            name: 'Monitor',
            component: () => import('@/views/dashboard/Monitor'),
            meta: { title: '测试功能', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },
      {
        path: '/order',
        redirect: '/order/resident',
        component: PageView,
        meta: { title: '订单管理', icon: 'unordered-list', permission: ['order'] },
        children: [
          {
            path: '/order/resident',
            name: 'OrderResident',
            component: () => import('@/views/order/resident/Resident'),
            meta: { title: '居民搬家', keepAlive: true, permission: ['order'] }
          },
          {
            path: '/order/company',
            name: 'OrderCompany',
            component: () => import('@/views/order/company/Company'),
            meta: { title: '单位企业搬迁', keepAlive: true, permission: ['order'] }
          }
        ]
      },
      {
        path: '/statistics',
        redirect: '/statistics/Telephone',
        component: PageView,
        meta: { title: '报表统计', icon: 'line-chart' },
        children: [
          {
            path: '/statistics/Telephone',
            name: 'StatisticsTelephone',
            component: () => import('@/views/statistics/Telephone'),
            meta: { title: '接线员报表统计', keepAlive: true }
          },
          {
            path: '/statistics/Partner',
            name: 'StatisticsPartner',
            component: () => import('@/views/statistics/Partner'),
            meta: { title: '合伙人报表统计', keepAlive: true }
          }
        ]
      },
      {
        path: '/wechat',
        redirect: '/wechat/user',
        component: PageView,
        meta: { title: '微信管理', icon: 'wechat' },
        children: [
          {
            path: '/wechat/user',
            name: 'WechatUser',
            component: () => import('@/views/wechat/User'),
            meta: { title: '微信用户', keepAlive: true }
          }
        ]
      },
      {
        path: '/basic',
        redirect: '/basic/car',
        component: PageView,
        meta: { title: '基础数据管理', icon: 'database' },
        children: [
          {
            path: '/basic/car',
            name: 'BasicCar',
            component: () => import('@/views/basic/car/Car'),
            meta: { title: '车型管理', keepAlive: true }
          },
          {
            path: '/basic/leader',
            name: 'BasicLeader',
            component: () => import('@/views/basic/leader/Leader'),
            meta: { title: '队长管理', keepAlive: true }
          },
          {
            path: '/basic/setting',
            name: 'BasicSetting',
            component: () => import('@/views/basic/setting/Setting'),
            meta: { title: '参数设置', keepAlive: true }
          },
          {
            path: '/basic/goods',
            name: 'BasicGoods',
            component: () => import('@/views/basic/goods/Goods'),
            meta: { title: '物品管理', keepAlive: true }
          },
          {
            path: '/basic/category',
            name: 'BasicCategory',
            component: () => import('@/views/basic/category/Category'),
            meta: { title: '物品分类', keepAlive: true }
          }
        ]
      },
      {
        path: '/setting',
        redirect: '/setting/user',
        component: PageView,
        meta: { title: '系统管理', icon: 'setting' },
        children: [
          {
            path: '/setting/user',
            name: 'SettingUser',
            component: () => import('@/views/setting/user/User'),
            meta: { title: '用户管理', keepAlive: true }
          },
          {
            path: '/setting/role',
            name: 'SettingRole',
            component: () => import('@/views/setting/role/Role'),
            meta: { title: '角色管理', keepAlive: true }
          },
          {
            path: '/setting/permission',
            name: 'StepForm',
            // component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '权限管理', keepAlive: true }
          }
        ]
      }
      // account
      // {
      //   path: '/account',
      //   component: RouteView,
      //   redirect: '/account/center',
      //   name: 'account',
      //   meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
      //   children: [
      //     {
      //       path: '/account/center',
      //       name: 'center',
      //       component: () => import('@/views/account/center/Index'),
      //       meta: { title: '个人中心', keepAlive: true, permission: ['user'] }
      //     },
      //     {
      //       path: '/account/settings',
      //       name: 'settings',
      //       component: () => import('@/views/account/settings/Index'),
      //       meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
      //       redirect: '/account/settings/base',
      //       hideChildrenInMenu: true,
      //       children: [
      //         {
      //           path: '/account/settings/base',
      //           name: 'BaseSettings',
      //           component: () => import('@/views/account/settings/BaseSetting'),
      //           meta: { title: '基本设置', hidden: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/security',
      //           name: 'SecuritySettings',
      //           component: () => import('@/views/account/settings/Security'),
      //           meta: { title: '安全设置', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/custom',
      //           name: 'CustomSettings',
      //           component: () => import('@/views/account/settings/Custom'),
      //           meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/binding',
      //           name: 'BindingSettings',
      //           component: () => import('@/views/account/settings/Binding'),
      //           meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: ['user'] }
      //         },
      //         {
      //           path: '/account/settings/notification',
      //           name: 'NotificationSettings',
      //           component: () => import('@/views/account/settings/Notification'),
      //           meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: ['user'] }
      //         }
      //       ]
      //     }
        // ]
      // }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]

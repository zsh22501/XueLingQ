import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 基本路由，不会有权限控制
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/head',
    children: [
      {
        path: 'head',
        component: () => import('@/views/dashboard/head'),
        name: 'head',
        meta: { title: '主页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 * 动态路由，不同身份看到的路由信息不一样
 */
export const asyncRoutes = [
  {
		path: '/waiter',
		component: Layout,
		redirect: '/waiter',
		children: [{
			path: 'waiter',
			name: 'wiater',
			component: () => import('@/views/waiter/index'),
			meta: { title: '员工管理', icon: 'qq' }
    },
    {
      path: 'details',
      hidden:true,
      component: () => import('@/views/waiter/Details'),
      name: 'details',
      meta: { title: '员工详情', icon: 'people'}
    }
  ]
  },
  {
		path: '/product',
		component: Layout,
		redirect: '/product',
		children: [{
			path: 'product',
			name: 'product',
			component: () => import('@/views/product/index'),
			meta: { title: '产品管理', icon: 'example' }
    },
    {
      path: 'details',
      hidden:true,
      component: () => import('@/views/product/Details'),
      name: 'details',
      meta: { title: '产品详情', icon: 'example'}
    }
  ]
  },
  {
		path: '/order',
		component: Layout,
		redirect: '/order',
		children: [{
			path: 'order',
			name: 'order',
			component: () => import('@/views/order/index'),
			meta: { title: '订单管理', icon: 'documentation' }
    },
    {
      path: 'details',
      hidden:true,
      component: () => import('@/views/order/Details'),
      name: 'details',
      meta: { title: '订单详情', icon: 'documentation'}
    }
  ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/customer/List'),
        name: 'Tab',
        meta: { title: '顾客管理', icon: 'people'}
      },
      {
        path: 'details',
        hidden:true,
        component: () => import('@/views/customer/Details'),
        name: 'details',
        meta: { title: '顾客详情', icon: 'people'}
      }
    ]
  },
  {
    path: '/address',
    component: Layout,
    children: [
      {
        path: 'address',
        component: () => import('@/views/address/index'),
        name: 'address',
        meta: { title: '地址管理', icon: 'star'}
      },
      {
        path: 'details',
        hidden:true,
        component: () => import('@/views/address/Details'),
        name: 'details',
        meta: { title: '地址详情', icon: 'star'}
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'cateogory',
        component: () => import('@/views/category/index'),
        name: 'cateogory',
        meta: { title: '栏目管理', icon: 'table'}
      },
      {
        path: 'Details',
        hidden:true,
        component: () => import('@/views/category/Details'),
        name: 'Details',
        meta: { title: '栏目详情', icon: 'table'}
      }
    ]
  },
  // {
  //   path: '/check',
  //   component: Layout,
  //   meta:{title:"审核管理",icon:'tab'},
  //   children: [
  //     {
  //       path: 'WidhdrawCheck',
  //       component: () => import('@/views/check/WithdrawCheck'),
  //       name: 'WidhdrawCheck',
  //       meta: { title: '提现审核', icon: 'category'}
  //     },
  //     {
  //       path: 'WiterCheck',
  //       component: () => import('@/views/check/WaiterCheck'),
  //       name: 'WiterCheck',
  //       meta: { title: '员工审核', icon: 'category'}
  //     }
  //   ]
  // },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/Layout'
import Login from '../views/Login/Login'
import Home from '../views/Home/Home'
import Goods from '../views/Goods/Goods'
import Advert from '../views/Advert/Advert'
import Params from '../views/Params/Params'
import Order from '../views/Order/Order'
import OrderList from '../views/Order/OrderList/OrderList'
import OrderBack from '../views/Order/OrderBack/OrderBack'
import AddGoods from '../views/Goods/AddGoods'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    // 路由元信息
    meta: {
      isLogin: true // 是否需要登录
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/goods',
        name: 'Goods',
        component: Goods
      },
      {
        path: '/add-goods',
        name: 'AddGoods',
        component: AddGoods
      },
      {
        path: '/Advert',
        name: 'Advert',
        component: Advert
      },
      {
        path: '/params',
        name: 'Params',
        component: Params
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
        redirect: '/order/order-list',
        children: [
          {
            path: 'order-list',
            component: OrderList
          },
          {
            path: 'order-back',
            component: OrderBack
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由拦截
router.beforeEach((to, from, next) => {
  // 1. 判断是否需要登录
  if(to.matched.some(match => match.meta.isLogin)) { // matched 包含了所有路由
    // 2. 判断用户是否已经登录
    const token = ''
    if(token) {
      next()
    } else {
      next('/login')
    }
  } else { // 不需要登录
    next()
  }
})

export default router

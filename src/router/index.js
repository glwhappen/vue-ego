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

export default router

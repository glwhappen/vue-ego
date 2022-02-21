import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/reset.css'

import api from './api/index'
// 导入语言
import i18n from './lang/index'

// 导入echarts
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.prototype.$api = api

Vue.config.productionTip = false

// 持久化
let user = localStorage.getItem('userinfo')
if(user) {
  user = JSON.parse(user)
  store.commit('loginModule/setUser', user)
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

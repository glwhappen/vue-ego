import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 准备语言
const messages = {
  zh: {
    global: { // 全局变量
      title: '后台管理系统'
    },
    navMenu: { // 导航菜单
      home: '首页',
      goods: '商品管理',
      params: '规格参数',
      advert: '广告分类',
      order: '订单管理',
      orderList: '订单列表',
      orderBack: '退货管理',
    }
  },
  en: {
    global: {
      title: 'Management System'
    },
    navMenu: {
      home: 'Home',
      goods: 'Goods Manage',
      params: 'Specification',
      advert: 'Advertising',
      order: 'Order Manage',
      orderList: 'Order List',
      orderBack: 'Order Back',
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh', // 当前选择的语言
  messages, // 语言环境
})

export default i18n

/**
 * 使用方法
 * {{ $t("home.hello") }}
 */

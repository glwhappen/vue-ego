import Vue from 'vue'
import ElementLocale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import myEn from './en'

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
    },
    ...zhLocale // 合并element的语言包
  },
  en: {
    ...myEn,
    ...enLocale // 合并element的语言包
  }
}

const i18n = new VueI18n({
  locale: 'zh', // 当前选择的语言
  messages, // 语言环境
})

/**
 * element vue-i18n@8.x 添加多语言切换
 * https://blog.csdn.net/songhsia/article/details/104800966
 */
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n

/**
 * 使用方法
 * {{ $t("home.hello") }}
 */

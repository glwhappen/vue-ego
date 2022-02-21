/**
 * 请求的方法
 */
import axios from 'axios'
import base from './base'
import { Message } from 'element-ui'
// 处理body传参
const qs = require('querystring')

const request = axios.create({
  // baseURL: base.baseURL,
  timeout: 5000
})

// 添加响应拦截器
request.interceptors.response.use(function (res) {
  // 对响应数据做点什么
  if (res.status !== 200) {
    Message.error('请求失败')
  }
  return res.data
}, function (error) {
  if (error) {
    Message.error('请求错误')
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

const api = {
  /**
   * 商品列表
   */
  getGoodsList (params) {
    return request.get(base.goodsList, {
      params
    })
  },
  /**
   * 搜搜商品
   * @param params
   * @returns {Promise<AxiosResponse<any>>}
   */
  getSearch (params) {
    return request.get(base.search, {
      params
    })
  },
  /**
   * 类目选择
   * @returns {Promise<AxiosResponse<any>>}
   */
  getSelectCategory(params) {
    return request.get(base.selectCategory, { params })
  },
  addGoods(params) {
    return request.get(base.addGoods, { params })
  },
  deleteGoods(params) {
    return request.get(base.deleteGoods, { params })
  },
  editGoods(params) {
    return request.get(base.editGoods, { params })
  },
  /**
   * 登录
   * @param params {username: '', password:''}
   * @returns {Promise<AxiosResponse<any>>}
   */
  login(params) {
    return request.post(base.login, qs.stringify(params))
  },
  /**
   * 规格参数列表
   * @param params 参数 page
   * @returns {Promise<AxiosResponse<any>>}
   */
  getParams(params) {
    return request.get(base.params, { params })
  }
}

export default api

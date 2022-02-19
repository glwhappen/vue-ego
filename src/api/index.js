/**
 * 请求的方法
 */
import axios from 'axios'
import base from './base'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: base.baseURL,
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
  }
}

export default api

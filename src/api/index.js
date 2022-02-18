/**
 * 请求的方法
 */
import axios from 'axios'
import base from './base'

const request = axios.create({
  baseURL: base.baseURL,
  timeout: 5000
})

const api = {
  /**
   * 商品列表
   */
  getGoodsList (params) {
    return request.get(base.goodsList, {
      params
    })
  }
}

export default api

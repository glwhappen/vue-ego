/**
 * 接口路径配置：
 *
 */

const base = {
  baseURL: 'http://localhost:8080',
  server: 'http://localhost:3001',
  goodsList: '/api/projectList', // 商品列表
  search: '/api/search',
  selectCategory: '/api/backend/itemCategory/selectItemCategoryByParentId',
  uploadUrl: 'api/upload', // 图片上传post请求
  addGoods: 'api/backend/item/insertTbItem', // 添加商品
}

export default base

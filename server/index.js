// 搭建express服务
const express = require('express')
const app = express()
// post 请求表单数据
app.use(express.urlencoded({ extended: true }))
// 解决跨域
const cors = require('cors')
app.use(cors())
// 静态文件托管 访问: http://localhost:3001/图片.jpg
app.use(express.static('upload'))
// 路由
const router = require('./router')

app.use('/api', router)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})

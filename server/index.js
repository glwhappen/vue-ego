// 搭建express服务
const express = require('express')
const app = express()

// 路由
const router = require('./router')

app.use('/api', router)

app.listen(3001, () => {
  console.log('http://localhost:3001')
})

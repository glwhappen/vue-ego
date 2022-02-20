// 连接数据库  1.安装mysql 2.创建连接
const mysql = require('mysql')

// 创建数据库连接
const client = mysql.createPool({
  host: 'api.glwsq.cn', // 数据域名 地址
  user: 'root', // 数据名称
  password: '123456', // 数据库密码 xampp集成
  database: 'ego',
  useConnectionPooling: true, // 防止一个错误 Cannot enqueue Query after fatal error.
  port: '3306'
})

// 封装数据库操作语句 sql语句 参数数组arr  callback成功函数结果
/**
 * 封装数据库操作语句
 * @param sql sql语句
 * @param arr 参数数据
 * @param callback 成功返回结果
 */
function sqlFun (sql, arr, callback) {
  client.query(sql, arr, function (error, result) {
    if (error) {
      console.log('数据库语句错误', error)
      return
    }
    callback(result)
  })
}

module.exports = sqlFun

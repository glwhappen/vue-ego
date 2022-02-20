const express = require('express')
const router = express.Router()

// 导入数据库
const sqlFn = require('./mysql')

// 图片需要的模块
const fs = require('fs')
const multer = require('multer')

/**
 * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get('/projectList', (req, res) => {
  const page = req.query.page || 1
  const sqlLen = 'select * from project where id'
  sqlFn(sqlLen, null, data => {
    const len = data.length
    const sql = 'select * from project order by id desc limit 8 offset ' + (page - 1) * 8
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pageSize: 8,
          total: len
        })
      } else {
        res.send({
          status: 500,
          msg: '暂无数据'
        })
      }
    })
  })
})

/**
 * 商品查询接口 search
 * 参数：search
 */
router.get('/search', (req, res) => {
  var search = req.query.search
  const sql = "select * from project where concat(`title`,`sellPoint`,`descs`) like '%" + search + "%'"
  sqlFn(sql, null, (result) => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据'
      })
    }
  })
})

/**
 * 类目选择
 * 接口说明：接口不同的参数cid 返回不同的类目数据 后台接受变量：id
 */
router.get('/backend/itemCategory/selectItemCategoryByParentId', (req, res) => {
  const id = req.query.id || 1
  const sql = 'select * from category where id=?'
  var arr = [id]
  sqlFn(sql, arr, result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据'
      })
    }
  })
})

/**
 * 类目结构数据获取
 */
router.get('/category/data', (req, res) => {
  var cid = req.query.cid
  var sql = 'select * from params where itemCatId=?'
  sqlFn(sql, [cid], result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        result
      })
    } else {
      res.send({
        status: 500,
        msg: '暂无数据'
      })
    }
  })
})

/**
 * 上传图片 post请求 upload
 * 说明：
 *  1.后台安装 multer 模块   同时引入fs模块
 *  2.router.js入口文件导入模块
 *      const fs=require('fs')
 const multer=require('multer')
 *  3.上传图片
 *
 */

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

var uploadFolder = './upload/'
createFolder(uploadFolder)
var upload = multer({
  storage: storage
})

router.post('/upload', upload.single('file'), function (req, res, next) {
  var file = req.file
  console.log('文件类型：%s', file.mimetype)
  console.log('原始文件名：%s', file.originalname)
  console.log('文件大小：%s', file.size)
  console.log('文件保存路径：%s', file.path)
  res.json({
    res_code: '0',
    name: file.originalname,
    url: file.path
  })
})

/**
 * 商品添加
 * 参数： title cid  category sellPoint price num descs paramsInfo image
 */
router.get('/backend/item/insertTbItem', (req, res) => {
  /**
   * 获取参数
   */
  var title = req.query.title || ''
  var cid = req.query.cid || ''
  var category = req.query.category || ''
  var sellPoint = req.query.sellPoint || ''
  var price = req.query.price || ''
  var num = req.query.num || ''
  var desc = req.query.descs || ''
  var paramsInfo = req.query.paramsInfo || ''
  var image = req.query.image || ''

  const sql = "insert into project values (null,?,?,?,?,?,?,?,'',1,'','',?,?)"
  var arr = [title, image, sellPoint, price, cid, category, num, desc, paramsInfo]
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '添加成功'
      })
    } else {
      res.send({
        status: 500,
        msg: '添加失败'
      })
    }
  })
})

/**
 * 商品删除接口 id
 */
router.get('/backend/item/deleteItemById', (req, res) => {
  var id = req.query.id
  const sql = 'delete from project where id=?'
  const arr = [id]
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '删除成功'
      })
    } else {
      res.send({
        status: 500,
        msg: '删除失败'
      })
    }
  })
})

/**
 * 批量删除 batchDelete  idArr Array  id标识
 * sql = "delete from A where id in (1,2,3)"
 */
router.get('/batchDelete', (req, res) => {
  const arr = req.query.idArr// [] 数组格式 需要传递数据是 离散的数字格式
  // const sql =`delete from project where id in (?)`;
  let sql = ''
  function fun(arr) { // sql =`delete from project where id in (101,102,103)`;
    sql = 'delete from project where id in ('
    for (let i = 0; i < arr.length; i++) {
      sql += arr[i] + ',' // 101,102,
    }
    sql = sql.slice(0, -1)
    sql = sql + ')'
    // console.log(sql);
  }
  fun(arr)
  sqlFn(sql, null, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '删除成功'
      })
    } else {
      res.send({
        status: 500,
        msg: '删除失败'
      })
    }
  })
})

/**
 * 修改商品
 */

router.get('/backend/item/updateTbItem', (req, res) => {
  var id = req.query.id
  var title = req.query.title || ''
  var sellPoint = req.query.sellPoint || ''
  var price = req.query.price || ''
  var cid = req.query.cid || ''
  var category = req.query.category || ''
  var num = req.query.num || ''
  var desc = req.query.descs || ''
  var paramsInfo = req.query.paramsInfo || ''
  var image = req.query.image || ''
  var sql = 'update project set title=?,sellPoint=?,price=?,cid=?,category=?,num=?,descs=?,paramsInfo=?,image=? where id=?'
  var arr = [title, sellPoint, price, cid, category, num, desc, paramsInfo, image, id]
  sqlFn(sql, arr, result => {
    if (result.affectedRows > 0) {
      res.send({
        status: 200,
        msg: '修改成功'
      })
    } else {
      res.send({
        status: 500,
        msg: '修改失败'
      })
    }
  })
})

module.exports = router

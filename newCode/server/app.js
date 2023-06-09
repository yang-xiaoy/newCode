// 1. 导入 express
const express = require('express')
// 4.1 导入 cors 中间件
const cors = require('cors')
const bodyParser = require('body-parser')

// 2. 创建服务器的实例对象
const app = express()

// 2023.07.11 请求接口可以跑通，后端拿不到前端表单数据，前端打印表单数据正常。
//  1. 前提：接口在 postman 测试正常。
//  2. 开始以为是网络请求模块的问题（因为版本差异会存在使用区别），后面测试请求http://www.baidu.com，请求跨域提示，判断网络模块正常。
//  3. 前端使用 proxy代理，解决的跨域问题。
//  4. 请求测试后端输出OK，就是拿不到表单数据，数据为空对象{}，前端打印表单数据正常。
//  解决：npm install body-parser 安装。
//        var bodyParser = require('body-parser')
//        app.use(bodyParser.json())
//  bodyParser用于解析客户端请求的body中的内容，内部使用JSON编码处理。
app.use(bodyParser.json())

// 4.2  将cors注册为全局中间件
app.use(cors())

// 4.3 配置解析表单数据的中间件，注意：这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 注意：一定要在路由之前定义响应中间件
app.use((req, res, next) => {
  // status 默认值为1，就是请求失败的响应码
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 注意：一定要在路由之前配置解析 Token 中间件
// const expressJWT = require('express-jwt')
// const config = require('./config')
// app.use(
//   expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] })
// )

// 导入并注册用户路由模块
const userRouter = require('./router/admin/UserRouter')
app.use('/adminapi', userRouter)

// 3.监听服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})

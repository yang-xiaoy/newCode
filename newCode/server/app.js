// 1. 导入 express
const express = require('express')
const cors = require('cors')

// 2. 创建服务器的实例对象
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))

// 注意：一定要在路由之前定义响应中间件
app.use((req, res, next) => {
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 导入并注册用户路由模块
const userRouter = require('./router/admin/UserRouter')
app.use('/adminapi', userRouter)

// 3.监听服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})

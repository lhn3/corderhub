const Koa=require("koa")
//导入解析json数据
const bodyParser=require('koa-bodyparser')
//导入注册路由
const {Routers}=require('../router/index')
//导入处理错误模块
const {errorHandler}=require('./error_handler')
const app=new Koa()

app.use(bodyParser())
//注册路由
Routers(app)
//监听error
app.on('error',errorHandler)






module.exports={app}


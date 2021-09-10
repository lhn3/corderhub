const Koa=require("koa")
//导入解析json数据
const bodyParser=require('koa-bodyparser')
//导入用户注册路由
const {userRouter}=require('../router/user_router')
//导入登录路由
const {authRouter}=require('../router/auth_router')
//导入处理错误模块
const {errorHandler}=require('./error_handler')
const app=new Koa()

//注册路由
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods());
app.use(authRouter.routes())
app.use(authRouter.allowedMethods());

//监听error
app.on('error',errorHandler)






module.exports={app}


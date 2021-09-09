const Koa=require("koa")
//导入解析json数据
const bodyParser=require('koa-bodyparser')
//导入用户路由
const {userRouter}=require('../router/user_router')
const app=new Koa()

//注册路由
app.use(bodyParser())
app.use(userRouter.routes())
app.use(userRouter.allowedMethods());






module.exports={app}


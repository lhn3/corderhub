const Router=require('koa-router')
//导入的登陆中间件
const {login,success}=require('../controller/auth_controller')
//导入验证登录中间件
const {verifyLogin,verifyAuth}=require('../middleware/auth_middleware')
const authRouter=new Router({prefix:'/user'})



authRouter.post('/login',verifyLogin,login)
//测试授权
authRouter.post('/auth_test',verifyAuth,success)


module.exports=authRouter

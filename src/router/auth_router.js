const Router=require('koa-router')
//导入的登陆中间件
const {login}=require('../controller/auth_controller')
//导入验证登录中间件
const {verifyLogin}=require('../middleware/auth_middleware')
const authRouter=new Router({prefix:'/user'})



authRouter.post('/login',verifyLogin,login)


module.exports={
    authRouter
}
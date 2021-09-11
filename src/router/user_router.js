const Router=require('koa-router')
//导入用户操作方法
const {create}=require('../controller/user_controller')
//导入验证信息模块
const {verifyUser,handlePassword}=require('../middleware/user_middleware')


const userRouter=new Router({prefix:'/user'})

//校验，创建
userRouter.post('/register',verifyUser,handlePassword,create)





module.exports=userRouter

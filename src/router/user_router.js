const Router=require('koa-router')
//导入用户操作方法
const {create}=require('../controller/user_controller')
//导入验证信息模块
const {verifyUser}=require('../middleware/user_middleware')


const userRouter=new Router({prefix:'/users'})

//校验，创建
userRouter.post('/register',verifyUser,create)





module.exports={
    userRouter
}
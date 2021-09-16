const Router=require('koa-router')
//导入用户操作方法
const {register,userAvatar}=require('../controller/user_controller')
//导入验证信息模块
const {verifyUser,handlePassword}=require('../middleware/user_middleware')


const userRouter=new Router({prefix:'/user'})

//校验，注册
userRouter.post('/register',verifyUser,handlePassword,register)
//获取用户头像
userRouter.get('/:userId/avatar',userAvatar)



module.exports=userRouter

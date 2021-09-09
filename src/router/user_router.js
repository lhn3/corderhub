const Router=require('koa-router')
//导入用户操作方法
const {create}=require('../controller/user_controller')


const userRouter=new Router({prefix:'/users'})

userRouter.post('/register',create)





module.exports={
    userRouter
}
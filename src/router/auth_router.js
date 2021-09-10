const Router=require('koa-router')
const {login}=require('../controller/auth_controller')

const authRouter=new Router({prefix:'/user'})



authRouter.post('/login',login)


module.exports={
    authRouter
}
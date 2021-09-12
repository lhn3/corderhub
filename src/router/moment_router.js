const Router=require('koa-router')
const {create}=require('../controller/moment_controller')
const {verifyAuth}=require('../middleware/auth_middleware')

const momentRouter=new Router({prefix:'/moment'})



momentRouter.post('/create',verifyAuth,create)


module.exports=momentRouter

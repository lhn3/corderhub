const Router=require('koa-router')
const {verifyAuth}=require('../middleware/auth_middleware')
const {create}=require('../controller/comment_controller')

const commentRouter=new Router({prefix:'/comment'})

commentRouter.post('/create',verifyAuth,create)


module.exports=commentRouter
const Router=require('koa-router')
const {verifyAuth,permission}=require('../middleware/auth_middleware')
const {create,reply,update,del}=require('../controller/comment_controller')

const commentRouter=new Router({prefix:'/comment'})

commentRouter.post('/create',verifyAuth,create)
commentRouter.post('/:commentId',verifyAuth,reply)
commentRouter.patch('/:commentId',verifyAuth,permission(`comment`),update)
commentRouter.delete('/:commentId',verifyAuth,permission(`comment`),del)


module.exports=commentRouter
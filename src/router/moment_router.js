const Router=require('koa-router')
const {create,getMoment,getMomentList,update,del}=require('../controller/moment_controller')
const {verifyAuth,permission}=require('../middleware/auth_middleware')

const momentRouter=new Router({prefix:'/moment'})



momentRouter.post('/create',verifyAuth,create)
momentRouter.get('/:momentId',getMoment)
momentRouter.get('/',getMomentList)
momentRouter.patch('/:momentId',verifyAuth,permission,update)
momentRouter.delete('/:momentId',verifyAuth,permission,del)


module.exports=momentRouter

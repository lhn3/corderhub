const Router=require('koa-router')
const {create,getMoment,getMomentList}=require('../controller/moment_controller')
const {verifyAuth}=require('../middleware/auth_middleware')

const momentRouter=new Router({prefix:'/moment'})



momentRouter.post('/create',verifyAuth,create)
momentRouter.get('/:momentId',getMoment)
momentRouter.get('/',getMomentList)


module.exports=momentRouter

const Router=require('koa-router')
const {create,getLabels}=require('../controller/label_controller')
const {verifyAuth}=require('../middleware/auth_middleware')
const labelRouter=new Router({prefix:'/labels'})


labelRouter.get('/',getLabels)
labelRouter.post('/',verifyAuth,create)


module.exports=labelRouter

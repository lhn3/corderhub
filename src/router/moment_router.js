const Router=require('koa-router')
const {create,getMoment,getMomentList,update,del,selectLabels,momentImg}=require('../controller/moment_controller')
const {verifyAuth,permission}=require('../middleware/auth_middleware')
const {checkLabels}=require('../middleware/label_middleware')

const momentRouter=new Router({prefix:'/moment'})


//创建动态
momentRouter.post('/',verifyAuth,create)
//获取一条动态
momentRouter.get('/:momentId',getMoment)
//获取所有动态
momentRouter.get('/',getMomentList)
//修改动态
momentRouter.patch('/:momentId',verifyAuth,permission('moment'),update)
//删除动态
momentRouter.delete('/:momentId',verifyAuth,permission('moment'),del)
//选择标签
momentRouter.post('/:momentId/labels',verifyAuth,permission('moment'),checkLabels,selectLabels)
//获取展示配图
momentRouter.get('/images/:filename',momentImg)


module.exports=momentRouter

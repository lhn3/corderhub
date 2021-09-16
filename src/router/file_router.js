const Router=require('koa-router')
const {verifyAuth}=require('../middleware/auth_middleware')
const {avatarUpload}=require('../middleware/file_middleware')
const {avatarInfo}=require('../controller/file_controller')

const fileRouter=new Router({prefix:'/file'})


//头像上传
fileRouter.post('/avatar',verifyAuth,avatarUpload,avatarInfo)


module.exports=fileRouter
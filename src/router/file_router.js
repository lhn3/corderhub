const Router=require('koa-router')
const {verifyAuth}=require('../middleware/auth_middleware')
const {avatarUpload,pictureUpload}=require('../middleware/file_middleware')
const {avatarInfo,pictureInfo}=require('../controller/file_controller')
const {permission}=require('../middleware/auth_middleware')

const fileRouter=new Router({prefix:'/file'})


//头像上传
fileRouter.post('/avatar',verifyAuth,avatarUpload,avatarInfo)
//配图上传
fileRouter.post('/picture/:momentId',verifyAuth,permission('moment'),pictureUpload,pictureInfo)


module.exports=fileRouter
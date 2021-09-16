const multer=require('koa-multer')

const {AVATAR_PATCH}=require('../constants/file_type')
//头像上传
const storage=multer.diskStorage({
    //上传地址
    destination:(request,file,callback)=>{
        callback(null,AVATAR_PATCH)
    },
    //上传文件名
    filename:(request,file,callback)=>{
        callback(null,Date.now()+"."+file.originalname.split('.')[1])
    }
})
const avatar=multer({
    storage
})

const avatarUpload=avatar.single('avatar')




module.exports= {
    avatarUpload
}
const multer=require('koa-multer')

const {AVATAR_PATCH,PICTURE_PATCH}=require('../constants/file_type')

//头像上传------------------------------------------------------------------------
const avatarStorage=multer.diskStorage({
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
    storage:avatarStorage
})
const avatarUpload=avatar.single('avatar')


//图片上传------------------------------------------------------------------------
const pictureStorage=multer.diskStorage({
    //上传地址
    destination:(request,file,callback)=>{
        callback(null,PICTURE_PATCH)
    },
    //上传文件名
    filename:(request,file,callback)=>{
        callback(null,Date.now()+"."+file.originalname.split('.')[1])
    }
})
const picture=multer({
    storage:pictureStorage
})

const pictureUpload=picture.array('picture',9)

module.exports= {
    avatarUpload,
    pictureUpload
}
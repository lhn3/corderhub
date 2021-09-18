const multer=require('koa-multer')
const jimp=require('jimp')
const path=require('path')

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


//更改图片大小------------------------------------------------------------------------
const pictureResize=async (ctx,next)=>{
    //获取所有图片信息
    const files=ctx.req.files
    for(let file of files){
        //读取文件并写入新文件
        jimp.read(file.path).then(image=>{
            image.resize(1280,jimp.AUTO).write(path.join(file.destination, `large-${file.filename}`))
            image.resize(640,jimp.AUTO).write(path.join(file.destination, `middle-${file.filename}`))
            image.resize(320,jimp.AUTO).write(path.join(file.destination, `small-${file.filename}`))
        })
    }
    await next()
}

module.exports= {
    avatarUpload,
    pictureUpload,
    pictureResize
}
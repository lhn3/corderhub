const service=require('../service/file_service')
const {APP_HOST, APP_PORT}=require('../app/config')

class FileController {
    async avatarInfo(ctx,next){
        const {filename,mimetype,size}=ctx.req.file
        const {id}=ctx.user

        //判断是否是第一次上传头像
        //将头像信息写入数据库
        const result=await service.getAvatar(id)
        if(result){
            await service.updateAvatar(filename,mimetype,size,id)
        }else {
            await service.createAvatar(filename,mimetype,size,id)
        }

        //将头像url写入用户表
        const url=`${APP_HOST}:${APP_PORT}/user/${id}/avatar`
        await service.avatarUrl(url,id)
        ctx.body='头像上传成功'
    }

    //配图上传
    async pictureInfo(ctx,next){
        const {momentId}=ctx.params
        const {id}=ctx.user
        const files=ctx.req.files
        for(let file of files){
            await service.createPicture(file.filename,file.mimetype,file.size,id,momentId)
        }
        ctx.body='配图上传成功'
    }

}

module.exports=new FileController()
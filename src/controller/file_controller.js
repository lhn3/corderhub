const service=require('../service/file_service')

class FileController {
    async avatarInfo(ctx,next){
        const {filename,mimetype,size}=ctx.req.file
        const {id}=ctx.user
        //判断是否是第一次上传头像
        const result=await service.getAvatar(id)
        if(result.length){
            const result=await service.updateAvatar(filename,mimetype,size,id)
            console.log('头像更新成功')
            ctx.body=result
        }else {
            const result=await service.createAvatar(filename,mimetype,size,id)
            ctx.body=result
            console.log('上传头像成功')
        }
    }

}

module.exports=new FileController()
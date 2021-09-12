const service=require('../service/moment_service')

class MomentController{
    async create(ctx,next){
        const {content}=ctx.request.body
        const userId=ctx.user.id
        //上传数据库
        const result=await service.create(content,userId)
        console.log('发表成功')
        ctx.body=result
    }
}



module.exports=new MomentController()
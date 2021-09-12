const service=require('../service/moment_service')

class MomentController{
    //创建
    async create(ctx,next){
        const {content}=ctx.request.body
        const userId=ctx.user.id
        //上传数据库
        const result=await service.create(content,userId)
        console.log('发表成功')
        ctx.body=result
    }

    //查询一条
    async getMoment(ctx,next){
        const userId=ctx.params.momentId
        //查询数据库
        const result=await service.getMoment(userId)
        console.log('查询成功')
        ctx.body=result
    }

    //查询多条
    async getMomentList(ctx,next){
        //偏移量，一次查多少
        const {offset,size}=ctx.query
        //查询数据库
        const result=await service.getMomentList(offset,size)
        console.log('查询成功')
        ctx.body=result
    }
}



module.exports=new MomentController()
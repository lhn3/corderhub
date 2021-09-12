const service=require('../service/comment_service')

class CommentController {
    async create(ctx,next){
        const userId=ctx.user.id
        const {momentId,content}=ctx.request.body
        const result=await service.create(userId,momentId,content)
        ctx.body=result
    }

}

module.exports=new CommentController()
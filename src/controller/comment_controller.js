const service=require('../service/comment_service')

class CommentController {
    //创建评论
    async create(ctx,next){
        const userId=ctx.user.id
        const {momentId,content}=ctx.request.body
        const result=await service.create(userId,momentId,content)
        console.log('评论成功')
        ctx.body=result
    }

    //评论别人的评论
    async reply(ctx,next){
        const userId=ctx.user.id
        const {momentId,content}=ctx.request.body
        const commentId=ctx.params.commentId
        const result=await service.reply(userId,momentId,content,commentId)
        console.log('回复评论成功')
        ctx.body=result
    }

    //修改评论
    async update(ctx,next){
        const {content}=ctx.request.body
        const commentId=ctx.params.commentId
        const result=await service.update(content,commentId)
        console.log('修改评论成功')
        ctx.body=result
    }

    //删除评论
    async del(ctx,next){
        const commentId=ctx.params.commentId
        const result=await service.del(commentId)
        console.log('删除评论成功')
        ctx.body=result
    }

}

module.exports=new CommentController()
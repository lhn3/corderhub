const fs=require('fs')
const service=require('../service/moment_service')
const fileService=require('../service/file_service')
const {PICTURE_PATCH}=require('../constants/file_type')

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
        const momentId=ctx.params.momentId
        //查询数据库
        const result=await service.getMoment(momentId)
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

    //修改动态
    async update(ctx,next){
        const {momentId}=ctx.params
        const {content}=ctx.request.body
        //权限认证通过修改动态
        const result=await service.update(momentId,content)
        console.log('修改动态成功')
        ctx.body=result
    }

    //删除动态
    async del(ctx,next){
        const {momentId}=ctx.params
        //权限认证通过删除动态
        const result=await service.del(momentId)
        console.log('删除成功')
        ctx.body=result
    }

    //选择标签
    async selectLabels(ctx,next){
        const labelIds=ctx.labelIds
        const {momentId}=ctx.params
        for(let labelId of labelIds){
            //
            const result=await service.hasLabel(momentId,labelId)
            if (!result.length){
                //没有选择过的标签采取选择
                await service.selectLabels(momentId,labelId)
            }
        }
        console.log('选择标签成功')
        ctx.body='选择标签成功！'
    }

    //获取配图
    async momentImg(ctx,next){
        const {filename}=ctx.params
        const {type}=ctx.query
        const result=await fileService.getPicture(filename)

        //设置响应
        ctx.response.set('content-type',result.mimetype)
        //展示头像
        if (type==='large'){
            ctx.body=fs.createReadStream(`${PICTURE_PATCH}/large-${filename}`)
        }if(type==='middle') {
            ctx.body=fs.createReadStream(`${PICTURE_PATCH}/middle-${filename}`)
        }if(type==='small') {
            ctx.body=fs.createReadStream(`${PICTURE_PATCH}/small-${filename}`)
        }else {
            ctx.body=fs.createReadStream(`${PICTURE_PATCH}/${filename}`)
        }
    }
}



module.exports=new MomentController()
const service=require('../service/label_service')

class LabelController {
    //获取全部标签
    async getLabels(ctx,next){
        const result=await service.getLabels()
        console.log('获取标签成功')
        ctx.body=result
    }
    //创建标签
    async create(ctx,next){
        const {label}=ctx.request.body
        const result=await service.create(label)
        console.log('创建标签成功')
        ctx.body=result
    }
}

module.exports = new LabelController()
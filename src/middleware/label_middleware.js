const service=require('../service/label_service')
const checkLabels=async (ctx,next)=>{
    //获取传入的标签数组
    const {labels}=ctx.request.body

    let labelsList=[]
    for(let name of labels){
        //查询此标签是否存在
        const result=await service.checkLabel(name)

        if (result.length){
            //如果查到就加入列表中
            labelsList.push(result[0].id)
        }else {
            //如果没查到就创建一个并加入列表中
            const result=await service.create(name)
            let label_id=result.insertId
            labelsList.push(label_id)
        }
    }
    ctx.labelIds=labelsList
    await next()
}


module.exports={checkLabels}
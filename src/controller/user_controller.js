const fs=require('fs')
//对用户的各种操作
//导入数据库操作内容
const service=require('../service/user_service')
const fileService=require('../service/file_service')
const {AVATAR_PATCH}=require('../constants/file_type')

//创建用户中间件
class UserController {
    //创建用户方法
    async register(ctx,next){
        //获取用户参数
        let user=ctx.request.body
        //操作数据库
        const result=await service.create(user)
        //返回数据
        ctx.body=result;
    }

    //获取用户头像
    async userAvatar(ctx,next){
        const userId=ctx.params.userId
        const result=await fileService.getAvatar(userId)

        //设置响应
        ctx.response.set('content-type',result.mimetype)
        //展示头像
        ctx.body=fs.createReadStream(`${AVATAR_PATCH}/${result.filename}`)
    }
}


module.exports=new UserController()


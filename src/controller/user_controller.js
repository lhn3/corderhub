
//对用户的各种操作
//导入数据库操作内容
const service=require('../service/user_service')

class UserController {
    async create(ctx,next){

        //获取用户参数
        let user=ctx.request.body

        //操作数据库
        const result=await service.create(user)

        //返回数据
        ctx.body=result;
    }
}


module.exports=new UserController()



class AuthController {
    async login(ctx,next){
        const {username,password}=ctx.request.body
        ctx.body=`用户名：${username}  密码：${password}`
    }

}

module.exports=new AuthController()
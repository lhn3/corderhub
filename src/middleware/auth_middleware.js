const jwt=require('jsonwebtoken')
const errorType=require('../constants/error_type')
const service=require('../service/user_service')
const {md5password}=require('../utils/handel_password')
const {PUBLIC_KEY}=require('../app/config')

//校验登录
const verifyLogin=async (ctx,next)=>{
    const {username,password}=ctx.request.body

    //验证用户名密码不能为空
    if (!username || !password){
        const error=new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error',error,ctx)
    }

    //验证用户名是否存在
    //获取一个用户数组
    const result=await service.getUser(username)
    const user=result[0]
    console.log(user)
    if (!user){
        const error=new Error(errorType.USER_NOT_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }

    //验证密码是否正确
    // if (md5password(password) !== user.password){
    if (password !== user.password){
        const error=new Error(errorType.PASSWORD_ERROR)
        return ctx.app.emit('error',error,ctx)
    }
    ctx.user=user
    await next()
}

//校验token授权
const verifyAuth=async (ctx,next)=>{
    const token=ctx.headers.authorization.replace('Bearer ','')
    //解析token
    try{
        const result=jwt.verify(token,PUBLIC_KEY,{
            //解密方式
            algorithm:['RS256']
        })
        console.log(result)
        await next()
    }catch (e) {
        const error=new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx)
    }

}

module.exports={
    verifyLogin,
    verifyAuth
}
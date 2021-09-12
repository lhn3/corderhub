const jwt=require('jsonwebtoken')
const errorType=require('../constants/error_type')
const service=require('../service/user_service')
const {md5password}=require('../utils/handel_password')
const {PUBLIC_KEY}=require('../app/config')
const authService=require('../service/auth_service')

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
    const authorization=ctx.headers.authorization
    if(!authorization){
        const error=new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error',error,ctx)
    }
    const token=authorization.replace('Bearer ','')

    //解析token
    try{
        const result=jwt.verify(token,PUBLIC_KEY,{
            //解密方式
            algorithm:['RS256']
        })
        console.log(result)
        //同一个路由中的中间件才能相互访问ctx中参数，所以要为校验后的中间件带过去需要的数据
        ctx.user=result
        await next()
    }catch (e) {
        const error=new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error',error,ctx)
    }

}

//权限验证
const permission=async (ctx,next)=>{
    const {momentId}=ctx.params
    const userId=ctx.user.id
    //通过数据库查看权限
    const result=await authService.checkMoment(momentId,userId)
    //没有权限抛出错误
    if (!result.length){
        const error=new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error',error,ctx)
    }
    await next()
}

module.exports={
    verifyLogin,
    verifyAuth,
    permission
}
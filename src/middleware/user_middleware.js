//校验模块

//导入数据库模块
const service=require('../service/user_service')
//导入错误类型
const errorType=require('../constants/error_type')
//导入密码加密模块
const {md5password}=require('../utils/handel_password')

//验证用户名密码中间件
const verifyUser=async (ctx,next)=>{
    //取出数据
    const {username,password}=ctx.request.body

    //判断用户名密码不能为空
    if(!username || !password){
        //定义错误
        const error=new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        //发射信息
        return ctx.app.emit('error',error,ctx)
    }

    //判断用户是否存在
    const result=await service.getUser(username)
    //如果长度大于1则用户名存在
    if (result.length){
        const error=new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error',error,ctx)
    }
    await next()
}

//密码加密中间件
const handlePassword=async (ctx,next)=>{
    let {password}=ctx.request.body
    //密码加密
    ctx.request.body.password=md5password(password)
    await next()
}



module.exports={
    verifyUser,
    handlePassword
}
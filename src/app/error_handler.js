//错误处理

//导入错误类型
const errorType=require('../constants/error_type')
const errorHandler=(error,ctx)=>{
    let status,message
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status=400
            message='用户名或密码不能为空'
            break
        case errorType.USER_ALREADY_EXISTS:
            status=409
            message='此用户名已存在！'
            break
        case errorType.USER_NOT_EXISTS:
            status=400
            message='此用户不存在！'
            break
        case errorType.PASSWORD_ERROR:
            status=400
            message='密码错误！'
            break
        default:
            status=400
            message='NOT FOUND'
    }
    ctx.status=status
    ctx.body=message
}

module.exports={
    errorHandler
}



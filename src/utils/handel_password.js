const crypto=require('crypto')

//密码加密
const md5password=(password)=>{
    const md5=crypto.createHash('md5')
    //16进制加密
    const result=md5.update(password).digest('hex')
    return result
}

module.exports={
    md5password
}
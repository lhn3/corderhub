const jwt = require('jsonwebtoken')
const {PRIVATE_KEY} = require('../app/config')


class AuthController {
    //登陆成功
    async login(ctx, next) {
        const {id, name} = ctx.user
        //设置非对称加密token
        const token = jwt.sign({id, name}, PRIVATE_KEY, {
            //过期时间
            expiresIn: 60 * 60 * 24,
            //加密方式
            algorithm: 'RS256'
        })
        ctx.body = {id, name, token}
    }
    //授权验证成功
    async success(ctx,next){
        ctx.body='授权成功'
    }
}


module.exports = new AuthController()
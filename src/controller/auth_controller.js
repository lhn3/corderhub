const jwt = require('jsonwebtoken')
const {PRIVATE_KEY, PUBLIC_KEY} = require('../app/config')


class AuthController {
    async login(ctx, next) {
        const {id, name} = ctx.user
        //设置非对称加密token
        const token = jwt.sign({id, name}, PRIVATE_KEY, {
            //过期时间
            expiresIn: 60 * 60 * 24,
            //加密方式
            algorithm: 'RS256'
        })
        ctx.body = {
            id,
            name,
            token
        }
    }

}

module.exports = new AuthController()
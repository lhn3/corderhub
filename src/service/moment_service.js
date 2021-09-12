const connention = require('../app/database')

class MomentService {
    //创建
    async create(content, userId) {
        const statement = `INSERT INTO moment(content,user_id) VALUES(?,?);`
        const result = await connention.execute(statement, [content, userId])
        return result
    }

    //查一条
    async getMoment(userId) {
        const statement = `
        SELECT 
        m.id id,m.content content,m.createAt createtime,m.updateAt updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user
        FROM moment m
        LEFT JOIN users u
        ON m.user_id=u.id
        WHERE m.id=?;
        `
        const result = await connention.execute(statement, [userId])
        return result[0][0]
    }

    //查多条
    async getMomentList(offset,size) {
        const statement = `
        SELECT 
        m.id id,m.content content,m.createAt createtime,m.updateAt updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user
        FROM moment m
        LEFT JOIN users u
        ON m.user_id=u.id
        LIMIT ?, ?;
        `
        const result = await connention.execute(statement, [offset,size])
        return result[0]
    }
}


module.exports = new MomentService()
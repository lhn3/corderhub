const connection = require('../app/database')

class MomentService {
    //创建
    async create(content, userId) {
        const statement = `INSERT INTO moment(content,user_id) VALUES(?,?);`
        const result = await connection.execute(statement, [content, userId])
        return result
    }

    //查一条
    async getMoment(momentId) {
        const statement = `
        SELECT 
        m.id id,m.content content,m.createAt createtime,m.updateAt updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,
        'commentId',c.comment_id,'user',JSON_OBJECT('id',uu.id,'name',uu.name))
        ) comments
        FROM moment m
        LEFT JOIN users u ON m.user_id=u.id
        LEFT JOIN comment c ON m.id=c.moment_id
        LEFT JOIN users uu ON c.user_id=uu.id
        WHERE m.id=?;
        `
        const result = await connection.execute(statement, [momentId])
        return result[0][0]
    }

    //查多条
    async getMomentList(offset,size) {
        const statement = `
        SELECT 
        m.id id,m.content content,m.createAt createtime,m.updateAt updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id ) commentCount
        FROM moment m
        LEFT JOIN users u
        ON m.user_id=u.id
        LIMIT ?, ?;
        `
        const result = await connection.execute(statement, [offset,size])
        return result[0]
    }

    //修改动态
    async update(momentId,content){
        const statement = `UPDATE moment SET content=? WHERE id=?;`
        const result = await connection.execute(statement, [content,momentId])
        return result[0]
    }
    //删除动态
    async del(momentId){
        const statement = `DELETE FROM moment WHERE id=?;`
        const result = await connection.execute(statement, [momentId])
        return result[0]
    }
}


module.exports = new MomentService()
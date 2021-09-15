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
        //子查询，防止数据重复
        const statement = `
        SELECT 
        m.id id,m.content content,m.createAt createtime,m.updateAt updatetime,
        JSON_OBJECT('id',u.id,'name',u.name) user,
        IF(COUNT(l.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',l.id,'label',l.label)\t
        ) ,NULL) labels,
        (SELECT 
        IF(COUNT(c.id),JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'createTime',c.createAt,
        'commentId',c.comment_id,'user',JSON_OBJECT('id',uu.id,'name',uu.name))
        ) ,NULL) FROM comment c LEFT JOIN users uu ON c.user_id=uu.id WHERE c.moment_id=m.id
        ) comments
        FROM moment m
        LEFT JOIN users u ON m.user_id=u.id
        LEFT JOIN moment_labels ml ON ml.moment_id=m.id
        LEFT JOIN labels l ON l.id=ml.label_id
        WHERE m.id=?
        GROUP BY m.id;
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
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id ) commentCount,
        (SELECT count(*) FROM moment_labels ml WHERE ml.moment_id=m.id) labelsCount
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

    //判断标签是否选择过
    async hasLabel(momentId,labelId){
        const statement = `SELECT * FROM moment_labels WHERE moment_id=? AND label_id=?;`
        const result = await connection.execute(statement, [momentId,labelId])
        return result[0]
    }

    //选择标签
    async selectLabels(momentId,labelId){
        const statement = `INSERT INTO moment_labels (moment_id,label_id) VALUES (?,?);`
        const result = await connection.execute(statement, [momentId,labelId])
        return result[0]
    }
}


module.exports = new MomentService()
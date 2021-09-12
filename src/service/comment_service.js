const connection = require('../app/database')

class CommentService {
    //创建评论
    async create(userId, momentId, content) {
        const statement = `INSERT INTO comment (content,user_id,moment_id) VALUES (?,?,?);`
        const result = await connection.execute(statement, [content, userId, momentId])
        return result[0]
    }

    //回复评论
    async reply(userId, momentId, content, commentId) {
        const statement = `INSERT INTO comment (content,user_id,moment_id,comment_id) VALUES (?,?,?,?);`
        const result = await connection.execute(statement, [content, userId, momentId, commentId])
        return result[0]
    }

    //修改评论
    async update(content, commentId) {
        const statement = `UPDATE comment SET content=? WHERE id=?;`
        const result = await connection.execute(statement, [content, commentId])
        return result[0]
    }

    //删除评论
    async del(commentId) {
        const statement = `DELETE FROM comment WHERE id=?;`
        const result = await connection.execute(statement, [commentId])
        return result[0]
    }
}

module.exports = new CommentService()



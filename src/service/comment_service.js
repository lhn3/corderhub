const connection = require('../app/database')

class CommentService {
    async create(userId, momentId, content) {
        const statement = `INSERT INTO comment (content,user_id,moment_id) VALUES (?,?,?);`
        const result = await connection.execute(statement, [content, userId, momentId])
        return result[0]
    }
}

module.exports = new CommentService()



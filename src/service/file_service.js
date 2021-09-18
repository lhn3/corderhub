const connection=require('../app/database')

class FileService {
    //获取头像数据
    async getAvatar(userId){
        const statement=`SELECT * FROM avatar WHERE user_id=?;`
        const result=await connection.execute(statement,[userId])
        return result[0][0]
    }

    //上传头像数据
    async createAvatar(filename,mimetype,size,userId){
        const statement=`INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
        const result=await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }

    //更新头像数据
    async updateAvatar(filename,mimetype,size,userId){
        const statement=`UPDATE avatar SET filename=?,mimetype=?,size=? WHERE user_id=?;`
        const result=await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }

    //写入头像url
    async avatarUrl(url,userId){
        const statement=`UPDATE users SET avatar_url=? WHERE id=?;`
        const result=await connection.execute(statement,[url,userId])
        return result
    }

    //上传配图
    async createPicture(filename,mimetype,size,userId,momentId){
        const statement=`INSERT INTO picture (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`
        const result=await connection.execute(statement,[filename,mimetype,size,userId,momentId])
        return result
    }

    //查询配图
    async getPicture(filename){
        const statement=`SELECT * FROM picture WHERE filename=?;`
        const result=await connection.execute(statement,[filename])
        return result[0][0]
    }

}

module.exports=new FileService()
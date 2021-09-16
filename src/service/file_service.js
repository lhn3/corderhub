const connection=require('../app/database')

class FileService {
    //获取头像数据
    async getAvatar(userId){
        const statement='SELECT * FROM avatar WHERE user_id=2;'
        const result=await connection.execute(statement,[userId])
        return result[0]
    }
    //上传头像数据
    async createAvatar(filename,mimetype,size,userId){
        const statement='INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);'
        const result=await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }
    //更新头像数据
    async updateAvatar(filename,mimetype,size,userId){
        const statement='UPDATE avatar SET filename=?,mimetype=?,size=? WHERE user_id=?;'
        const result=await connection.execute(statement,[filename,mimetype,size,userId])
        return result
    }

}

module.exports=new FileService()
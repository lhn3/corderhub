const connection=require('../app/database')

class AuthService{
    //查询对应文章的对应作者是否符合
    async check(tableName,tableId,userId){
        const statement=`SELECT * FROM ${tableName} WHERE id=? AND user_id=?;`
        const result=await connection.execute(statement,[tableId,userId])
        return result[0]
    }
}



module.exports=new AuthService()
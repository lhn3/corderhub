const connection=require('../app/database')

class AuthService{
    //查询对应文章的对应作者是否符合
    async checkMoment(momentId,userId){
        const statement=`SELECT * FROM moment WHERE id=? AND user_id=?;`
        const result=await connection.execute(statement,[momentId,userId])
        return result[0]
    }
}



module.exports=new AuthService()
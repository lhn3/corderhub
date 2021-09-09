//对数据可的操作
//导入数据库连接
const connention=require('../app/database')

class UserService{
    //创建
    async create(user){
        const {username,password}=user
        const statement=`INSERT INTO users(name,password) VALUES(?,?);`
        const result=await connention.execute(statement,[username,password])
        return result
    }

    //查询用户
    async getUser(username){
        const statement=`SELECT * FROM users WHERE name=?;`
        const result=await connention.execute(statement,[username])
        return result[0]
    }
}

module.exports=new UserService()
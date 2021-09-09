//对数据可的操作
//导入数据库连接
const connention=require('../app/database')

class UserService{
    async create(user){
        const {username,password}=user
        const statement=`INSERT INTO users(name,password) VALUES(?,?);`

        const result=await connention.execute(statement,[username,password])

        return result
    }
}

module.exports=new UserService()
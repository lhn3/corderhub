const connention=require('../app/database')

class MomentService{
    //创建
    async create(content,userId){
        const statement=`INSERT INTO moment(content,user_id) VALUES(?,?);`
        const result=await connention.execute(statement,[content,userId])
        return result
    }
}


module.exports=new MomentService()
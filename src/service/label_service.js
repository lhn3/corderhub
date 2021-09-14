const connection=require('../app/database')

class LabelService{
    //查询所有标签
    async getLabels(){
        const statement=`SELECT * FROM labels;`
        const result=await connection.execute(statement)
        return result[0]
    }

    //创建标签
    async create(label){
        const statement=`INSERT INTO labels (label) VALUES (?);`
        const result=await connection.execute(statement,[label])
        return result[0]
    }

    //查询此标签是否存在
    async checkLabel(label){
        const statement=`SELECT id,label FROM labels WHERE label=?`
        const result=await connection.execute(statement,[label])
        return result[0]
    }
}



module.exports=new LabelService()
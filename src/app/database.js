const mysql=require('mysql2')
//导入配置参数
const {MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD,}=require('../app/config')

//连接池
const connection=mysql.createPool({
    host:MYSQL_HOST,
    port:MYSQL_PORT,
    password:MYSQL_PASSWORD,
    user:MYSQL_USER,
    database:MYSQL_DATABASE,
})

//测试连接
connection.getConnection((err,conn)=>{
    conn.connect((err)=>{
        if(err){
            console.log('连接数据库失败：'+err)
        }else {
            console.log('连接数据库成功')
        }
    })
})

module.exports= connection.promise()







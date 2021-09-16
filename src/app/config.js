const dotenv=require('dotenv')
const path=require('path')
const fs=require('fs')

//导入配置
dotenv.config()

//取出某个配置
// console.log(process.env.APP_PORT)

//导入秘钥
const PRIVATE_KEY=fs.readFileSync(path.resolve(__dirname,'./KEY/private.key'))  //私钥
const PUBLIC_KEY=fs.readFileSync(path.resolve(__dirname,'./KEY/public.key'))    //公钥

//结构导出
module.exports={
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
}=process.env

module.exports.PRIVATE_KEY=PRIVATE_KEY
module.exports.PUBLIC_KEY=PUBLIC_KEY



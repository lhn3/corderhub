const dotenv=require('dotenv')

//导入配置
dotenv.config()

//取出某个配置
// console.log(process.env.APP_PORT)

//结构导出
module.exports={
    APP_PORT
}=process.env



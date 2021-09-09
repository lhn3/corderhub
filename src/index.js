const {app}=require('./app/index')
//导入配置文件
const {APP_PORT}=require('./app/config')
const {connection}=require('./app/database')

app.listen(APP_PORT,()=>{
    console.log('服务器启动成功')
})
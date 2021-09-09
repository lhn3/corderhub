const {app}=require('./app/index')
const {APP_PORT}=require('./app/config')

app.listen(APP_PORT,()=>{
    console.log('服务器启动成功')
})
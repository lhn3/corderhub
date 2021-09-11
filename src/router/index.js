const fs=require('fs')

const Routers=(app)=>{
    //获取当前文件夹的所有文件
    fs.readdirSync(__dirname).forEach(file=>{
        if (file !== 'index.js'){
            //路由注册
            const router=require(`./${file}`)
            app.use(router.routes())
            app.use(router.allowedMethods())
        }
    })
}

module.exports={
    Routers
}
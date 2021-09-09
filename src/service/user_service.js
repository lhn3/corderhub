class UserService{
    async create(user){
        console.log("获取用户信息"+user)
        return '创建用户成功~'
    }
}

module.exports=new UserService()
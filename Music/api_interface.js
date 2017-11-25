'use strict'
const express = require('express');
//引入路由级中间件
const router = express.Router();
//引入用户控制器
const userController = require('./controller/userController');
//引入音乐控制器
const musicController = require('./controller/musicController');
const sql = require('./models/db');
//测试版
router.get('/test', (req, res, next) => {
    res.render('login.html');
})
//检查用户是否存在
.post('/check-user',userController.checkUser)
//注册用户
.post('/do-register',userController.registerUser)
//登录用户
.post('/do-login',userController.loginUser)
//添加音乐
.post('/add-music',musicController.addMusic)
//编辑音乐
.put('/edit-music',musicController.editMusic)
//删除音乐
.delete('/del-music',musicController.delMusic)
//导出
module.exports = router;

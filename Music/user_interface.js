// 开启严格模式
'use strict'
const userController = require('./controller/userController');
//引入express对象
const express = require('express');
//创建路由
let router = express.Router();
//注册页面
router.get('/register',userController.register)
//登录页面
router.get('/login',userController.login)


module.exports = router;
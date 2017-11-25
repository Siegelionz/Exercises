//开启严格模式
'use strict'
//引入express 对象

const musicController = require('./controller/musicController');
const express = require('express');
//创建路由
let router = express.Router();

//显示音乐列表
router.get('/list-music',musicController.listMusic)
//添加音乐页面
.get('/add-music',musicController.showMusic)
//编辑音乐页面
.get('/edit-music',musicController.updateMusic)

module.exports = router;
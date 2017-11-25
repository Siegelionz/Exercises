//开启严格模式
'use strict'
const config = require('./config')
//引入express对象
const express = require('express');
//引入解析post请求体数据对象
const bodyParser = require('body-parser');
//引入express-session对象
const session = require('express-session')
//创建服务器
let app = express();
//开启服务器并监听端口
app.listen(2222, () => {
    console.log('服务器已开启');
})
//引入api接口
const api_router = require('./api_interface');
//引入user接口
const user_router = require('./user_interface');
//引入音乐接口
const music_router = require('./music_interface');
//注册模板
app.engine('html', require('express-art-template'));
//处理静态资源
app.use('/public',express.static('./public'));

//session存储
app.use(session({
    secret: 'zyt', //唯一标识，必填
    resave: false, 
    //true强制保存,不管有没有改动session中的数据，依然重新覆盖一次
    saveUninitialized: true,//一访问服务器就分配session
    //如果为false,当你用代码显式操作session的时候才分配
    // cookie: { secure: true // 仅仅在https下使用 }
  }))
// parse application/x-www-form-urlencodedd
app.use(bodyParser.urlencoded({
    extendee: false
}));
// parse application/json
app.use(bodyParser.json());
//当请求接口为末尾为music的时候，判断一下用户是否登录过
app.use(/\/music|\/api\//,(req,res,next)=>{
    //判断是否存在session上的user
    console.log(1);
  if(!req.session.user){
      return res.send(`
               请去首页登录
               <a href="/user/login">点击</a>
          `);
   }
   //比如当前请求是 /music/add-music
   next();
});
//添加到中间件列表中
app.use('/api',api_router);
app.use('/user',user_router);
app.use('/music',music_router);
//错误信息解决
app.use((err,req,res,next)=>{
    res.send(`
        您访问的页面回老家了
        <a href="/user/login">点击</a>
    `);
return;
})
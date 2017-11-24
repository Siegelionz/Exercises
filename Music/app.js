//开启严格模式
'use strict'
//引入express对象
const express = require('express');
//引入解析post请求体数据对象
const bodyParser = require('body-parser');
//引入数据库模板
const sql = require('./models/db');
//引入express-session对象
const session = require('express-session')
//引入formidable对象
const formidable = require('formidable');
//引入path对象
const path = require('path');
//创建服务器
let app = express();
//注册模板
app.engine('html', require('express-art-template'));
//开启服务器并监听端口
app.listen(2222, () => {
    console.log('服务器已开启');
})
//引入路由级中间件
const router = express.Router();
//测试版
router.get('/test', (req, res, next) => {
    sql.q('select * from users',[],(err,data)=>{
        // console.log(data);
    });
})
//检查用户是否存在
.post('/api/checkuser', (req, res, next) => {
    //获取用户提交上来的数据
    let username = req.body.username;
    //判断是否可以注册用户填写的用户名
    sql.q('select * from users where username = ?',username,(err,data)=>{
        if(err) return next(err);
        //判断
        if(data.length ==0){
            res.json({
                code:'001',
                mag:'用户还没有被注册'
            })
        }else{
            res.json({
                code:'002',
                mag:'用户已被注册'
            })
        }
    })
})
//注册用户
.post('/api/registeruser',(req,res,next)=>{
    //获取用户提交上来的数据
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let v_code = req.body.v_code;

    //验证码暂时留着!!!!!

    //验证邮箱格式
    let regex = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if(!regex.test(email)){
        res.json({
            code:'004',
            mag:'邮箱不合法'
        })
    };
    //验证用户名以及邮箱是否被注册
    sql.q('select * from users where username = ? or email = ?',[username,email],(err,data)=>{
        if(err) return next(err);
        //查询语句中只要有一个符合条件 就算注册失败 
        //拿一下查询到值
        let user = data[0];
        if(data.length != 0){
            //不等于0 以为查询到用户名或者邮箱已被注册
            if(user.email == email){
                res.json({
                    code:'002',
                    mag:'邮箱已被注册'
                })
            }else if(user.username == username){
                res.json({
                    code:'002',
                    mag:'用户名已被注册'
                })
            }
            
        }else{
            //还木有被注册
            sql.q('insert into users (username,password,email) values (?,?,?) ',[username,password,email],(err,data)=>{
                if(err) return next(err);
                res.json({
                    code:'001',
                    mag:'注册成功'
                })
            })
        }
    })
                   
})
//登录用户
.post('/api/loginuser',(req,res,next)=>{
    //接收数据
    let username = req.body.username;
    let password = req.body.password;
    //校验用户名是否存在，密码是否一致
    sql.q('select * from users where username = ? ',username,(err,data)=>{
        if(err) return next(err);
        let user = data[0];
        if(data.length ==0){
            res.json({
                code:'002',
                mag:'用户名或者密码不正确'
            })
        }else if(user.password != password){
            res.json({
                code:'002',
                mag:'用户名或者密码不正确'
            })
        }else{
            //利用session 存数据
            req.session.user = user;
            res.json({
                code:'001',
                mag:'登录成功'
            })
        }
    })
})
//添加音乐
.post('/api/addMusic',(req,res,next)=>{
    //首先先判断一下session 是否登录过
    if(!req.session.user){
        res.send(`
                 请去首页登录
                 <a href="/user/login">点击</a>
            `);
        return;
    }
    //利用解析上传文件对象  就可以获取到填写的数据以及文件
    var form = formidable.IncomingForm();
    //设置默认的文件
    form.uploadDir = path.join(__dirname,'public/files');
    form.parse(req,(err,fields,files)=>{
        if(err) return next(err);
        //formidable会帮我们做好接收数据  接下来我们就应该往数据库插内容了
        //定义一个数组来存放具体的数据
        let datas = [fields.title,fields.singer,fields.time];
        //来定义一个查询语句字符串  来防止用户为上传文件
        let db = 'insert into musics (title,singer,time,';
        //(?,?)
        let value = '(?,?,?,'
        //判断音乐文件是否上传
        if(files.file){
            //获取当前上传的文件的名字
            let musicname = path.parse(files.file.path).base;
            datas.push(`/public/files/${musicname}`);
            //既然上传了音乐文件在sql后面添加
            db+='file,';
            value+='?,';
        };
        if(files.filelrc){
            //获取当前上传的文件的名字
            let textname = path.parse(files.filelrc.path).base;
            datas.push(`/public/files/${textname}`);
            //既然上传了音乐文件在sql后面添加
            db+='filelrc,';
            value+='?,';
        }
        //总的结合
        db+='uid) values ';
        value+='?)';
        //添加上id
        // console.log(db+value);
        //使用这个添加id 就为了确保是在哪个用户账号添加的数据  uid 必须填 没有填才导致无法插入数据成功
        datas.push(req.session.user.id);
        //数据库结合
        sql.q(db + value ,datas,(err,data)=>{
            res.json({
                code:'001',
                msg:'添加音乐成功'
            });
        });
    })
})



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
//添加到中间件列表中
app.use(router);
//错误信息解决
app.use((err,req,res,next)=>{
    res.send(`
        您访问的页面回老家了
        <a href="/user/login">点击</a>
    `);
return;
})
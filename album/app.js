//开启严格模式
'use strict'
//引入express对象
const express = require('express');
//引入解析post请求体
const bodyParser = require('body-parser');
//引入模板引擎
const expressArtTemplate = require('express-art-template');
//引入拼接路径的path
const path = require('path');
//引入fs文件增强版
const fse = require('fs-extra');
//引入上传文件
const formidable = require('formidable');
//引入数据库对象
const mysql = require('mysql');
const pool = mysql.createPool({
    //开启10个数据流
    connectionLimit:10,
    //网站地址
    host:'127.0.0.1',
    //数据库用户名
    user:'root',
    //数据库密码
    password:'zhangyutian',
    //连接的数据库名
    database:'album'
})




//构建服务器
let app = express();
//注册一个模板
app.engine('html',expressArtTemplate);
//监听端口开启服务器
app.listen(2222,()=>{
    console.log('服务器已开启');
})
//引入路由级中间件
let router = express.Router();
//显示相册
router.get('/',(req,res,next)=>{
    //下面的代码是使用数据库来查询数据
    pool.getConnection((err, connection)=> {
        //处理获取连接时的异常，比如停网了
        if(err) return next(err);
        //使用连接查询所有的album_dir所有数据
        connection.query('select * from album_dir',(error, results)=>{
            //查询完毕以后，释放连接
            connection.release();
            //出现异常 return 抛出异常
            if(error) return next(err);
            res.render('index.html',{
                showalbum:results
            })
        })
    });
})
//添加相册
.post('/addalbum',(req,res,next)=>{
    //接收请求体  要添加的相册名字
    var dirname = req.body.dirname;
    //数据库实现添加功能
    pool.getConnection((err,connection)=>{
        //如果连接异常  跳转到友好的页面提醒错误
        if(err) return next(err);
        connection.query('insert into album_dir values (?)',[dirname],(err,results)=>{
            //查询完 就要释放连接
            connection.release();
            if(err) return next(err);
            //创建该相册名称的文件夹
            const dir = `./resource/${dirname}`;
            fse.ensureDir(dir, err => {
              if(err) return next(err);
              // dir has now been created, including the directory it is to be placed in
            })
            //重定向
            res.redirect('/');
        })

    })

})
//显示相片
.get('/showpic',(req,res,next)=>{
    //接受url上的参数
    let showpic = req.query.showpic;
    //请数据库来帮忙啦 
    pool.getConnection((err,connection)=>{
        if(err) return next(err);
        //查询数据库数据
        connection.query('select * from album_file where dir = (?)',[showpic],(err,resulte)=>{
            //查询完毕  释放连接
            connection.release();
            if(err) return next(err);
            res.render('album.html',{
                showpic:resulte,
                //我们把当前的相册目录传回去  知道是把这张图片添加到这个相册
                allalbum:showpic
            })
        })
    }) 
})
//上传图片
.post('/addPic',(req,res,next)=>{
    //上传文件 初始化
    var form = new formidable.IncomingForm();
    //设置模式上传的目录
    let root = path.join(__dirname,'resource');
    form.uploadDir = root;
    form.parse(req, function(err, fields, files) {
        //console.log(fields);   会把我们表单中的数据变为对象 name:value 的形式
        //console.log(files);   会把我们上传的文件变为对象
        //把图片移动到默认的相册的文件夹中

        //获取当前文件的名字
        let fileName = path.parse(files.pic.path).base;
        //移动文件  把原来的路径(参数1) 移动到新的路径中(参数2)  
        let newFile = path.join(root,fields.allalbum,fileName)
        fse.move(files.pic.path, newFile, err => {
            if (err) return next(err);
          })

        //移动走文件  接下来连接数据库把详细信息写入
        pool.getConnection((err,connection)=>{
            if(err) return next(err);
            //设置数据库的file和dir
            let dbFile = `/resource/${fields.allalbum}/${fileName}`;
            let dbDir = fields.allalbum;
            connection.query('insert into album_file values (?,?)',[dbFile,dbDir],(err)=>{
                if(err) return next(err);
                //查询结束后 释放连接
                connection.release();
                //重定向
                res.redirect('/showpic?showpic='+dbDir);
            })
        })
    });

})
.all('*',(req,res)=>{
    res.send(`
        您访问的页面回老家探亲去啦!
        <a href="/">去首页瞧瞧?</a>
    `)
})





//解析post请求体的数据
app.use(bodyParser.urlencoded( {extendee:false}));
app.use(bodyParser.json())
//暴露public下的文件
app.use('/public',express.static('./public'));
//暴露resource下的文件
app.use('/resource',express.static('./resource'));
//把路由级中间件添加到应用级中间件中
app.use(router);
//错误处理中间件
app.use((err,req,res,nexr)=>{
    console.log('出现错误!');
    console.log(err);
    //给用户返回一个友好而美好的页面
    res.send(`
        您的访问的页面去看病了!
        <a href="/">去首页看看?</a>
    `)
})
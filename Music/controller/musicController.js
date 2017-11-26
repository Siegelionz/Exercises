'use strict'
//引入数据库模板
const sql = require('../models/db');
//引入formidable对象
const formidable = require('formidable');
//引入path对象
const path = require('path');
const config = require('../config');
let musicController ={};

// //添加音乐
musicController.addMusic = (req,res,next)=>{
    //利用解析上传文件对象  就可以获取到填写的数据以及文件
    var form = formidable.IncomingForm();
    //设置默认的文件
    form.uploadDir = path.join(config.upload,'public/files');
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
}
//编辑音乐
musicController.editMusic = (req,res,next)=>{
    // 接收请求的id地址
    // let musicid = req.query.id;
    //利用解析上传文件对象  就可以获取到填写的数据以及文件
    var form = formidable.IncomingForm();
    //设置默认的文件
    form.uploadDir = path.join(config.upload,'public/files');
    form.parse(req,(err,fields,files)=>{
        if(err) return next(err);
        //formidable会帮我们做好接收数据  接下来我们就应该往数据库插内容了
        //定义一个数组来存放具体的数据
        let datas = [fields.title,fields.singer,fields.time];
        //来定义一个查询语句字符串  来防止用户为上传文件
        let db = 'update musics set title = ? , singer = ? , time = ? ,';
        //判断音乐文件是否上传
        if(files.file){
            //获取当前上传的文件的名字
            let musicname = path.parse(files.file.path).base;
            datas.push(`/public/files/${musicname}`);
            //既然上传了音乐文件在sql后面添加
            db+='file = ? ,';
        };
        if(files.filelrc){
            //获取当前上传的文件的名字
            let textname = path.parse(files.filelrc.path).base;
            datas.push(`/public/files/${textname}`);
            //既然上传了音乐文件在sql后面添加
            db+='filelrc = ? ,';
        }
        //总的结合
        // db = db.substr(0,db.length-1);
        //由于会多出现一个逗号  所以我们要把它去掉  substr  从0下标开始 截取字符串长度-1
        db = db.substr(0,db.length-1);
        db+='where id = ?';
        //添加上id
        datas.push(fields.id);
        //  console.log(db);
        // console.log(datas);
        //数据库结合
        sql.q(db,datas,(err,data)=>{
            res.json({
                code:'001',
                msg:'更新音乐成功'
            });
        });
    })
}
//删除音乐
musicController.delMusic = (req,res,next)=>{
    // 接收音乐的id以及用户的uid
    let musicId = req.body.id;
    let userId = req.session.user.id;
    //传入要删除的音乐id   还要一个条件 这个音乐id必须符合用户的id 防止被恶意删除
    sql.q('delete from musics where id = ? and uid = ?',[musicId,userId],(err,data)=>{
        if(data.affectedRows == 0){
            res.json({
                code:'002',
                msg:'删除音乐失败'
            });
        }else{
            res.json({
                code:'001',
                msg:'删除音乐成功'
            });
        }
    })
}
//显示音乐列表
musicController.listMusic = (req,res,next)=>{
    //接收当前登录的账号id
    let userId = req.session.user.id;
    // console.log(userId);
    //数据库查询对应数据
    sql.q('select * from musics where uid = ?',userId,(err,data)=>{
        res.render('index.html',{
            obj:data
        });
    })
    
}
// 添加音乐
musicController.showMusic = (req,res,next)=>{
    res.render('add.html');
}
// 编辑音乐
musicController.updateMusic = (req,res,next)=>{
    // 接收请求的id地址
    let musicid = req.query.id;
    //数据库查询对应数据
    sql.q('select * from musics where id =?',musicid,(err,data)=>{
        console.log(data[0]);
        console.log(data);
        res.render('edit.html',{obj:data});
    })
}
//导出 
module.exports = musicController;

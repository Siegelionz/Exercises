'use strict'
//引入数据库模板
const sql = require('../models/db');
let userController ={};

//检查用户是否存在
userController.checkUser = (req, res, next) => {
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
};
//注册账号
userController.registerUser = (req,res,next)=>{
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
                   
};
//登录账户
userController.loginUser = (req,res,next)=>{
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
                mag:'用户名或密码不正确'
            })
        }else if(user.password != password){
            res.json({
                code:'002',
                mag:'用户名或密码不正确'
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
};
// 注册页面
userController.register = (req,res,next)=>{
    res.render('register.html');
}
// 登录页面
userController.login = (req,res,next)=>{
    res.render('login.html')
}





//导出
module.exports = userController;
// //开启严格模式
'use strict'
// //引入mysql对象
const mysql = require('mysql');
// //配置数据配置
const pool = mysql.createPool({
    //开启数据流
    connectionLimit: 10,
    //网站的地址
    host: '127.0.0.1',
    //数据库用户名
    user: 'root',
    //数据库密码
    password: 'zhangyutian',
    //连接哪个数据库
    database: 'node_music'
})
//封装数据库查询函数
let q = function (sql,datas,callback) {
    //先连接数据库
    pool.getConnection((err, connection) => {
        //如果有异常 return
        if(err) return callback(err,null);
        //查询数据
        connection.query(sql, datas, (error,data) => {
        //释放连接
            connection.release();
            callback(error,data);
        })
    })
}
//导出包
module.exports = {
    q:q
}

import Vue from '../vue';
import VueRouter from '../vue-router';


//引入jquery  并把它绑到Vue的原型
import $ from '../jquery.min.js';
Vue.prototype.$ = $;

import App from './app';
import Login from './login';
import Music from './music';

Vue.use(VueRouter);
var router = new VueRouter();
router.addRoutes([
    { name:'login', path:'/login',component:Login },
    { name:'music',path:'/music',component:Music,meta:{name:'yt'} }
])
//全局守卫
router.beforeEach((to,from,next)=>{
    //接收一下to下面的matched属性   数据类型为数组
    var matched = to.matched;
    //声明一个变量来存放是否需要校验
    var isset = false;
    //遍历这个数组  判断是否携带着元数据
    for(var i=0;i<matched.length;i++){
        if(matched[i].meta.name == 'yt'){
            isset = true;
        }
    }
    //判断一次isset是否为
    if(!isset){
        //说明为false  不需要拦截
        return next();
    }
    //说明有元数据  开始拦截判断
    //获取session值
    var session = localStorage.getItem('username');
    //发起ajax请求
    $.ajax({
        url:'http://localhost:3000/users/'+session,
        type:'get',
        dataType:'json',
        success:function(data){
            if(data.isLogin == 'true'){
                next();
            }else{
                alert('您还为登录，请去登录');
                next({
                    name:'login'
                })
            }
        }
    })

})
new Vue({
    el:'#app',
    render:c=>c(App),
    router
})
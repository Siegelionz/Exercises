export default {
    template:`
        <div>
            <router-link :to="{ name : 'login' }">登录</router-link>
            <button @click="toed">退出</button>
            <router-link :to="{ name : 'music' }">音乐</router-link>
            <router-view></router-view>
        </div>
    `,
    methods:{
        
        toed:function(){
            this.$.ajax({
                    url:'http://localhost:3000/users/'+localStorage.getItem('username'),
                    type:'put',
                    dataType:'json',
                    data:'isLogin=false',
                    success:(data)=>{
                         this.$router.push({
                             name:'login'
                         })
                    }
            })
        }
    }
}
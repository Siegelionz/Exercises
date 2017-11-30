export default {
    template:`
        <div>
            id:<input type="text" v-model="myid" />
            密码:<input type="text" v-model="mypassword" />
            <button @click="go">登录</button>
        </div>
    `,
    data(){
        return{
            myid:'',
            mypassword:''
        }
    },
    methods:{
        go:function(){
            //当点击登录按钮发起ajax请求
            var id = this.myid;
            this.$.ajax({
                url:'http://localhost:3000/users/'+id,
                type:'put',
                dataType:'json',
                data:'isLogin=true',
                success:(data)=>{
                    //当请求成功后  设置session 
                    localStorage.setItem('username',this.myid);
                    //把login设置为ture 代表了登录过
                }
            })
        }
    }
}
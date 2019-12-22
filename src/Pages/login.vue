<template>
    <div class="homepage-hero-module">
        <div class="video-container">
            <div :style="fixStyle" class="filter"></div>
            <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
                <source src="../assets/coverr-lago.mp4" type="video/mp4"/>
                <!-- <source src="PATH_TO_WEBM" type="video/webm"/> -->
            </video>
            <div class="poster hidden" v-if="!vedioCanPlay">
                <img :style="fixStyle" src="../assets/coverr-lago.jpg" alt="">
            </div>
            <div class="loginPage">
                <div class="loginTitle">自助表单生成系统</div>
                <el-form style="padding: 30px 10px 10px;">
                    <el-form-item label="用户名" label-width="70px">
                        <el-input class="text_field" type="text" v-model="username" @blur="inputBlur('user',username)" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="70px">
                        <el-input class="text_field" type="password" v-model="password" @blur="inputBlur('password',password)" size="small" show-password></el-input>
                    </el-form-item>
                    <el-form-item class="optionList">
                        <el-button @click="Tologin" type="primary" size="small">登录</el-button>
                        <el-button @click="resetForm" size="small">重置</el-button>
                        <el-button @click="Toregister" type="primary" size="small">注册</el-button>
                    </el-form-item>
                </el-form>              
            </div>
         </div>
    </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        //视频背景组件
        vedioCanPlay: false,
        fixStyle: '',
        //表单中的参数
        username: '',
        password: '',
        userexist: false,
      }
    },
    methods: {
        canplay() {
          this.vedioCanPlay = true
        },
        resetForm(){
            this.username = '';
            this.password = '';
        },
        Tologin(){
            var name = this.username,
                password = this.password;
            console.log(name,password);
            let data = {'username':name, 'password':password};
            /*接口请求*/
            this.$http.post('/api/user/selectUser',data,{emulateJSON: true}).then((res)=>{
                console.log(res);
                /*接口的传值是(-1,该用户不存在),(0,密码错误)*/
                if(res.data == -1){
                    this.$message.error('用户名不存在');
                    this.username = '';
                    this.password = '';
                }
                else if(res.data == 0){
                    this.$message.error('密码错误');
                    this.password ='';
                }
                else{
                    this.$message('登录成功');
                    setTimeout(function(){
                        this.$router.push('/manage');
                    }.bind(this),1000);
                }
          })
        },
        Toregister(){
            var name = this.username,
                password = this.password;
            console.log(name,password)
            let data = {'username':name, 'password':password}
            /*接口请求*/
            this.$http.post('/api/user/addUser',data,{emulateJSON: true}).then((res)=>{
                console.log(res)
                /*接口的传值是(-1,该用户不存在),(0,密码错误)*/
                if(res.data == -1){
                    this.$message.error('用户名已存在');
                    this.username = '';
                    this.password = '';
                }
                else if(res.status == 200){
                    this.$message('注册成功，请重新登录');
                    setTimeout(function(){
                        this.username = '';
                        this.password = '';
                    }.bind(this),1000);
                }
          })
        },
        inputBlur:function(errorItem,inputContent){
            if (errorItem === 'user') {
                if (inputContent === '') {
                    this.$message.error('用户名不能为空')
                }
            }
            else if(errorItem === 'password') {
                if (inputContent === '') {
                    this.$message.error('密码不能为空')
                }
            }
        }
    },
    mounted: function() {
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    }
}
</script>

<style>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }
  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
  }
  .loginPage{
    z-index: 2;
    width: 400px;
    height: 270px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 35px 20px 10px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fff;
  }
  .loginTitle{
    font-size: 22px;
    font-weight: bold;
    color: rgb(37, 69, 128);
    height: 20px;
    font-style: normal;
    text-align: center;
  }
  .optionList{
    width: 100%;
    padding: 5px 150px;
  }
</style>
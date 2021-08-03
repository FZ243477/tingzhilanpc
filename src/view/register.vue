<template>
    <div >
        <div class="register" ref="homePage" >
            <div class="register_img" :style='backRegister'>
                <img class="login_logo_img" @click="goHome" src="@/assets/img/login/logo.png" alt="">
                <img class="login_text_img" src="@/assets/img/login/text.png" alt="">
            </div>
            <div class="register_content">
                <div class="register_table">
                    <p class="register_title">注册</p>
                    <input type="text" v-model="mobile" class="register_input" placeholder="请输入手机号码">
                    <div style="position: relative;">
                    <input v-model="password" :type="typePwd" class="register_input" placeholder="请设置您的密码" >
                    <div class="eyes" :style='backEyes' @click="showPwd"></div>
                    </div>
                    <div style="position: relative;">
                        <input v-model="captcha" type="text" class="register_input" placeholder="请输入验证码" >
                        <div class="captcha" @click="sms_send">{{codeTips}}</div>
                    </div>
                    <div class="check_terms">
                        <div class="marker" @click="selectMark">
                            <div v-if="selectType==1" class="select_marker"></div>
                        </div>
                        <span class="check_terms_span">我已同意并接受<span @click="goAbout1">《服务条款》</span>和<span @click="goAbout4">《隐私政策》</span></span>
                    </div>

                    <div class="register_submit" @click="register">
                        立即注册
                    </div>

                    <div class="check_terms" style="text-align: center;margin-top: 20px;">
                        <span class="check_terms_span">已注册可直接 <span @click="goLogin">登录</span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data(){
      return {
        backRegister:{
          backgroundImage:
            "url(" + require("@/assets/img/login/back.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        backEyes:{
          backgroundImage:
            "url(" + require("@/assets/img/login/eyes.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        clientHeight:'',
        typePwd:'password',
        password:'',
        codeTips:'获取验证码',
        selectType:2,
        select:false,
        captcha:'',
        mobile:'',
        timer:1,
      }
    },
    mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods: {
      goAbout1(){
        this.$router.push("/about?id=" + 1);
      },
      goAbout4(){
        this.$router.push("/about?id=" + 4);
      },
      goHome(){
        this.$router.push({ path: "/home" });
      },
      goLogin(){
        this.$router.push({ path: "/login" });
      },
      changeFixed(clientHeight){                        //动态修改样式
        //  console.log(clientHeight);
        this.$refs.homePage.style.height = this.clientHeight  +'px';

      },
      sms_send(){
        let param = new FormData() // 创建form对象
        param.append('mobile',this.mobile)
        param.append('event', 'register')
        this.$axios.post(this.$api.smsSend,param).then(res=>{
            if(res.data.code==1){
              if(this.timer==1){
                var time=60;
                var inter=window.setInterval(()=>{
                  this.codeTips="("+time+"s)";
                  this.timer=0;
                  time--;
                  if(time<0){
                    window.clearInterval(inter)
                    this.timer=1;
                    this.codeTips="获取验证码"
                  }
                },1000)
              }
            }else{
              this.$toast(res.data.msg)
            }
      })
      },
      showPwd (){
        this.typePwd = this.typePwd === 'password' ? 'text' : 'password';
      },
      selectMark(){
        // console.log(this.select)
        if(this.select == false){
          this.select = true,
            this.selectType = 1
        }else{
          this.select = false,
            this.selectType = 2
        }
        // console.log(this.selectType)
      },
      register(){
        let param = new FormData() // 创建form对象
        param.append('password', this.password)
        param.append('mobile', this.mobile)
        param.append('captcha', this.captcha)
        param.append('accept_type', this.selectType)
        this.$axios.post(this.$api.register,param).then(res=>{
          if(res.data.code ==1){
            this.$toast('注册成功')
            window.setTimeout(()=>{
              this.$router.replace({path:'/login'})
            },500)
          }else{
            this.$toast(res.data.msg)
          }
        })
      }
    },
    created: function () {
    }
  }
</script>

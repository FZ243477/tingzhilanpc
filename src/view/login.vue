<template>
    <div >
        <div class="register" ref="homePage" >
            <div class="register_img" :style='backRegister'>
                <img class="login_logo_img" @click="goHome" src="@/assets/img/login/logo.png" alt="">
                <img class="login_text_img" src="@/assets/img/login/text.png" alt="">
            </div>
            <div class="login_content">
                <div class="login_table1">
                    <img class="saoma" :src="saomaurl" @click="changeSao" @mouseenter="hoverimg()" @mouseleave="hoverLeave()" alt="" >
                    <div class="loggin_table_1" v-if="saoma==1">
                        <p class="register_title">登录</p>
                        <input type="text"  v-model="account" class="register_input" placeholder="请输入手机号码">
                        <div style="position: relative;">
                            <input v-model="password" type="password" class="register_input" placeholder="请输入密码" >
                            <!--<div class="captcha" >{{codeTips}}</div>-->
                        </div>
                        <div class="drag" ref="dragDiv">
                            <div class="drag_bg"></div>
                            <div class="drag_text">{{confirmWords}}</div>
                            <div ref="moveDiv" @mousedown="mousedownFn($event)" :class="{'handler_ok_bg':confirmSuccess}" class="handler handler_bg" style="position: absolute;top: 0px;left: 0px;"></div>
                        </div>

                        <div class="register_submit" @click="login">
                            登录
                        </div>
                        <div class="check_terms" style="margin-top: 20px;">
                            <span class="check_terms_span" @click="goRegister">注册 </span>
                            <span class="check_terms_span" @click="goForget" style="float: right">忘记密码？ </span>
                        </div>
                    </div>

                    <div class="loggin_table_2" v-else>
                        <p class="register_title" style="letter-spacing: 10px;">微信扫码登录</p>
                            <div class="saoma_box">
                                <wxlogin style="margin-left: 110px;margin-top: 20px;" :href="wx.href" :state="wx.state" :appid="wx.appid" :scope="wx.scope"
                                         :redirect_uri="wx.redirect_uri"></wxlogin>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import Cookie from "js-cookie";
  import wxlogin from 'vue-wxlogin';
  import { mapMutations } from "vuex";
  export default {
    components: {
      wxlogin // //注册组件
    },
    data(){
      return {
        backRegister:{
          backgroundImage:
            "url(" + require("@/assets/img/login/back.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        saomaurl:require("@/assets/img/login/saocode.png"),
        saoma:1,
        captcha:'',
        account:'',
        password:'',
        clientHeight:'',
        linkUrl:'www.baidu.com',
        codeTips:'获取验证码',
        beginClientX:0,           /*距离屏幕左端距离*/
        mouseMoveStata:false,     /*触发拖动状态  判断*/
        maxwidth:'',               /*拖动最大宽度，依据滑块宽度算出来的*/
        confirmWords:'拖动滑块验证',   /*滑块文字*/
        confirmSuccess:false,          /*验证成功判断*/
        wx:[],
      }
    },
    mounted(){
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`         //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
      this.maxwidth = this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
      document.getElementsByTagName('html')[0].addEventListener('mousemove',this.mouseMoveFn);
      document.getElementsByTagName('html')[0].addEventListener('mouseup',this.moseUpFn)

    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo : 'SET_USERINFO'
      }),
      goHome(){
        this.$router.push({ path: "/home" });
      },
      goRegister(){
        this.$router.push({ path: "/register" });
      },
      goForget(){
        this.$router.push({ path: "/forget" });
      },
      login(){
        if(this.confirmSuccess){
          this.$axios.post(this.$api.login,{
            "account":this.account,
            "password":this.password
          }).then(res=>{
            // console.log(res)
            if(res.data.code ==1){
              this.$toast('登录成功')
              Cookie.set("userInfo", res.data.data.userinfo, { expires: 7 });
              this.setUserInfo(res.data.data.userinfo);
              window.setTimeout(()=>{
                this.$router.push({ path: "/home" });
              },500)
            }else{
              this.$toast(res.data.msg)
            }
          })
        }else{
          this.$toast('请完成验证!')
        }
      },
      changeSao(){
        if(this.saoma == 1){
          this.saomaurl = require("@/assets/img/login/computer.png")
          this.saoma = 2
          this.confirmSuccess = false
        }else{
          this.saoma = 1
          this.saomaurl = require("@/assets/img/login/saocode2.png")
          this.confirmSuccess = false
        }
      },
      hoverimg(){
        if(this.saoma == 1){
          this.saomaurl = require("@/assets/img/login/saocode2.png")
        }else{
          this.saomaurl = require("@/assets/img/login/computer.png")
        }
      },
      hoverLeave(){
        if(this.saoma == 1){
          this.saomaurl = require("@/assets/img/login/saocode.png")
        }else{
          this.saomaurl = require("@/assets/img/login/computer2.png")
        }
      },
      changeFixed (clientHeight) {                        //动态修改样式
        //  console.log(clientHeight);
        this.$refs.homePage.style.height = this.clientHeight+ 'px';
       // this.$refs.homePage1.style.height = this.clientHeight + 'px';

      },
      mousedownFn: function (e) {
        if (!this.confirmSuccess) {
          e.preventDefault && e.preventDefault();   //阻止文字选中等 浏览器默认事件
          this.mouseMoveStata = true;
          this.beginClientX = e.clientX;
        }
      },        //mousedoen 事件
      successFunction () {
        this.confirmSuccess = true
        this.confirmWords = '验证通过';
        if (window.addEventListener) {
          document.getElementsByTagName('html')[0].removeEventListener('mousemove', this.mouseMoveFn);
          document.getElementsByTagName('html')[0].removeEventListener('mouseup', this.moseUpFn);
        } else {
          document.getElementsByTagName('html')[0].removeEventListener('mouseup', () => {
          });
        }
        document.getElementsByClassName('drag_text')[0].style.color = '#fff'
        document.getElementsByClassName('handler')[0].style.left = this.maxwidth + 'px';
        document.getElementsByClassName('drag_bg')[0].style.width = this.maxwidth + 'px';
      },                //验证成功函数
      mouseMoveFn (e) {
        if (this.mouseMoveStata) {
          let width = e.clientX - this.beginClientX;
          if (width > 0 && width <= this.maxwidth) {
            document.getElementsByClassName('handler')[0].style.left = width + 'px';
            document.getElementsByClassName('drag_bg')[0].style.width = width + 'px';
          } else if (width > this.maxwidth) {
            this.successFunction();
          }
        }
      },                   //mousemove事件
      moseUpFn (e) {
        this.mouseMoveStata = false;
        var width = e.clientX - this.beginClientX;
        if (width < this.maxwidth) {
          document.getElementsByClassName('handler')[0].style.left = 0 + 'px';
          document.getElementsByClassName('drag_bg')[0].style.width = 0 + 'px';
        }
      },
    },
    created: function () {
      this.$axios.post(this.$api.wxLogin).then(res=>{
        if(res.data.code === 1){
          this.wx = res.data.data
          console.log(this.wx,'wxlogin')
        }
      })
    }
  }
</script>
<style scoped>
    .drag{
        position: relative;
        background-color: #e8e8e8;
        width: 471px;
        height: 70px;
        line-height: 34px;
        text-align: center;
    }
    .handler{
        width: 40px;
        height: 70px;
        border: 1px solid #ccc;
        cursor: move;
    }
    .handler_bg{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center;
    }
    .handler_ok_bg{
        background: #fff url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center;
    }
    .drag_bg{
        background-color: #009dfb;
        height: 70px;
        width: 0px;
    }
    .drag_text{
        position: absolute;
        top: 0px;
        width: 471px;
        text-align: center;
        -moz-user-select: none;
        -webkit-user-select: none;
        user-select: none;
        -o-user-select:none;
        -ms-user-select:none;
        font-size: 24px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #AAAAAA;
        line-height: 70px;
    }
</style>

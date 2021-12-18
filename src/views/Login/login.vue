<template>
    <div>
	  <div class="register" style="height: 937px;">
	   <div class="register_img" :style="backStyle">
		<img src="data:image/png;base64,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" alt="" class="login_logo_img" /> 
		<img src="@/assets/img/text.12ed286.png" alt="" class="login_text_img" />
	   </div> 
	   <div class="login_content">
		<div class="login_table1" v-if="showCode">
		 <img src="@/assets/img/showcode1.png" alt="" class="saoma"/> 
		 <div  class="loggin_table_2">
		  <p class="register_title" style="letter-spacing: 10px;">微信扫码登录</p> 
		  <div class="saoma_box" style="">
		   <div style="margin-left: 110px; margin-top: 20px;">
		  <wxlogin
		   	style="height: 200px;"
		   	:appid="qrCodeList.appid"
		   	:scope="qrCodeList.scope"
		   	:theme="qrCodeList.theme"
		   	:redirect_uri="qrCodeList.redirect_uri"
		   	:href="qrCodeList.href"
		   	rel="external nofollow"
		   ></wxlogin>
		   </div>
		  </div>
		 </div>
		</div>
		
		 <div class="login_table1" v-else>
		   <img src="@/assets/img/showcode2.png" alt="" class="saoma" /> 
		<!-- 	@click="changeShowCode()" -->
		   <div class="loggin_table_1">
		    <p class="register_title">登录</p> 
		    <input type="text" placeholder="请输入手机号码" v-model="account" class="register_input" /> 
		    <div  style="position: relative;">
		     <input type="password" placeholder="请输入密码" v-model="passWord" class="register_input" />
		    </div> 
		 
		    <div  class="register_submit" @click="submitLogin()">
		      登录 
		    </div> 
		    <div  class="check_terms" style="margin-top: 20px;">
		     <span class="check_terms_span">注册 </span> 
		     <span  class="check_terms_span" style="float: right;">忘记密码？ </span>
		    </div>
		   </div>
		  </div>
		  
	   </div>
	  </div>
    </div>
  </template>
  
  <script>
   import Cookies from "js-cookie";
  import wxlogin from 'vue-wxlogin';
  import { wxLoginPc,login,wxGetUserInfo,userIndex} from "_api/api";
  import { mapState, mapMutations } from 'vuex';
    export default {
	components: { wxlogin },
      data(){
        return {
          nim:null,
		  backStyle:{
			  backgroundImage:
				"url(" + require("@/assets/img/backlogin.png") + ")",
			  backgroundRepeat: "no-repeat",
			  backgroundSize: "100%"
			},
		qrCodeList:[],
		showCode:true,
		account:'',
		passWord:''
        }
      },
	computed: {
	    ...mapState(['userInfo'])
	},
      methods: {
		  ...mapMutations({
		      setUserInfo:'SET_USERINFO'
		  }),
		  changeShowCode(){
			  if(this.showCode == false){
				  this.showCode = true
			  }else{
				  this.showCode = false
			  }
		  },
        back() {
          this.$router.go(-1)
        },
		goHome(){
			this.$router.push({
			    path:'/home'
			})
		},
		goAbout(){
			this.$router.push({
			    path:'/about'
			})
		},
		submitLogin(){
			let params={
				  account:this.account,
				 password:this.passWord
				}
			login(params).then(res => {
			    if(res.code === 1){
				Cookies.set("userInfo", res.data.userinfo);
				 this.setUserInfo(res.data.userinfo);
				 window.setTimeout(()=>{
						this.$router.replace({path:'/home'})
					},500)
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		},
		getData(){
			wxLoginPc({
			}).then(res => {
			    if(res.code === 1){
					this.qrCodeList = res.data
				
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		},
        getCode () { // 非静默授权，第一次有弹框
                   this.code = ''
                   var local = window.location.href  // 获取页面url
                   var appid = this.qrCodeList.appid
                   this.code = this.getUrlCode().code // 截取code
				   console.log( this.code)
                   if (this.code == null || this.code === '') { // 如果没有code，则去请求
                    
                   } else {
                     // 你自己的业务逻辑
                     wxGetUserInfo({
                       login_type: 2,
                       code: this.code
                     }).then(res => {
                       if (res.code == 1) {
                           Cookies.remove("userInfo");
                           Cookies.set("userInfo", res.data.userinfo)
                           this.userInfo = res.data.userinfo;
						   this.$router.push({
						       path:'/home'
						   })
                       } else {
                           this.$message.error(res.msg, 'middle')
                       }
                     })
                   }
       
                 },
                 getUrlCode() { // 截取url中的code方法
                   var url = location.search
                   this.winUrl = url
                   var theRequest = new Object()
                   if (url.indexOf("?") != -1) {
                     var str = url.substr(1)
                     var strs = str.split("&")
                     for(var i = 0; i < strs.length; i ++) {
                       theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1])
                     }
                   }
                   return theRequest
                 },
    },
      created: function () {
        this.getData()
		this.getCode()
      }
    }
  </script>
  <style>
    body {
      background-color: #f2f2f2;
    }
  
    .header {
      line-height: 36px;
    }
  
    .time {
      line-height: 28px;
    }
  
    .photo {
      border-radius: 6px;
    }
  
    .conText {
      margin: 5px;
      word-break: break-all;
    }
  
    .conbox {
      margin-bottom: 15px;
    }
  </style>
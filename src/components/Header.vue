<template>
	<div>
		<div>
		   <div class="head_top"></div> 
		   <div class="public_head">
		    <div class="p_h_content">
		     <img src="@/assets/img/phlogo.png" @click="goHome()" alt="" class="p_h_logo" /> 
		     <div onclick="event.cancelBubble = true" class="p_h_nav">
		      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAcCAYAAAD815boAAABXklEQVRYhe2YvUrEQBSFP8NiIaLiamO3jSDa2S4W+w77DLKVj+ATKIiFz+ED2C1WbinbCGIhCLrgH/6teORKFuKQjVPMLBHywYRMMpM5c3Jzh8mUpA3gCFgHEn7zDpwA28CTc28nLYvO9VB8AedAB0ld/c2uJDJlzaNPKLrmXN1j5ktOfTmSe3nUzZW2pLeCWV9LWnWcTCQdT8BF09W2mDTx80AjZxZD4CKNzTwaad9YXAIPI5Glxv2aS0klMhSVyFDUMs+ZyxH9AbwUjGX9ZyNps2Xx8edMUlPSVUFCPZW04iRzK/uSXiMnc9PVtMF6Ho33HIGbkcVl6SWecelm/NqYdjFIzJWWpJuCmZyNed0HkoaRXTRdreyyuJDjwifwXODONDAT0cV7O1RrdygqkaGoRIZilJRLvX34FxsxG7Dv0fjQEbk1AYEj+haTAw/b75z6baTXm8eg/L9ZoPMNjlOEl/8ZXyEAAAAASUVORK5CYII=" alt="" /> 
		      <ul class="p_h_nav_ul">
		       <li @click="goHome()">首页</li> 
		       <li  @click="goClassify()">分类</li> 
		       <li @click="goCard()">下载卡</li>
		      </ul>
		     </div> 
		     <div class="p_h_search">
		      <div class="head_s_1">
		       <div class="search_div1">
		        <span style="padding-top: 10px;">图片 </span> 
		        <i class="el-icon-caret-bottom  sear_i" style="margin-top: 14px;"></i> 
		        <div style="clear: both;"></div>
		       </div>
		      </div> 
		      <input type="text" placeholder="输入关键词进行美食图片搜索" v-model="searchValue" class="search_input p_h_input" /> 
		      <div class="search_r" style="border-radius: 0px;" @click="goSearch()">
		       <img src="@/assets/img/searchimg.png" alt="" />
		      </div>
		     </div> 
			 
		     <div class="p_h_right_box" v-if="loginState">
		      <ul>
		       <li @click="goCard()"><img src="@/assets/img/cardImg.png" alt="下载卡" /></li> 
		       <li @click="goCollectionList()"><img src="@/assets/img/shoucangImg.png" alt="收藏夹" /></li> 
		       <li onclick="event.cancelBubble = true" class="menu_li" style="position: relative;">
				   <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAACAElEQVRIia3WvWsUURQF8J8ubAqLgBC1S1RQSCVuUFEkTYqQgE26BRWCoqZLk8YqZTottFCChV20kkT/AMWPRgTxI34UCVhITCFIMIpGHtyRQbLjzGYPXAbuO/ecfW/uu7PbGo2GiugK+nqVsu0leftwHcv4HrEcub2dMjqPN7iEbjyO6I7cW5zbqtFZ3MAPXEAPTkT0RC6t3cTpIqGid7QHHxIHJ/G8Be8wHmID+/G56o7Sr92B6QITsTYd3IutSEVGw/iN2QJOhtngDrdj1BvHsFrCaDW4ve0Y/czdmTLoiprKRqmld6K/hEl/cF+3Y3QnnpdLGGWcu+0Y3cYimpgq4E0FZzFqKhuliziGL5jBA4xgd8RI5GaCMxY1m6LMUE2C91Brsf4Lp3C/SKRoRwcwj4WcyRKeRCxFrhac+aipZDSBlxiNmz+OXejD8Yi+yI0HZzRqJsoapTO/hjWcwQBuYWUT7kqsDQR3LWpn/mc0GV30EUeiizZaHUcOG8E9hk+hMZkn5JvhEJ7hWxS8L2GwGdJ7ehpD9ihe/LujK6jHBG7XJOFdaNRDU94obWsQj3ITYSuYi6/wYGj/NWrG82oHTDJku2nmjYZi8hZeuopYCM2hzChduIN4Fe3ZKSStpJm0a5nR1+i4TiNpJu1a1t7po5UGYpk7UwXpj00d638AEe5yiC6KUeoAAAAASUVORK5CYII=" title="个人中心" alt="" style="width: 28px;" /> 
				   <span class="menu_li_span">{{userInfo.nickname}}</span> 
		        <div class="menu">
		         <ul>
		          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAKCAYAAABblxXYAAAAbklEQVQoka3MvQqAIBSG4erOHRoaRHJwELzM5jcszyD4U9YLDh74ngnovQWwwAHs6d/c9MAZCOSFdB9C49BTzrfgFugqoORqcA20HVCyJbiEmoegZHqofglKuoZug6AU9xm6fgSl6Fyo+gm8A3UCpKbifvkzS90AAAAASUVORK5CYII=" alt="" class="fillet_img" style="margin-top: 30px;" /> 
		          <li>个人中心</li> 
		          <li @click="goDownList()">下载记录</li> 
		          <li  @click="goCard()">下载卡</li> 
		          <li @click="goCollectionList()">我的收藏</li> 
		          <li @click="goLoginout()">退出登录</li> 
		          <div style="clear: both;"></div>
		         </ul>
		        </div>
				</li>
		      </ul>
		     </div>
			 
			   <div class="nav_right nav_right_head" v-else>
			    <ul class="ul_login ul_login_head">
			     <li @click="goLogin()" class="backColor1 backColor2" >登录</li> 
			     <li @click="goCard()">购买</li>
			    </ul>
			   </div>
			   
		    </div>
		   </div>
		  </div>
	</div>
</template>


<script>
	import { logOut } from "_api/api";
	import Cookies from "js-cookie";
	export default {
	  data(){
	    return {
		  backStyle:{
		  			backgroundImage:
		  			  "url(" + require("@/assets/img/footerB.png") + ")",
		  			backgroundRepeat: "no-repeat",
		  			backgroundSize: "100%"
		  },
		  backStyle2:{
		  			backgroundImage:
		  			  "url(" + require("@/assets/img/footerfloat2.png") + ")",
		  			backgroundRepeat: "no-repeat",
		  			backgroundSize: "100%"
		  },
		 loginState:false,
		 searchValue:''
	    }
	  },
	  methods: {
		  goSearch(){
		  	this.$router.push({ path: '/search', query: { value: this.searchValue}  })
		  },
	    back() {
	      this.$router.go(-1)
	    },
	   goHome(){
		   this.$router.push({
		       path:'/home'
		   })
	   },
	   goDownList(){
	   	this.$router.push({
	   		path:'/downList'
	   	})
	   },
	   goCollectionList(){
	   	this.$router.push({
	   		path:'/collection'
	   	})
	   },
	   goLogin(){
	   	this.$router.push({
	   	    path:'/login'
	   	})
	   },
	   goLoginout(){
	   	let params={
	   		  token:this.userInfo.token,
	   		}
	   	logOut(params).then(res => {
	   	    if(res.code === 1){
	   			this.$router.push({
	   			    path:'/login'
	   			})
	   	    }else{
	   	        this.$message.error(res.msg)
	   	    }
	   	}).catch(err=>{
	   	    console.log(err)
	   	})
	   },
	   goClassify(){
		   this.$router.push({
		       path:'/classify'
		   })
	   },
	   goCard(){
		   this.$router.push({
		       path:'/card'
		   })
	   }
	},
	  created: function () {
	    if (Cookies.get("userInfo")) {
	        this.userInfo = JSON.parse(Cookies.get("userInfo"));
	    	console.log(this.userInfo.token)
	    	this.loginState = true
	    }else{
	    	this.loginState = false
	    }
	  }
	}
</script>

<style>
</style>

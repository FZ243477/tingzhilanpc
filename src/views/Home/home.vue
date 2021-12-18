<template>
	<div>
		<div class="header">
		   <div class="nav_box">
		    <img @click="goWelcome()" src="data:image/png;base64,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" alt="" class="logo_img" /> 
		    <ul class="nav_ul">
		     <li class="nav_li" @click="goWelcome()">首页</li> 
		     <li class="nav_li" @click="goClassify()">分类</li> 
		     <li class="nav_li" @click="goCard()">下载卡</li>
		    </ul> 
		    <div class="p_h_right_box" v-if="loginState">
		     <ul>
		      <li @click="goCard()"><img src="@/assets/img/cardImgb.png" alt="下载卡" /></li> 
		      <li @click="goCollectionList()"><img src="@/assets/img/shoucangImgb.png" alt="收藏夹" /></li> 
		      <li onclick="event.cancelBubble = true" class="menu_li" style="position: relative;">
				  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACCklEQVRIibWWv0scQRzFXy7BM3KFl6hXKd4fcKWd7QUxEbVLEbtrrINVLO+PkGCdYGVlLARNiJhGwS5wuUZJEYXlLBKSg+ALA290csfOzqzeF77M3uz7vs/O3vzYByQRGY8AVFRyAeBvTHkhQvsMwAcAvwB8V5rrHQD1YBczwowcIfmet9El+VXZdfrfkXyc5ZcFe0hyV4YJyVWSJed+SX2JNLuqyQ1ck9E5yapHV5XGxOu8wGGSVzKZDXj1s9J2SBbzAOdlcBAAs3mgmvk0jW+W1tTuR8xkq62lCXzAstpOBNBqy2kCHzBROxkBtNokTeADflG7ELhBFKR1a/vDMwEKJNuaBI2ACdOQtq3aXOtwSSZ/SC56dIvSUDW5F77JprN9bZGsk6wo6+qz0czyC11fm8yOzRCvLMELkqc9qGvtQFe6duNUNdHAUZLbjtE3km9IzvRsW0X1rUtjY1seQcBpki0VXpB85Zt1PbN6heSlalvy8gInnKXwWb9D/2fX49BZIhNpQPO5sSfhRx28sTCbpvaTvPbk3Qe0C9eca+U7wGw+cc7IRi9wyLk5dw8wm8+dQQy5wJe6cXiPMJtH8jaMm015We3bgE06Njb+Y+gpfugpxgYwwnF5GwbM7BnVwXkGYHoAIzRhvKfMwWxeqcnfAE4GBDNxLEbBfuo/BfATQHdAwCKAEoDkH1SUdDJe2JC7AAAAAElFTkSuQmCC" title="个人中心" alt="" style="width: 28px;" />
				  <span class="menu_li_span" style="color: rgb(255, 255, 255);">{{userInfo.nickname}}</span> 
		       <div class="menu" style="padding-top: 25px;">
		        <ul>
		         <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAKCAYAAABblxXYAAAAbklEQVQoka3MvQqAIBSG4erOHRoaRHJwELzM5jcszyD4U9YLDh74ngnovQWwwAHs6d/c9MAZCOSFdB9C49BTzrfgFugqoORqcA20HVCyJbiEmoegZHqofglKuoZug6AU9xm6fgSl6Fyo+gm8A3UCpKbifvkzS90AAAAASUVORK5CYII=" alt="" class="fillet_img" /> 
		         <li >个人中心</li> 
		         <li @click="goDownList()">下载记录</li> 
		         <li>下载卡</li> 
		         <li @click="goCollectionList()">我的收藏</li> 
		         <li @click="goLoginout()">退出登录</li> 
		         <div style="clear: both;"></div>
		        </ul>
		       </div></li>
		     </ul>
		    </div>
			<div class="nav_right" v-else>
			 <ul class="ul_login">
			  <li @click="goLogin()" class="backColor1">登录</li> 
			  <li @click="goCard()">购买</li>
			 </ul>
			</div>
		   </div> 
		   <div class="head_search">
		    <p class="search_p">找餐饮图片就上食图图</p> 
		    <div class="search">
		     <div id="1" class="head_s_1">
		      <div class="search_div1">
		       <span>图片</span> 
		   <!--    <i class="el-icon-caret-bottom  sear_i display_show"></i> -->
		       <i class="el-icon-caret-top  sear_i"></i>
		      </div> 
		   <!--   <div class="search_type">
		       <ul>
		        <li id="1" class="tab_active"> 图片</li>
		        <li id="2" class=""> 视频</li>
		        <li id="3" class=""> 设计</li>
		       </ul>
		      </div> -->
		     </div> 
		     <input type="text" onclick="event.cancelBubble = true" v-model="searchValue" placeholder="输入关键词进行美食图片搜索" class="search_input" /> 
		     <div class="search_r">
		      <img src="@/assets/img/searchimg.png" alt="" @click="goSearch()"/>
		     </div> 
		     <div class="history_search">
		      <div class="_3IdVn">
		       <div class="_33B_z">
		        <span class="_3uCk7">最近搜索</span> 
		        <span class="_25E5a">清除所有</span>
		       </div> 
		       <div class="_3fn9g">
		        <div title="鸡腿" class="_1qv31">
		         <span class="_26rTf">鸡腿</span>
		        </div>
		       </div>
		      </div>
		     </div>
		    </div> 
		    <div class="remenbiaoqian">
		     <span>热门标签:</span> 
		     <span> 酒水</span>
		     <span> 米饭</span>
		     <span> 汉堡</span>
		     <span> 龙虾</span>
		     <span> 简餐便当</span>
		     <span> 西餐</span>
		    </div>
		   </div> 
		   <div class="search_sub"></div> 
		   <div class="lunbo-box">
			<el-carousel >
			  <el-carousel-item v-for="(image, index) in banner" :key="index"  >
				  <img :src="image.cdn_images" alt="轮播图" class="lunbotu" />
			  </el-carousel-item>
			</el-carousel>
				
		   </div>
		  </div>
		  
		  <div class="home_content_1">
		     <div style="padding-top: 60px;"></div> 
		     <div class="content_title" :style="backStyle">
		      热门分类
		     </div> 
		     <div class="content_1">
				 
		      <div class="content_1_box" v-for="(image, index) in classify.slice(0,6)" :key="index" >
		       <div style="width: 390px; height: 290px;" >
		        <img :src="image.pcurl" class="content_1_box_img" />
		       </div> 
		       <div class="content-wrap">
		        <h1 class="entry-title"><a @click="goClassify(image.id)" href="javascript:void(0)" rel="bookmark" class="featured-image">
		          <div class="Dot"></div> {{image.title}} </a></h1>
		       </div>
		      </div>
			  
		      <div style="clear: both;"></div>
		     </div> 
		     <div class="a_more" @click="goClassify()">
		       查看更多 
		     </div>
		    </div>
			
			
			 <div class="home_content_2">
			   <div style="padding-top: 60px;"></div> 
			   <div class="content_title" :style="backStyle2">
			    服务优势
			   </div> 
			   <div align="center" class="content_2">
			    <img src="@/assets/img/home2Img.png" alt="" />
			   </div>
			  </div>
			  
			  <div class="home_content_3">
			     <div style="padding-top: 60px;"></div> 
			     <div class="content_title" :style="backStyle3">
			      合作伙伴
			     </div> 
			     <div class="content_3">
					 
			      <div align="center" class="partner_box"  v-for="(image, index) in partner.slice(0,10)" :key="index" >
			       <img :src="image.images" alt="" />
			      </div>
				  
			    
			      <div style="clear: both;"></div>
			     </div>
			    </div>
				
				 <Footer></Footer>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import { mapState, mapMutations } from 'vuex';
	import Footer from '@/components/Footer.vue'
	import { newIndex, seeMyCollection, userIndex,logOut } from "_api/api";
	export default {
		 components: {
		        Footer
		    },
	  data(){
	    return {
			banner:[],
			backStyle:{
				lineHeight:'35px',
			backgroundImage:
			  "url(" + require("@/assets/img/home1.png") + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "100%"
		  },
		  backStyle2:{
				lineHeight:'35px',
			backgroundImage:
			  "url(" + require("@/assets/img/home2.png") + ")",
			backgroundRepeat: "no-repeat",
			backgroundSize: "100%"
		  },
		  backStyle3:{
		  				lineHeight:'35px',
		  			backgroundImage:
		  			  "url(" + require("@/assets/img/home3.png") + ")",
		  			backgroundRepeat: "no-repeat",
		  			backgroundSize: "100%"
		  },
		  classify:[],
		  partner:[],
		  loginState:false,
		 searchValue:''
	    }
	  },
	 
	  methods: {
		goSearch(){
			this.$router.push({ path: '/search', query: { value: this.searchValue}  })
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
	    back() {
	      this.$router.go(-1)
	    },
		goClassify(e){
			this.$router.push({ path: '/classify', query: { id: e }  })
		},
		goWelcome(){
			this.$router.push({
			    path:'/'
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
		},
		goLogin(){
			this.$router.push({
			    path:'/login'
			})
		},
		goWelcome(){
			this.$router.push({
			    path:'/'
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
		getUserInfo(){
			console.log(this.userInfo.token,888)
			let params={
				  token:this.userInfo.token,
				}
			userIndex(params).then(res => {
			    if(res.code === 1){
					Cookies.set("userInfo", res.data.welcome);
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		},
		getData(){
			newIndex({
			}).then(res => {
			    if(res.code === 1){
				   this.banner = res.data.pcBanner
					this.classify = res.data.classify
				  this.partner = res.data.partner
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		}
	   
	},
	  created: function () {
	    this.getData();
		if (Cookies.get("userInfo")) {
		    this.userInfo = JSON.parse(Cookies.get("userInfo"));
			console.log(this.userInfo)
			this.getUserInfo();
			
			this.loginState = true
		}else{
			this.loginState = false
		}
		
	  }
	}
</script>

<style>
</style>

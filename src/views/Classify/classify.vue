<template>
	<div>
		 <Header></Header>
		 <img src="@/assets/img/80w.jpg" alt="" style="width: 100%; display: block;">
		 <div class="classify_tags">
		    <div class="tags_content">
		     <ul >
				 
		      <li class="tags_select" v-for="(image, index) in classifyList" :key="index" >
		       <div @click="changeListf(image.id)">
		        {{image.title}}
		       </div> 
		       <ul class="tags_child">
		        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAKCAYAAABblxXYAAAAbklEQVQoka3MvQqAIBSG4erOHRoaRHJwELzM5jcszyD4U9YLDh74ngnovQWwwAHs6d/c9MAZCOSFdB9C49BTzrfgFugqoORqcA20HVCyJbiEmoegZHqofglKuoZug6AU9xm6fgSl6Fyo+gm8A3UCpKbifvkzS90AAAAASUVORK5CYII=" alt="" class="fillet_img2" /> 
		        <li class="t_c_li child_select" v-for="(item, index1) in image.childlist" :key="index1" @click="changeList(item.id)">{{item.title}}</li>
		       </ul>
			   </li>
		     </ul>
		    </div>
		   </div>
		   <!-- <i style="color: #999999;" class="iconfont icon-xiangzuojiantou"></i> -->
		     <div class="all_content">
		      <div class="images_content">
		       <div class="waterfall-height-css">
				   
		        <div class="image-box" v-for="(item, index) in imgList" :key="index" >
		         <img :src="item.url" class="water_img" @click="goDetail(item.id)" /> 
		         <div class="popup">
		          <div class="popup_collect" @click="goCollection(item.id)">
		           <i class="iconfont iconClass icon-shoucang"></i>
		          </div> 
		          <div style="height: 10px; width: 10px; float: left;"></div> 
		          <div class="popup_collect" @click="goDown(item.id)">
		           <i class="iconfont iconClass icon-xiazai"></i>
		          </div>
		         </div>
		        </div>
		       </div>
		      </div> 
			  
			   <div align="center" v-show="noPage == true"  class="noSearch">
			   <img src="@/assets/img/noSearch.png" width="50%" alt="">
			   			   
			   </div>
		      <!---->
			  <div class="page" v-show="noPage == false">
			      <ul class="pagesInner">
			        <li @click="prevOrNext(-1)">
			  		  <span class="fa fa-chevron-left" aria-hidden="true">
			  		  <img src="@/assets/img/left.png" alt="">
			  		  </span>
			  	  </li>
			        <li  v-for="(item, index) in pages" :key="index" :class="{actived: item === currentPage}" @click="select(item)">
			          <span>{{item}}</span>
			        </li>
			        <li @click="prevOrNext(1)">
			  			<span class="fa fa-chevron-right" aria-hidden="true">  
			  			<img src="@/assets/img/right.png" alt="">
			  			</span>
			  		</li>
			      </ul>
			    </div>
		     </div>
		
			 
		 <Footer></Footer>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
	import { tagsIndex,classifyImg,collection,download2} from "_api/api";
	export default {
		components: {
			Header,
		    Footer
		   },
	  data(){
	    return {
		  backStyle:{
			  backgroundImage:
				"url(" + require("@/assets/img/wePhone.bb18543.png") + ")",
			  backgroundRepeat: "no-repeat",
			  backgroundSize: "100%"
			},
		currentPage: 1,
		totalPages: 5,
		classifyList:[],
		imgList:[],
		tagsId:82,
		pageSize:20,
		page:0,
		noPage:false,
	}
	  },
	  computed: {
	      pages() {
	        const c = this.currentPage
	        const t = this.totalPages
			if(t == 0 ){
				this.noPage = true
			}else{
				this.noPage = false
			}
	          if (c <= 5) {
					if(t == 6){
						return [1, 2, 3, 4, 5, 6]
					}
					else if(t == 5){
						return [1, 2, 3, 4, 5]
					}else if(t == 4){
						return [1, 2, 3, 4]
					}else if(t == 3){
						return [1, 2, 3]
					}else if( t == 2){
						return [1, 2]
					}else if(t ==1){
						return[1]
					}
	                return [1, 2, 3, 4, 5, 6, 7, 8, 9, '...', t]  //第一种情况
	              } else if (c >= t - 4) {
	                return [1, '...', t-8, t-7, t-6, t-5, t-4, t-3, t-2, t-1, t] //第二种情况
	              } else {
	                return [1, '...', c-3, c-2, c-1, c, c+1, c+2, c+3, '...', t]  //第三种情况
	              }
	      }
	    },
	 methods: {
		select(n) {
			 if (n === this.currentPage) return 
			    if (typeof n === 'string') return 
			    this.currentPage = n
				this.page = this.currentPage 
				this.getImgList()
		    },
			prevOrNext (n) {
			  this.currentPage += n
			  this.currentPage < 1
			  ? this.currentPage = 1
			  : this.currentPage > this.totalPages
			    ? this.currentPage = this.totalPages
			    : null
				this.page = this.currentPage
				this.getImgList()
			},
		changeListf(t){
			
			if(t == 82){
				this.tagsId = 82
				this.page = 0
				this.totalPages = 0
				this.getImgList()
			}else{
				this.tagsId = t
				this.page = 0
				this.totalPages = 0
				this.getImgList()
			}
		},
		change(){
			this.page = 0
			this.totalPages = 0
			console.log(this.tagsId)
			this.getImgList()
		},
		changeList(t){
			this.tagsId = t
			this.page = 0
			this.totalPages = 0
			this.getImgList()
		},
		getImgList(){
			let params={
				  page:this.page,
				  page_size:this.pageSize,
				  tags_id:this.tagsId
				}
			classifyImg(params).then(res => {
			    if(res.code === 1){
					this.currentPage = res.data.current_page
					this.totalPages = res.data.last_page
					this.imgList = res.data.data
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		},
		getData(){
			tagsIndex({
			}).then(res => {
			    if(res.code === 1){
					this.classifyList = res.data
					  this.classifyList.reverse();
				  console.log(this.classifyList,55)
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		},
		goDetail(t){
			this.$router.push({ path: '/detail', query: { id: t }  })
		},
		goCollection(t){
			if (!Cookies.get("userInfo")) {
			    this.$message.error('您还未登录，请先登录！')
				this.$router.push({
				    path:'/login'
				})
			}
			let params={
				  image_id:t,
				 token:this.userInfo.token
				}
			collection(params).then(res => {
				
			    if(res.code == 1){
					 this.$message.success(res.msg)
					
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		},
		goDown(t){
			if (!Cookies.get("userInfo")) {
			    this.$message.error('您还未登录，请先登录！')
				this.$router.push({
				    path:'/login'
				})
			}
			let params={
				  image_id:t,
				 token:this.userInfo.token
				}
			download2(params).then(res => {
				console.log(res)
			    if(res.code == 1002){
					let routeData = this.$router.resolve({
					      path: res.data.url,
					      name: '图片下载',
					     
					    })
					    window.open(routeData.href, '_blank')
					
			    }else{
			        this.$message.error(res.msg)
			    }
			}).catch(err=>{
			    console.log(err)
			})
		}
	},
	  created: function () {
		  let params = {
		         id: this.$route.query.id
		       };
		this.tagsId = params.id
		this.change()	
	    this.getData();
		if (Cookies.get("userInfo")) {
		    this.userInfo = JSON.parse(Cookies.get("userInfo"));
		}
	  }
	}
</script>

<style>
	.iconClass:hover{
		color: rgb(0, 158, 251);
	}
	/*分页*/
	.page-bar{
	margin:40px auto;
	margin-top: 150px;
	
	}
	ul,li{
	margin: 0px;
	padding: 0px;
	}
	li{
	list-style: none
	}
	.page-bar li:first-child>a {
	margin-left: 0px
	}
	.page-bar a{
	border: 1px solid #ddd;
	text-decoration: none;
	position: relative;
	float: left;
	padding: 6px 12px;
	margin-left: -1px;
	line-height: 1.42857143;
	color: #5D6062;
	cursor: pointer;
	margin-right: 20px;
	}
	.page-bar a:hover{
	background-color: #eee;
	}
	.page-bar a.banclick{
	cursor:not-allowed;
	}
	.page-bar .active a{
	color: #fff;
	cursor: default;
	background-color: #E96463;
	border-color: #E96463;
	}
	.page-bar i{
	font-style:normal;
	color: #d44950;
	margin: 0px 4px;
	font-size: 12px;
	}
	
	 
</style>

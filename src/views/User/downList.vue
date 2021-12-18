<template>
	<div >
		<div style="background-color: rgb(245, 245, 245);">
			<Header></Header>
			  <div   class="records_content">
				<div   align="center" class="records_left">
				 <img   src="https://image.shitutu.com/uploads/20210811/4b65bd65e7ad7e0f53cefc2e57fac98f.png" alt="" class="head_portrait" /> 
				 <div   class="person_id">
				   18891948754 
				 </div> 
				 <div   class="person_level">
				  普通用户
				 </div> 
				 <div   class="records_solid"></div> 
				 <div   class="records_nav">
				  <ul  >
				   <li  class="records_nav_select"><img  src="@/assets/img/xia2.png" alt="" /> <span  >下载记录</span></li> 
				   <li  @click="goCollectionList()"><img   src="@/assets/img/star1.png" alt="" /> <span  >我的收藏</span></li> 
				   <li  ><img src="@/assets/img/shezhi1.png" alt="" /> <span  >个人设置</span></li>
				  </ul>
				 </div>
				</div> 
				
				 <div class="records_right">
					 <div class="records_right">
					   <div  class="records_right_content">
					    <div  class="records_right_title">
					     下载记录({{total}})
					    </div> 
					    <div    class="records_right_solid"></div> 
						
						<div class="records_right_message">
						   <div align="center" class="records_right_message_box">
						    <img src="@/assets/img/xialan.png" alt="" /> 
						    <span style="margin-left: 16px;">剩余下载次数 <span style="color: rgb(0, 158, 251);">{{userInfo.free_download_num}}张</span></span>
						   </div> 
						   <div align="center" class="records_right_message_box">
						    <img src="@/assets/img/linhong.png" alt="" /> 
						    <span style="margin-left: 16px;">已下载次数 <span style="color: rgb(0, 158, 251);">{{userInfo.download_num}}张</span></span>
						   </div>
						  </div>
						  
					    <div    class="images_content" style="width: 100%;">
					     <div    class="waterfall-height-css">
							 
					      <div    class="image-box" v-for="(item, index) in imgList" :key="index">
					       <img @click="goDetail(item.images_id)"   :src="item.url" />
					      </div>
					     </div>
					    </div> 
					  <div class="page" >
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
					  </div>
				</div>
			</div>
			 <Footer></Footer>
		</div>
		
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import { seeMyBought} from "_api/api";
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'
	export default {
		components: {
			Header,
		    Footer
		   },
	  data(){
	    return {
		  backStyle:{
		              backgroundImage:
		                "url(" + require("@/assets/img/cardB.png") + ")",
		              backgroundRepeat: "no-repeat",
		              backgroundSize: "100%"
		            },
			currentPage: 1,
			totalPages: 5,
			imgList:[],
			tagsId:82,
			pageSize:20,
			page:0,
			total:0
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
	    back() {
	      this.$router.go(-1)
	    },
		goCollectionList(){
			this.$router.push({
				path:'/collection'
			})
		},
		goDetail(t){
			this.$router.push({ path: '/detail', query: { id: t }  })
		},
	   getData(){
		   let params={
		   	  page:this.page,
			   page_size:this.pageSize,
		   	  token:this.userInfo.token,
		   	}
		   seeMyBought(params).then(res => {
		       if(res.code === 1){
		   		this.currentPage = res.data.current_page
		   		this.totalPages = res.data.last_page
		   		this.imgList = res.data.img
				this.total = res.data.total
		       }else{
		           this.$message.error(res.msg)
		       }
		   }).catch(err=>{
		       console.log(err)
		   })
	   }
	},
	  created: function () {
	    if (Cookies.get("userInfo")) {
	        this.userInfo = JSON.parse(Cookies.get("userInfo"));
			console.log(this.userInfo)
	    }
		this.getData()
	  }
	}
</script>

<style>
</style>

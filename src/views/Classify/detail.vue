<template>
	<div>
		<Header></Header>
		<div   style="background-color: rgb(245, 245, 245);">
		   <div   class="detail_content">
		    <div   align="center" class="detail_img disFlex">
		     <img   alt="" :class="{ 'moreWidth': moreWidthState == true, 'moreHeight': moreWidthState == false }"  :src="imgDetail.image_url" />
		    </div> 
		    <div   class="d_c_right">
		     <p   class="d_c_p">{{imgDetail.title}}</p> 
		     <p   class="d_c_p2">购买下载卡即可享受海量下载，低至每天0.14元</p> 
		     <div   class="d_c_messsage" :style="backStyle">
		      <ul  >
		       <li  >图片编号：{{imgDetail.uuid}}</li> 
		       <li  >购买授权：图片版权授权期为自下载之日起一年</li> 
		       <li  >授权范围：<span   style="color: rgb(0, 157, 251);">可做商用、个人</span></li> 
		       <li  >版权所有：食图图</li> 
		       <li  >图片类型：jpg{{imgWidth}}x{{imgHeight}}</li>
		      </ul>
		     </div> 
		     <div   class="d_c_three">
		      <div   class="d_c_down" @click="goDown(imgDetail.id)">
		        高清无水印下载 
		      </div> 
		      <div   class="detail_collection" style="width: auto; float: left;" @click="goCollection(imgDetail.id)" >
		       <img   src="@/assets/img/collectionStar.png" alt="" />
		      </div>
		     </div> 
		     <div   class="d_c_four">
		      <ul  >
		       <li>分享：<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAACG0lEQVQ4jY3VTYhOYRTA8d+8vguJssFCpAwbKcZHIxaakjUzSUiRJLGwwZgNM4uRJokNVgzrsVE+X2nQjJSoIYkiNYpiMTTSo3N153pnrlO32z0f/+ec8zzPuXXt7e1GkZXYinVYgOn4ije4h248qhU6voauHmexHk/Qg+f4ghlYiiYcxB3sx4uxoM24iH6sQm+NRa/jOBrQiT7swtXMoVIAXkEXGkcB5qU3/LoirrkIrY8MO3AEw6Gvwzbcil5Wo9yswuHw74j4+j9BsVG3MSlWzgOT444aWd7EZvyI73G4jyFsqERv0qYcyAGzdtQCJtmIQ7nv4YhPnIYEbcHjaHhetpf0tLhgX3BaKlFyT42geSXQuTV0idOYoIuK5yz6W1cC/Y4pBd3LxKuE4XPBeBqLS6CzcbKgG0y8SuzYzJxhGnaXADPZG/6ZJM5Qgg5gSc4wHxP/Ezo5/DNJnIFKHOimQgm/8LYE+CmO0mBOlzjVSkyb1VgWhg9RxuES6CnMCn8RnzjdWaYPYzhkO57e10qgZzAn598ZnGp29/dhDVrjO425dH/f42MAlqMN70J3Hq/CvzXiE+fvYHiGPbgUq57AsXjy0h82uQzbYhTuDM6IeXo53hfilqW7/XSM8lMP03lOfUzALP6fIZ0MCXQusnqAGzH5v2FqTP5NWBs9XJFlOBo0a0XqT/o3bYnBshAT8BOvcRdH4181UvAbt095ApuO3gsAAAAASUVORK5CYII=" alt="" /></li> 
		       <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAABpklEQVQ4ja2Vz0qCQRTFfw4uDHqJRHe6SGhTQrYyXyAiqGhh2LancNWmjdBCKhDfQN25EDdBBLUJIV+gvS0E48L5RIZvvgg9m4GZe8/cuX/OpJrNJgGUgTOgAuSBNDAHJsAQ6ACjONd0zF4RaAH7wBToAffADNgCCkANuAHGQAN4TyI9Bx6ALzkOgEXMxSmgCtwBL0AdeI4OnUf4BHSBEtAPEKL9vuy68jv3Iy0qwkfgKoHMx4/skf+bpSKKtKUnNwKEORUnF4i6If9WFGlZRanp5jhsA4daQxHfqqhlp7aZqijrYCCeM6c+7P0jjyEsxFNxauyPNQkjGE/eKa+zDZEaT9pp9LY2RGo8c6dZLmyI1HgmTv1X0+iF8Ansag0hJZ6hk9rsaJZDMLsTb6x9VMXTcZKvscQhk5CrUkLuM/I3nlF0s41ZVmMWl4Zv4Firj5T8suJZPudd8nUJtBMijouwLb96pKurOTI9vABOgVdFFiqe7du52Zm9+S311BdpOzD5sufYyEXKb5PiK78VxXK495fyR6k4WPmjjoBr748ygY7/o4Bfn8RkXWuCwk0AAAAASUVORK5CYII=" alt="" />&nbsp;举报</li>
		      </ul>
		     </div>
		    </div>
		   </div> 
		   <div   class="images_content">
		    <div   class="like_p">
		     相似图片
		    </div> 
		    <div   class="waterfall-height-css">
				
		     <div   class="image-box" v-for="(item,index) in imgDetail.recommend" :key="index">
		      <img   :src="item.url"  @click="goDetail(item.id)"/>
		     </div>
			 
		     
		    </div>
		   </div>
		  </div>
		 <Footer></Footer>
	</div>
</template>

<script>
	import Cookies from "js-cookie";
	import { seeImageDetail,collection,download2} from "_api/api";
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
		                "url(" + require("@/assets/img/detailB.png") + ")",
		              backgroundRepeat: "no-repeat",
		              backgroundSize: "100%"
		            },
			imageId:'1',
			imgDetail:'',
			imgWidth:'',
			imgHeight:'',
			moreWidthState:false,
			details_id: "",
	    }
	  },
	   watch: {
	          details_id(v, o) {
	              let params = {
	                  id: this.$route.query.id
	              };
	            if (Cookies.get("userInfo")) {
	                this.userInfo = JSON.parse(Cookies.get("userInfo"));
	            }
				this.imageId = params.id
	            this.getData()
	          }
	      },
	  methods: {
	    back() {
	      this.$router.go(-1)
	    },
		goDetail(t){
		
			this.details_id = t;
			this.$router.push({ path: '/detail', query: { id: t }  })
		},
	   getData(){
		  
		   let params={
		   	  id:this.imageId,
		   	  token:this.userInfo.token,
		   	}
		   seeImageDetail(params).then(res => {
		       if(res.code === 1){
				   this.imgDetail = res.data
					this.getImgInfo()
		       }else{
		           this.$message.error(res.msg)
		       }
		   }).catch(err=>{
		       console.log(err)
		   })
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
	   },
	      getImgInfo () {
	           var that = this;
	           var img = new Image();
	           img.src = that.imgDetail.image_url;
	           let res = {}
	           img.onload = function () {
	             res = {
	               width: img.width,
	               height: img.height
	             }
				 if(res.width > res.height){
					 that.moreWidthState = true
				 }else{
					 that.moreWidthState = false
				 }
	             that.imgWidth = res.width
	             that.imgHeight = res.height
	           }
	         },
	},
	  created: function () {
	    let params = {
	           id: this.$route.query.id
	         };
		this.imageId = params.id
	
		if (Cookies.get("userInfo")) {
		    this.userInfo = JSON.parse(Cookies.get("userInfo"));
		}
		
		this.getData()
	  }
	}
</script>

<style>
</style>

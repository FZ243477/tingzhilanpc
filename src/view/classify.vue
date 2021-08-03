<template>
    <div  @click="changeTab2">
            <Header ref="child" />
        <img style="width: 100%;display: block;" src="@/assets/img/classify/banner.jpg" alt="">
        <div class="classify_tags">
            <div class="tags_content">
                <ul >
                    <!--<li  >热门图片</li>-->
                    <li class="tags_select" :class="{'tags_hover':chooseId == tag.id}"  v-for="tag in tags"  >
                        <div @click="selectId(tag.id)">{{tag.title}}</div>
                        <ul class="tags_child" :class="{'display_show':chooseId == tag.id}" v-if="tag.childlist != ''">
                            <img class="fillet_img2" src="@/assets/img/home/fillet.png" alt="">
                            <li class="t_c_li child_select" @click="selectChild(tagChild.id)" v-for="tagChild in tag.childlist">{{tagChild.title}}</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="all_content">
        <div class="images_content">
            <div class="waterfall-height-css">
                <div class="image-box" v-for="img in imgList" :key="img.img">
                    <img :src="img.url" class="water_img" @click="goDetail(img.id)"/>
                    <div class="popup">
                        <div class="popup_collect" @click="addCollection(img.id)" ><i class="iconfont icon-shoucang"></i></div>
                        <div style="height: 10px;width: 10px;float: left"></div>
                        <div class="popup_collect" ><i @click="download2(img.id)" class="iconfont icon-xiazai-"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="page" v-if="currentPage > 1">
            <ul>
                <li @click="prevOrNext(-1)"><i class="iconfont icon-web__jiantou_zuo" STYLE="color: #999999;"></i></li>
                <li v-for="(item,index) in pages" :key="index"  :class="{actived: item === currentPage}"
                    @click="select(item)" >{{item}}</li>
                <li @click="prevOrNext(1)"><i class="iconfont icon-jiantou-you" STYLE="color: #999999;"></i></li>
                <div style="clear: both;"></div>
            </ul>
        </div>
        </div>
        <Footer />
    </div>
</template>
<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import { mapState, mapMutations } from "vuex";
  export default {
    components: {
      Header,
      Footer,
    },
    data(){
      return {
        tags:[],
        imgList:[],
        tagsId:0,
        chooseId:0,
        pageNum:1,
        page_size:20,
        currentPage:1,
        totalPages:50,
        params: {
          id:"",
        },
      }
    },
    computed: {
      ...mapState(["userInfo"]),
      pages() {
        const c = this.currentPage
        const t = this.totalPages
        if (c <= 5 ) {
          if(t <= 10){
            var arr = []
            for (var i = 1; i <= t; i++) {
              var obj = {}
              obj = i
              arr.push(obj)
            }
            return arr
          }
          else{
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, '...', t]
          }
        }else if (c >= t - 4) {
          return [1, '...', t-8, t-7, t-6, t-5, t-4, t-3, t-2, t-1, t]
        }else{
          return [1, '...', c-3, c-2, c-1, c, c+1, c+2, c+3, '...', t]  //第三种情况
        }
      }
      },
    watch: {
      '$route' (to, from) {
        location.reload();
        // 对路由变化作出响应...
      },
    },
    methods: {
      ...mapMutations({
        setUserInfo : 'SET_USERINFO'
      }),
      addCollection(i){
        if(!this.userInfo){
          this.$toast('您还未登陆，请先登陆')
          window.setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 500);
          return
        }
        let param = new FormData() // 创建form对象
        param.append('image_id',i) // 通过append向form对象添加数据
        param.append('token', this.userInfo.token) // 添加form表单中其他数据
        this.$axios.post(this.$api.collection,param).then(res=>{
            if(res.data.code ==1){
              this.$toast(res.data.msg)
            }
            if(res.data.code ==2){
              this.$toast(res.data.msg)
            }else{
            }
          })
      },
      download2(i){
        if(!this.userInfo){
          this.$toast('您还未登陆，请先登陆')
          window.setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 500);
          return
        }
        let param = new FormData() // 创建form对象
        param.append('image_id',i) // 通过append向form对象添加数据
        param.append('token', this.userInfo.token) // 添加form表单中其他数据
        this.$axios.post(this.$api.download2,param).then(res=>{
          if (res.data.code == 1002) {
            window.location.href = res.data.data.url;
          }
          else if(res.data.code ==0){
            this.$toast(res.data.msg)
          }else{
            this.$toast('系统错误！')
          }
        })
      },
      goDetail(i){
        this.$router.push("/detail?id=" + i);
      },
      selectId(n){
        this.$router.push("/classify?id=" + n);
      },
      selectChild(n){
        this.$router.push("/classify?id=" + n);
        this.chooseId = 0;
        this.tagsId = n
        this.$axios.post(this.$api.images,{
          tags_id: this.tagsId,
          page: 0,
          page_size: this.page_size
        })
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.data
              this.totalPages = res.data.data.last_page
            }else{
            }
          })
      },
      select(n) {
        if (n === this.currentPage) return
        if (typeof n === 'string') return
        this.currentPage = n
        this.$axios.post(this.$api.images,{
          tags_id: this.tagsId,
          page: this.currentPage,
          page_size: this.page_size
        })
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.data
            }else{

            }
          })
      },
      prevOrNext (n) {
        this.currentPage += n
        this.currentPage < 1
          ? this.currentPage = 1
          : this.currentPage > this.totalPages
          ? this.currentPage = this.totalPages
          : null
        this.$axios.post(this.$api.images,{
          tags_id: this.tagsId,
          page:this.currentPage,
          page_size: this.page_size
        })
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.data
            }else{
            }
          })
      },
      changeTab2(){
        this.$refs.child.menuShow = false;
        this.$refs.child.navShow = false;
      },
      getData() {
        let query = this.$route.query;
        this.params.id = query.id;
        if(query){
          this.tagsId = this.params.id
          this.chooseId = this.params.id
        }
        this.$axios.post(this.$api.tags)
          .then(res=>{
            if(res.data.code ==1){
              this.tags = res.data.data.reverse();
            }else{
            }
          })
        this.$axios.post(this.$api.images,{
          tags_id: this.tagsId,
          page: this.pageNum,
          page_size: this.page_size
        })
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.data
              this.totalPages = res.data.data.last_page
            }else{
            }
          })
      }
    },
    created: function () {
      this.getData();
      if(this.userInfo){
        console.log(this.userInfo,'classify')
      }
    }
  }
</script>
<style lang="scss" scoped>
    .waterfall-height-css {
        display: flex;
        flex-wrap: wrap;
        .image-box {
            position: relative;
            margin: 5px;
            flex-grow: 1;
        }
        .water_img {
            display: block;
            min-width: 100%;
            height: 300px;
            object-fit: cover;
        }
    }
</style>

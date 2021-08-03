<template>
    <div @click="changeTab2" style="background-color: #f5f5f5;">
        <Header ref="child"/>
        <div class="records_content">
            <div class="records_left" align="center">
                <img :src="userInfo.avatar" class="head_portrait" alt="">
                <div class="person_id">
                    {{userInfo.mobile}}
                </div>
                <div class="person_level">普通用户</div>
                <div class="records_solid"></div>
                <div class="records_nav">
                    <ul>
                        <li class="records_nav_select">
                            <img src="@/assets/img/records/downHover.png" alt="">
                            <span>下载记录</span>
                        </li>
                        <li @click="goCollection">
                            <img src="@/assets/img/records/collection.png" alt="">
                            <span>我的收藏</span>
                        </li>
                        <li @click="goUser">
                            <img src="@/assets/img/records/set.png" alt="">
                            <span>个人设置</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="records_right">
                <div class="records_right_content">
                    <div class="records_right_title">下载记录({{userInfo.download_num}})</div>
                    <div class="records_right_solid"></div>
                    <div class="records_right_message">
                        <div class="records_right_message_box" align="center">
                            <img src="@/assets/img/records/download2.png" alt="">
                            <span style="margin-left: 16px;">剩余下载次数 <span style="color: #009EFB">{{userInfo.free_download_num}}张</span></span>
                        </div>
                        <div class="records_right_message_box" align="center">
                            <img src="@/assets/img/records/download.png" alt="">
                            <span style="margin-left: 16px;">已下载次数 <span style="color: #009EFB">{{userInfo.download_num}}张</span></span>
                        </div>
                    </div>
                    <div class="images_content" style="width: 100%;">
                        <div class="waterfall-height-css">
                            <div class="image-box" v-for="img in imgList" :key="img.img">
                                <img :src="img.url" @click="goDetail(img.image_id)" />
                            </div>
                        </div>


                    </div>
                    <div class="page" v-if="imgList.length != 0">
                        <ul>
                            <li @click="prevOrNext(-1)"><i class="iconfont icon-web__jiantou_zuo" STYLE="color: #999999;"></i></li>
                            <li v-for="(item,index) in pages" :key="index"  :class="{actived: item === currentPage}"
                                @click="select(item)" >{{item}}</li>
                            <li @click="prevOrNext(1)"><i class="iconfont icon-jiantou-you" STYLE="color: #999999;"></i></li>
                            <div style="clear: both;"></div>
                        </ul>
                    </div>
                    <div class="noSearch" align="center" v-else>
                        <img src="@/assets/img/records/empty.png" alt="">
                        <p  class="no_search_p">当前没有下载记录 </p>
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
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
      Footer
    },
    data(){
      return {
        imgList:[],
        pageNum:1,
        page_size:10,
        currentPage:1,
        totalPages:50,
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
    methods: {
      ...mapMutations({
        setUserInfo : 'SET_USERINFO'
      }),
      goDetail(i){
        this.$router.push("/detail?id=" + i);
      },
      goCollection(){
        this.$router.push({ path: "/collection" });
      },
      goUser(){
        this.$router.push({ path: "/userInfo" });
      },
      changeTab2(){
        this.$refs.child.menuShow = false;
        this.$refs.child.navShow = false;
      },
      select(n) {
        if (n === this.currentPage) return
        if (typeof n === 'string') return
        this.currentPage = n
        let param = new FormData() // 创建form对象
        param.append('token',this.userInfo.token)
        param.append('page',this.currentPage)
        param.append('page_size',this.page_size)
        this.$axios.post(this.$api.seeMyBought,param)
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.img
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
        let param = new FormData() // 创建form对象
        param.append('token',this.userInfo.token)
        param.append('page',this.currentPage)
        param.append('page_size',this.page_size)
        this.$axios.post(this.$api.seeMyBought,param)
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.img
            }else{
            }
          })
      },
      getData(){
        let param = new FormData() // 创建form对象
        param.append('token',this.userInfo.token)
        param.append('page',this.pageNum)
        param.append('page_size',this.page_size)
        this.$axios.post(this.$api.seeMyBought,param).then(res=>{
          if(res.data.code == 1){
            this.imgList = res.data.data.img
            this.totalPages = res.data.data.last_page
            console.log(this.totalPages)
          }
        })
      }
    },
    created: function () {
        this.getData();
    }
  }
</script>
<style lang="scss" scoped>
    .waterfall-height-css {
        display: flex;
        flex-wrap: wrap;
        .image-box {
            margin: 5px;
            flex-grow: 1;
        }
        img {
            display: block;
            min-width: 100%;
            height:200px !important;
            object-fit: cover;
        }
    }
</style>

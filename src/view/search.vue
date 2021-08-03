<template>
    <div  @click="changeTab2">
        <Header ref="child" />
        <div class="images_content">
            <div class="search_words">
                搜索关键词： <span style="color: #009EFB;">{{params.keyword}}</span> 共 <span style="color: #009EFB;">{{total}}</span> 张
            </div>
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
        <div class="page" style="margin-bottom: 30px;" v-if="imgList.length > 0">
            <ul>
                <li @click="prevOrNext(-1)"><i class="iconfont icon-web__jiantou_zuo" STYLE="color: #999999;"></i></li>
                <li v-for="(item,index) in pages" :key="index"  :class="{actived: item === currentPage}"
                    @click="select(item)" >{{item}}</li>
                <li @click="prevOrNext(1)"><i class="iconfont icon-jiantou-you" STYLE="color: #999999;"></i></li>
                <div style="clear: both;"></div>
            </ul>
        </div>
        <div class="noSearch" align="center" v-else>
            <img src="@/assets/img/search/noSearch.png" alt="">
            <p  class="no_search_p">找不到图片？联系客服17794558879（微信）或提交您的需求，我们尽快为您研发上传 </p>
            <div class="no_search_div" @click="ToRequirements">提交您的需求</div>
        </div>
        <Footer />
        <div class="requirements_shadow" ref="homePage" :id="dis_requ" @click="ToRequirements">
            <div class="requirements demand-wrapper-commit" onClick="event.cancelBubble = true">
                <div class="requirements_title">提交您的需求</div>
                <!--<input type="textarea" placeholder="请输入您的需求......" class="input_textarea" >-->

                    <input v-model="message_name" type="text"  class="input_text" placeholder="请留下您的姓名......" />
                    <input v-model="message_phone" type="text"  class="input_text" placeholder="请留下您的电话......" />
                    <textarea v-model="message" type="textarea" rows="8" cols="80" class="input_textarea"  placeholder="请输入您的需求......" >
                    </textarea>
                <a href="#" style="margin-top: 30px" @click="submitDemand" class="down_img">提交</a>
            </div>
        </div>
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
        pageNum:1,
        page_size:20,
        currentPage:1,
        totalPages:50,
        total:0,
        params: {
          keyword: "",
          page: 0,
          count:0,
          page_size: 15,
        },
        clientHeight:'',
        requirements:false,
        message_name:'',
        message_phone:'',
        message:'',
        dis_requ:'dis_requ',
      }
    },
    mounted(){
      window.addEventListener("scroll", this.handleScroll, true);
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
    },
    watch: {
      '$route' (to, from) {
        location.reload();
        // 对路由变化作出响应...
      },
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
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
      changeFixed(clientHeight){                        //动态修改样式
        //console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight+'px';
      },
      ToRequirements(){
        if(!this.userInfo.id){
          this.$toast("请先登录账号");
          this.$router.push({ path: "/login" });
        }
        if(this.requirements ==false){
          this.dis_requ = "dis_requ_show";
          this.requirements =true
        }else{
          this.dis_requ = "dis_requ";
          this.requirements =false
        }
      },
      submitDemand() {
        if (!this.message_name) {
          this.$toast("请填写名称");
          return;
        }
        if (!this.message_phone) {
          this.$toast("请先填写电话");
          return;
        }
        if (!this.message) {
          this.$toast("请先填写需求");
          return;
        }
        let param = new FormData() // 创建form对象
        param.append('user_id', this.userInfo.id) // 添加form表单中其他数据
        param.append('user_name', this.userInfo.username) // 添加form表单中其他数据
        param.append('name', this.message_name) // 添加form表单中其他数据
        param.append('phone', this.message_phone) // 添加form表单中其他数据
        param.append('content', this.message) // 添加form表单中其他数据
        this.$axios.post(this.$api.feedback,param).then(res=>{
          if(res.data.code ==1){
            this.requirements =false
            this.dis_requ = "dis_requ";
            this.$toast("提交成功")
            this.message = "";
          }else{
            this.requirements =false
            this.dis_requ = "dis_requ";
            this.$toast(res.data.msg)
          }
        })
      },
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
      selectChild(n){
        this.$router.push("/classify?id=" + n);
        this.tagsId = n
        this.$axios.post(this.$api.searchImg,{
          keyword: this.params.keyword,
          page: 0,
          page_size: this.page_size
        })
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.data
              this.totalPages = res.data.data.last_page
              this.total = res.data.data.total
            }else{
            }
          })
      },
      select(n) {
        if (n === this.currentPage) return
        if (typeof n === 'string') return
        this.currentPage = n
        this.$axios.post(this.$api.searchImg,{
          keyword: this.params.keyword,
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
        this.$axios.post(this.$api.searchImg,{
          keyword: this.params.keyword,
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
        this.params.keyword = query.value;
        this.$axios.post(this.$api.searchImg,{
          keyword: this.params.keyword,
          page: this.pageNum,
          page_size: this.page_size
        })
          .then(res=>{
            if(res.data.code ==1){
              this.imgList = res.data.data.data
              this.totalPages = res.data.data.last_page
              this.total = res.data.data.total
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
            height: 200px;
            object-fit: cover;
        }
    }
</style>

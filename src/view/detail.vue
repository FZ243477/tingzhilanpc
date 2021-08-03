<template>
    <div @click="changeTab2">
        <Header ref="child"/>
    <div style="background-color: #f5f5f5">
        <div class="detail_content">
            <div class="detail_img" align="center" :class="{disFlex: isA==true}" >
                <img :src="imgDetai.image_url" :class="{moreHeight: isB==true,moreWidth: isA==true}" @click="enlargeImg"  alt="">
            </div>
            <div class="d_c_right">
                <p class="d_c_p">{{imgDetai.title}}</p>
                <p class="d_c_p2">购买下载卡即可享受海量下载，低至每天0.14元</p>
                <div class="d_c_messsage" :style='backBorderc'>
                    <ul>
                        <li>图片编号：{{imgDetai.uuid}}</li>
                        <li>购买授权：图片版权授权期为自下载之日起一年</li>
                        <li>授权范围：<span style="color: #009DFB;">可做商用、个人</span></li>
                        <li>版权所有：食图图</li>
                        <li>图片类型：jpg{{wid}}*{{hei}}</li>
                    </ul>
                </div>
                <div class="d_c_three">
                    <div @click="download2(imgDetai.id)" class="d_c_down">
                        高清无水印下载
                    </div>
                    <div style="width: auto;float: left" class="detail_collection" @mouseenter="enter()" @mouseleave="leave()">
                    <img @click="addCollection(imgDetai.id)" v-if="(seen == false)"  src="@/assets/img/detail/collection.png" alt="">
                    <img @click="addCollection(imgDetai.id)" v-else="" title="收藏" src="@/assets/img/detail/collectionHover.png" alt="">
                    </div>
                </div>

                <div class="d_c_four">
                    <ul>
                        <li>分享：<img @click="goShareQq" src="@/assets/img/detail/qq.png" alt=""></li>
                        <!--<li  ><img @click="goShareWx" src="@/assets/img/detail/wechat.png"  alt=""></li>-->
                        <li @click="goReport" ><img src="@/assets/img/detail/report.png" alt="">&nbsp;举报</li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="images_content">
            <div class="like_p">相似图片</div>
            <div class="waterfall-height-css">
                <div class="image-box" v-for="img in imgList" :key="img.img">
                    <img :src="img.url" @click="goDetail(img.id)" />
                </div>
            </div>
        </div>
    </div>
        <Footer />
        <div ref="homePage" class="requirements_shadow" :id="dis_requ" @click="goReport">
            <div class="report_box_content"  onClick="event.cancelBubble = true">
                <div class="requirements_title">举报</div>
                <ul class="report_box">
                    <li v-for="(item,index) in cities"
                        :class="{checked:item.bOn}"
                        @click="checkbox(index)" v-model="item.bOn">{{item.title}}</li>
                </ul>
                <textarea v-model="message" type="textarea"  class="input_textarea"  placeholder="请输入举报内容" ></textarea>
                <div  style="margin-top: 0.6rem" @click="submitReport" class="down_img">提交</div>
            </div>
        </div>
        <div ref="homePage2" class="requirements_shadow" :id="dis_requ2" @click="enlargeImg" >
            <div class="enlarge_box" align="center" onClick="event.cancelBubble = true">
                <img :src="imgDetai.image_url" class="enlarge_box_img" :class="{moreHeight: isB==true,moreWidth: isA==true}" alt="">
                <img class="enlarge_cuowu" src="@/assets/img/detail/cuowu.png" @click="enlargeImg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import { mapState, mapMutations } from "vuex";
  import wx from 'weixin-js-sdk'
  export default {
    components: {
      Header,
      Footer
    },
    data(){
      return {
        backBorderc:{
          backgroundImage:
            "url(" + require("@/assets/img/detail/borderc.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        params: {
          id:"",
        },
        imgDetai:'',
        imgList:[],
        wid:0,
        hei:0,
        isA: false,  //当isA改变时，将更新class
        isB: false,    //当isB改变时，将更新class
        clientHeight:'',
        requirements:false,
        requirements2:false,
        dis_requ:'dis_requ',
        dis_requ2:'dis_requ',
        cities : [
          {title:"图片损坏",bOn:true},
          {title:"图片模糊",bOn:false},
          {title:"侵权/盗版",bOn:false},
          {title:"图片重复",bOn:false},
          {title:"下载失败",bOn:false},
          {title:"色情低俗",bOn:false},
          {title:"其他原因",bOn:false},
        ],
        message:'',
        seen:false,
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
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    methods: {
      ...mapMutations({
        setUserInfo : 'SET_USERINFO'
      }),
      enter(){
        this.seen = true;

      },
      leave(){
        this.seen = false;
      },
      checkbox(i){
        this.cities[i].bOn = !this.cities[i].bOn;
      },
      changeFixed(clientHeight){
        this.$refs.homePage.style.height = clientHeight+'px';
        this.$refs.homePage2.style.height = clientHeight+'px';
      },
      goDetail(i){
        this.$router.push("/detail?id=" + i);
      },
      enlargeImg(){
        if(this.requirements2 ==false){
          this.dis_requ2 = "dis_requ_show";
          this.requirements2 =true
        }else{
          this.dis_requ2 = "dis_requ";
          this.requirements2 =false
        }
      },
      goShareQq(){
        window.location.href = ' http://connect.qq.com/widget/shareqq/index.html?url=shitutu.com&sharesource=qzone&title=食图图'
      },
      goReport(){
        if(!this.userInfo){
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
      submitReport(){
        var list = [];
        for(var i = 0; i < this.cities.length; i++){
          if( this.cities[i].bOn === true){
            list.push(this.cities[i])
          }
        }
        if(!list || list == ''){
          this.requirements =false
          this.dis_requ = "dis_requ";
          this.$toast("请选择举报原因");
          return;
        }
        if (!this.message) {
          this.requirements =false
          this.dis_requ = "dis_requ";
          this.$toast("请填写举报原因");
          return;
        }
        let param = new FormData() // 创建form对象
        param.append('user_id', this.userInfo.id) // 添加form表单中其他数据
        param.append('user_name', this.userInfo.username) // 添加form表单中其他数据
        param.append('message', this.message) // 添加form表单中其他数据
        param.append('report_cate',JSON.stringify(list)) // 添加form表单中其他数据
        this.$axios.post(this.$api.reportSave,param).then(res=>{
          if(res.data.code ==1){
            this.requirements =false
            this.dis_requ = "dis_requ";
            this.$toast("提交成功")
            this.message = "";
          }
          if(res.data.code ==2){
            this.requirements =false
            this.dis_requ = "dis_requ";
            this.$toast(res.data.msg)
          }else{
            this.requirements =false
            this.dis_requ = "dis_requ";
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
      changeTab2(){
        this.$refs.child.menuShow = false;
          this.$refs.child.navShow = false;
      },
      getData(){
        this.$axios.post(this.$api.reportCate).then(res=>{
          if(res.data.code ==1){
            this.cities = res.data.data
          }else{
          }
        })
      },
      goShareWx(){
        let that=this;
        this.$axios.post(this.$api.ticketSignature).then(res=>{
          if(res.data.code ==1){
            console.log(res)
            wx.config({
              debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.appId, //必填，公众号的唯一标识
              timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.signature, // 必填，签名
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });
            //拼接当前地址
            let shareUrl=window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1];
            shareUrl = shareUrl.split('#')[0] + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(shareUrl);

            wx.ready(function () {
              //分享给朋友
              wx.onMenuShareAppMessage({
                title:'菜品图库',
                desc:'80万张美食图片等你来拿',
                link: shareUrl,
                imgUrl:'http://v.shitutu.com/static/img/about.e8bd1f1.png',
                success: function (res) {
                  alert('分享成功！');
                },
                cancel:function(res){
                  alert('分享失败！');
                }
              })
              //分享到朋友圈
              wx.onMenuShareTimeline({
                title: that.fenxi_title,
                link: shareUrl,
                imgUrl: that.fenxi_img,
                success: function (res) {
                  alert('分享成功！');
                },
                cancel:function(res){
                  alert('分享失败！');
                }
              })
            });
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      //微信分享
      WeChatshare(){
        let that=this;
        let data={url:window.location.href.split('#')[0]};
        this.axios.post('/api/v1/signture',data)
          .then((res)=>{
            wx.config({
              debug: false, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.data.appId, //必填，公众号的唯一标识
              timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
              signature: res.data.data.signature, // 必填，签名
              jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });

            //拼接当前地址
            let shareUrl=window.location.href.split('#')[0]+'#'+window.location.href.split('#')[1];
            shareUrl = shareUrl.split('#')[0] + 'static/html/redirect.html?app3Redirect=' + encodeURIComponent(shareUrl);

            wx.ready(function () {
              //分享给朋友
              wx.onMenuShareAppMessage({
                title: that.fenxi_title,
                desc: that.fenxi_describe,
                link: shareUrl,
                imgUrl: that.fenxi_img,
                success: function (res) {
                  alert('分享成功！');
                },
                cancel:function(res){
                  alert('分享失败！');
                }
              })
              //分享到朋友圈
              wx.onMenuShareTimeline({
                title: that.fenxi_title,
                link: shareUrl,
                imgUrl: that.fenxi_img,
                success: function (res) {
                  alert('分享成功！');
                },
                cancel:function(res){
                  alert('分享失败！');
                }
              })
            });
          })
      },
    },
    created: function () {
      let query = this.$route.query;
      this.params.id = query.id;
      console.log(this.params.id)
      this.$axios.post(this.$api.seeImageDetail,{
            id:this.params.id
      })
        .then(res=>{
          // console.log(res)
          if(res.data.code ==1){
            this.imgDetai = res.data.data
            this.imgList = res.data.data.recommend
            let self =this;
            let img =new Image()
            img.src=self.imgDetai.url
            img.onload=function () {
              self.imgDetai.hei = img.height
              self.imgDetai.wid = img.width
              self.wid = img.width
              self.hei = img.height
              if(self.wid > self.hei ){
                self.isA = true
              }else{
                self.isB = true
              }
            }
          }else{
          }
        }),
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
    .report_box_content ul{
        padding:0;
        list-style:none;
        width: 90%;
        margin-left: 5%;
    }
    .report_box_content li{
        width:30%; height:30px; display:inline-block;
        font-size:15px;
        text-align:center; line-height:30px;
        cursor:pointer;margin-left:5px;
    }
    .report_box_content li:before{
        display:inline-block; width:10px; height:10px;
        line-height:20px; content:""; border:1px #333333 solid;
        margin-right:0.11rem; transition:all 0.3s linear;
    }
    .report_box_content li.checked:before{
        background-color:#009DFB;
        border:1px #009DFB solid;
    }
   .report_box_content li.checked{color:#009DFB}
</style>

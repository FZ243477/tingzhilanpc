<template>
    <div>
        <Header ref="child"/>
        <div class="home_content">
            <div class="home_nav">
                <ul style="padding: 0;">
                    <li v-for="(item,index) in cate" :key="index"
                        @mouseenter="enter(item.id)" :class="{select:item.id == selectCurrent}"
                        @mouseleave="leave()">
                        <div class="home_nav_left"></div>
                        <div class="home_nav_span">{{item.name}}</div>
                        <div class="home_nav_right"></div>
                    </li>
                    <li  @mouseenter="enterVideo()"  @mouseleave="leave()" :class="{select:videoStatus}">
                        <div class="home_nav_left"></div>
                        <div class="home_nav_span">视频</div>
                        <div class="home_nav_right"></div>
                    </li>
                    <div style="clear: both"></div>
                </ul>
                <div style="clear: both"></div>
            </div>

            <div class="home_img" v-show="imgStatus">
                <div class="waterfall-height-css">
                    <div class="image-box" v-for="img in imgList" :key="img.img">
                        <img :src="img.url" class="water_img"  @click="goAlbum(img.url,img.id)"/>
                    </div>
                </div>
            </div>
            <div class="home_img" v-show="videoStatus">
                <div class="video_box" v-for="(item,index) in videoUrl" :key="index">
                    <video-player  class="video-player vjs-custom-skin"
                                   ref="videoPlayer"
                                   :playsinline="true"
                                   :options="videoUrl[index]"
                    ></video-player>
                </div>
                <div style="clear: both;"></div>
            </div>

          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total,prev,pager,next"
            :total="total" >
          </el-pagination>



            <div class="home_contact">
                <p class="home_contact_p">联系我们</p>
                <p class="home_contact_span">如有任何问题请联系我们，我们7*8小时竭诚为您服务</p>
                <p class="home_contact_p2" style="margin-top: 10px;">{{company.phone1}}</p>
                <p class="home_contact_p2" style="margin-bottom: 50px;">{{company.phone2}}</p>
                <div style="width: 500px;height:auto;margin: 0 auto;">
                <img class="home_contact_qr_img"  style="margin-right: 50px;" :src="company.pic" alt="">
                <img class="home_contact_qr_img" :src="company.pic1" alt="">
                </div>
                <div style="clear: both;"></div>
                    <div class="map">
                        <div id="XSDFXPage" class="XSDFXPage"></div>
                    </div>
                    <div class="company_message">
                        <p class="company_message_p1">咔嚓鱼摄影工作室</p>
                        <p>专业视频摄影机构</p>
                        <p>欢迎您通过以下方式联系我们</p>
                        <p style="margin-top: 50px;"><i class="iconfont  icon-shouye2" ></i>{{company.address}}</p>
                        <p><i class="iconfont  icon-dianhua4" ></i>{{company.phone1}}</p>
                        <p><i class="iconfont  icon-youxiang1" ></i>{{company.email}}</p>
                        <p><i class="iconfont  icon-weixin1" ></i>{{company.wechat}}</p>
                    </div>
                <div style="clear: both;"></div>
            </div>
        </div>
        <Footer />
        <div class="album" ref="homePage" :id="dis_requ2">
            <img class="closeImg" onClick="event.cancelBubble = true" @click="closeAlbum" src="@/assets/img/home/close.jpg" alt="">
            <div style="clear: both;"></div>
            <div class="arrowLeft" @click="goLast(2)" :style='backLeft'></div>
            <div class="arrowRight" @click="goLast(1)" :style='backRight'></div>
            <div class="theImg">
                <img :src="chooseImg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  export default {
    components: {
      Header,
      Footer
    },
    data(){
      return {
        currentPage: 1,
        pagesize: 9,
        tableData: [],
        total:0,
        cate:{},
        imgList:{},
        videoList:[],
        selectCurrent:1,
        company:[],
        clientHeight:'',
        backLeft:{
          backgroundImage:
            "url(" + require("@/assets/img/home/arrow.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition:"0 100%"
        },
        backRight:{
          backgroundImage:
            "url(" + require("@/assets/img/home/arrow.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition:"0 67%"
        },
        dis_requ2:'dis_requ',
        requirements2:false,
        chooseImg:'',
        chooseId:'',
        imgStatus:true,
        videoStatus:false,
        imgInfo: {}, // 存图片的宽高信息,
        videoUrl:[],
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
             src: "http://admin.kacayu.net//uploads/video/20201109/561a9a7b5efc569c5465c935ccebdf1c.mp4" //url地址
          }],
          poster: "http://admin.kacayu.net//uploads/picture/20201109/60b222a550821e4e1ba922ffba956698.png", //你的封面地址
          // width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods:{
      // 页面切换方法
      handleCurrentChange(val) {
        this.currentPage = val;
        let params={
          cate_id:this.selectCurrent,
          list_row:this.pagesize,
          page:this.currentPage
        }
        if( this.imgStatus == false ){
			
            this.getVideoList()
        }else{
          this.$axios.post(this.$api.homeImg,params).then(res=>{
            if(res.data.status == 1){
              this.imgList = res.data.data.list
              this.total = res.data.data.totalCount
              // console.log(this.imgList)
            }else{
            }
          })
        }
      },
      getVideoList(){
        this.videoUrl = []
        let params={
          list_row:this.pagesize,
          page:this.currentPage
        }
        this.$axios.post(this.$api.homeVideo,params).then(res=>{
          if(res.data.status == 1){
            this.videoList = res.data.data.list
            this.total = res.data.data.totalCount
            this.playerOptions.poster = this.videoList.pic
            for(let i of  this.videoList){
              let arrStr = {
                playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                poster: i.pic,
                sources: [{
                  type: "",
                  src: i.water_video
                }],
                // sources: [{
                //   type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                //   src: "http://admin.kacayu.net//uploads/video/20201109/561a9a7b5efc569c5465c935ccebdf1c.mp4" //url地址
                // }],
                // poster: "http://admin.kacayu.net//uploads/picture/20201109/60b222a550821e4e1ba922ffba956698.png", //你的封面地址
                // width: document.documentElement.clientWidth, //播放器宽度
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                  timeDivider: true,
                  durationDisplay: true,
                  remainingTimeDisplay: false,
                  fullscreenToggle: true  //全屏按钮
                }
              }
              this.videoUrl.push(arrStr)
            }
            console.log(this.videoUrl)
          }else{
          }
        })
      },
      changeFixed(clientHeight){                        //动态修改样式
        // console.log(clientHeight);
        this.$refs.homePage.style.height = clientHeight+'px';
      },
      enter(a){
        this.imgStatus = true
        this.videoStatus = false
        this.selectCurrent = a
        this.currentPage = 1
        let params={
          cate_id:this.selectCurrent,
          list_row:this.pagesize,
          page:this.currentPage
        }
        this.$axios.post(this.$api.homeImg,params).then(res=>{
          if(res.data.status == 1){
            this.imgList = res.data.data.list
            this.total = res.data.data.totalCount
            // console.log(this.imgList)
          }else{
          }
        })
      },
      enterVideo(){
        this.imgStatus = false
        this.videoStatus = true
        this.selectCurrent = 999
        this.getVideoList()
      },
      leave(){
        this.seen = false;
      },
      goAlbum(a,b){
        this.chooseImg = a
        this.chooseId = b
        let img = new Image()
        img.src = this.chooseImg
        const vm = this
        img.onload = function () {
          vm.$set(vm.imgInfo, 'width', img.width)
          vm.$set(vm.imgInfo, 'height', img.height)
        }
        if(this.requirements2 ==false ){
          this.dis_requ2 = "dis_requ_show";
          this.requirements2 =true
        }else{
          this.dis_requ2 = "dis_requ";
          this.requirements2 =false
        }
      },
      goLast(a){
        let params={
          cate_id:this.selectCurrent,
          id:this.chooseId,
          page_type:a
        }
        this.$axios.post(this.$api.goLast,params).then(res=>{
          if(res.data.status == 1){
            this.chooseImg = res.data.data.url
            this.chooseId = res.data.data.id
          }else{
          }
        })
      },
      closeAlbum(){
        this.dis_requ2 = "dis_requ";
        this.requirements2 =false
      },
      getData(){
        this.$axios.post(this.$api.homeCate).then(res=>{
          if(res.data.status == 1){
            this.cate = res.data.data.list
          }else{
          }
        })
        let params={
          cate_id:this.selectCurrent,
          list_row:this.pagesize,
          page:this.currentPage
        }
        this.$axios.post(this.$api.homeImg,params).then(res=>{
          if(res.data.status == 1){
            this.imgList = res.data.data.list
            this.total = res.data.data.totalCount
            // console.log(this.imgList)
          }else{
          }
        })
        this.$axios.post(this.$api.company).then(res=>{
          if(res.data.status == 1){
            this.company = res.data.data.list
            // console.log(this.company)
          }else{
          }
        })
      },
    },
    created: function () {
      this.getData();
    },
    mounted() {
      //创建Map实例
      var map = new BMap.Map("XSDFXPage");
      // 初始化地图,设置中心点坐标
      var point = new BMap.Point(120.264542,30.401346);// 创建点坐标
      map.centerAndZoom(point,15);
      //添加鼠标滚动缩放
      map.enableScrollWheelZoom();

      //添加缩略图控件
      map.addControl(new BMap.OverviewMapControl({isOpen:false,anchor:BMAP_ANCHOR_BOTTOM_RIGHT}));
      //添加缩放平移控件
      map.addControl(new BMap.NavigationControl());
      //添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      //添加地图类型控件
      //map.addControl(new BMap.MapTypeControl());

      //设置标注的图标
      // var icon = new BMap.Icon("../../assets/img/new/qq.jpg",new BMap.Size(100,100));
      //设置标注的经纬度
      var marker = new BMap.Marker(new BMap.Point(120.264542,30.401346));
      //把标注添加到地图上
      map.addOverlay(marker);
      var content = "<table>";
      content = content + "<tr><td> 地点：咔嚓鱼摄影工作室</td></tr>";
      content += "</table>";
      var infowindow = new BMap.InfoWindow(content);
      marker.addEventListener("click",function(){
        this.openInfoWindow(infowindow);
      });

      //点击地图，获取经纬度坐标
      map.addEventListener("click",function(e){
        document.getElementById("aa").innerHTML = "经度坐标："+e.point.lng+" &nbsp;纬度坐标："+e.point.lat;
      });
      window.addEventListener("scroll", this.handleScroll, true);
      // 获取浏览器可视区域高度
      this.clientHeight =   `${document.documentElement.clientHeight}`          //document.body.clientWidth;
      //console.log(self.clientHeight);
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`;
      };
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
            min-height:auto;
            width: 380px;
            object-fit: cover;
        }
    }
    .XSDFXPage{
        width: 100%;
        height: 100%;
        overflow: hidden;
        margin: 0px auto;
        font-family: "微软雅黑";
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

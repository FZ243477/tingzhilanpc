<template>
    <div @click="changeTab2" :style='backCard'>
        <Header ref="child"/>
            <div class="card_content">
                <div class="card_title">
                    购买下载卡
                    <span class="card_en_title">DOWNLOAD CARD</span>
                </div>
                <div class="card">
                    <div class="card_box "
                         v-for="(item,index) in vipList" :id="cardID(index)"
                         :class="{choose_card1:index==1}"
                         @click="chooseCard(index,item.id,item.price,$event)" >
                            <div class="card_box_p">
                                全站下载张数 （{{item.download_num}}张）
                            </div>
                        <div class="card_price" :id="gernerateID(index)">
                            ￥<span style="font-size: 60px;">{{item.price}}</span>
                        </div>
                        <del class="real_price">
                            ￥<span>{{item.price + 10}}</span>
                        </del>
                        <div class="card_dashed"></div>
                        <div class="Discount">下单立减10元</div>
                    </div>
                </div>
                <div class="choose_type">
                    <div class="type_wechat" @click="chooseWechat" v-bind:class="{ chosse_pay:typeData=='wechat'}">
                        <div class="pay_style" style="margin-top: 58px;">
                            <img  src="@/assets/img/card/pay_wechat.png" alt="">
                            <span>微信支付</span>
                        </div>
                    </div>
                    <div class="type_apily" @click="chooseApily" v-bind:class="{ chosse_pay:typeData=='alipay'}">
                        <div class="pay_style" style="margin-top: 58px;width:195px;">
                            <img  src="@/assets/img/card/pay_apily.png" alt="">
                            <span>支付宝支付</span>
                        </div>
                    </div>
                </div>
                <div class="card_submit" @click="buyNow" >立即购买</div>

                <div class="card_foo">
                    <img class="card_foo_img" src="@/assets/img/card/11.png" alt="">
                    <img class="card_foo_img" src="@/assets/img/card/5.png" alt="">
                    <img class="card_foo_img" src="@/assets/img/card/4.png" alt="">
                    <img class="card_foo_img" src="@/assets/img/card/3.png" alt="">
                    <img class="card_foo_img" src="@/assets/img/card/2.png" alt="">
                    <div style="clear: both;"></div>
                </div>
            </div>
        <Footer />
        <div ref="homePage" class="requirements_shadow"  v-show="showQrcode">
        <div class="pay_link" >
            <img @click="closeBuy" class="closeBuy" src="@/assets/img/card/cancel.png" style="float: right;margin-top: 30px;margin-right: 30px;" alt="">
            <div class="pay_title">提交成功！请尽快完成付款</div>
            <div class="pay_dashed"></div>
            <div class="pay_price">实付金额：<span style="color:#FD5100; ">{{payPrice}}元</span></div>
            <div class="pay_coder" v-bind:class="{ chosse_pay_apily:typeData =='alipay'}" id="qrcode">
            </div>
            <div class="pay_style" v-if="typeData == 'wechat'">
                <img  src="@/assets/img/card/pay_wechat.png" alt="">
                <span>微信支付</span>
            </div>
            <div class="pay_style" v-else>
                <img  src="@/assets/img/card/pay_apily.png" alt="">
                <span>支付宝支付</span>
            </div>
            <div class="pay_bottom">微信关注食图图公众号好礼送不停</div>
        </div>
        </div>
    </div>
</template>
<script>
  import Header from "@/components/Header.vue";
  import Footer from "@/components/Footer.vue";
  import { mapState, mapMutations } from "vuex";
  import QRCode2 from "qrcodejs2";
  export default {
    components: {
      Header,
      Footer
    },
    data(){
      return {
        current:0,
        backCard:{
          backgroundImage:
            "url(" + require("@/assets/img/card/1.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundColor:"#f5f5f5"
        },
        backChoose:{
          backgroundImage:
            "url(" + require("@/assets/img/card/choose.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto auto",
          backgroundColor:"#f5f5f5",
          backgroundPosition:"right bottom"
        },
        vipList:[],
        vipType: "",
        typeData: "wechat",
        showQrcode: false,
        payPrice:'',
        clientHeight:'',
        choose_card:'choose_card1',
        borderColor:{
          border:"6px solid #FFBB00"
        }
      }
    },
    computed: {
      ...mapState(["userInfo"]),
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
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      clientHeight: function () {
        this.changeFixed(this.clientHeight)
      }
    },
    methods: {
      ...mapMutations({
        setUserInfo : 'SET_USERINFO'
      }),
      changeFixed(clientHeight){
        this.$refs.homePage.style.height = clientHeight+'px';
      },
      chooseCard(index,id,price,$event){
        this.current=index;
        this.vipType = id
        this.payPrice = price
        if(this.current == 0){
          document.getElementById("card_0").className='card_box';
          document.getElementById("card_1").className='card_box';
          document.getElementById("card_2").className='card_box';
          $event.currentTarget.className='choose_card0 card_box ';
        }
        if(this.current == 1){
          document.getElementById("card_0").className='card_box';
          document.getElementById("card_1").className='card_box';
          document.getElementById("card_2").className='card_box';
          $event.currentTarget.className='choose_card1 card_box ';
        }
        if(this.current == 2){
          document.getElementById("card_0").className='card_box';
          document.getElementById("card_1").className='card_box';
          document.getElementById("card_2").className='card_box';
          $event.currentTarget.className='choose_card2 card_box ';
        }
        console.log(this.vipType)
      },
      cardID(index){
        return "card_" + index
      },
      gernerateID(index){
        return "color_" + index
      },
      changeTab2(){
        this.$refs.child.menuShow = false;
        this.$refs.child.navShow = false;
      },
      chooseWechat(){
        this.typeData = "wechat"
      },
      chooseApily(){
        this.typeData = "alipay"
      },
      getData(){
        this.$axios.post(this.$api.vipList)
          .then(res=>{
            if(res.data.code ==1){
              this.vipList = res.data.data.list
              this.vipType =  this.vipList[0].id
              this.payPrice =  this.vipList[0].price
             console.log(this.vipType)
            }else{
            }
          })

      },
      closeBuy(){
        this.linkUrl = null;
        this.out_trade_no = null;
        this.showQrcode = false;
        clearInterval(this.buyInterval)
        this.buyInterval = null;
      },
      buyNow() {
        if(!this.vipType){
          this.$message.error('请先选择需要购买的会员卡')
          return false;
        }
        if(!this.userInfo){
          this.$toast('您还未登陆，请先登陆')
          window.setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 500);
          return
        }
        let param = new FormData() // 创建form对象
        param.append('token',this.userInfo.token)
        param.append('member_id', this.vipType)
        param.append('type', this.typeData)
        param.append('pay_type', "scan")
        this.$axios.post(this.$api.purchaseMember,param).then(res=>{
          console.log(res)
          this.showQrcode = true;
          this.out_trade_no = res.data.out_trade_no
          if(this.typeData === 'wechat'){
            this.linkUrl = res.data.code_url ;
          }else{
            this.linkUrl = res.data.qr_code ;
          }
          this.$nextTick(()=>{
            this.qrcode()
            this.buyInterval = setInterval(()=>{
              this.checkPayStatus()
            },1000)
          })
        })
      },
      checkPayStatus(){
        let param = new FormData() // 创建form对象
        param.append('token',this.userInfo.token)
        param.append('type',1)
        param.append('out_trade_no',this.out_trade_no)
        this.$axios.post(this.$api.checkPaySuccess,param).then(res=>{
          if(res.data.code === 1){
            this.$toast('支付成功')
            setTimeout(()=>{
              this.linkUrl = null;
              this.out_trade_no = null;
              this.showQrcode = false;
              clearInterval(this.buyInterval)
              this.buyInterval = null;
              this.$router.go(0)
            },500)
          }
        })
      },
      qrcode() {
        let qrcode = new QRCode2("qrcode", {
          width: 170,
          height: 170, // 高度
          text: this.linkUrl // 二维码内容
          // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
          // background: '#f0f',   // 背景色
          // foreground: '#ff0'    // 前景色
        });
      },
    },
    created: function () {
      this.getData();
    }
  }
</script>
<style>
    .choose_card0{
          width: 358px;
          height:488px;
          border:6px solid #FFBB00;
      }
    .choose_card1{
        width: 358px;
        height:488px;
        border:6px solid #FF3D00;
    }
    .choose_card2{
        width: 358px;
        height:488px;
        border:6px solid #009DFA;
    }
</style>

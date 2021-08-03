<template>
    <div >
        <div class="footer">
            <p style="margin-top: 35px;">工作时间：{{company.worktime}}    {{company.email}}</p>

            <p><a href="https://beian.miit.gov.cn">浙ICP备18042593号-1</a></p>
            <p>{{company.copyright}}</p>
        </div>
        <div class="float_message">
            <ul>
                <!--<li class="float_message_li" @mouseenter="enter()" @mouseleave="leave()">-->
                    <!--<img v-if="(floatMessageSeen1 == false)" src="@/assets/img/home/ma.png" alt="">-->
                    <!--<img v-else src="@/assets/img/home/maHover.png" alt="">-->
                    <!--<div class="float_qrCodePosition float_message_div" align="center">-->
                        <!--<div class="float_qrCode">-->
                            <!--<img  :src="messageContent.pic" alt="">-->
                            <!--<p>关注食图图公众号</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</li>-->
                <li class="float_message_li" @click="backtop" @mouseenter="enter1()" @mouseleave="leave1()">
                    <img v-if="(floatMessageSeen2 == false)" src="@/assets/img/home/top.png" alt="">
                    <img v-else src="@/assets/img/home/topHover.png" alt="">
                    <div class="float_message_2Position float_message_div" >
                        <div class="float_message_2" :style="floatMessage2">
                            回到顶部
                        </div>
                    </div>
                </li>
                <li class="float_message_li" @mouseenter="enter2()" @mouseleave="leave2()">
                    <img v-if="(floatMessageSeen3 == false)" src="@/assets/img/home/phone.png" alt="">
                    <img v-else src="@/assets/img/home/phoneHover.png" alt="">
                    <div class="float_message_3Position float_message_div">
                        <div class="float_message_3 " :style="floatMessage3">
                            <p class="float_message_3PositionP1">客服热线：{{company.phone2}}</p>
                            <p>工作时间：{{company.worktime}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
  export default {
    data(){
      return {
        footerStyle:{
          backgroundImage:
            "url(" + require("@/assets/img/home/footer.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        floatMessage2:{
          backgroundImage:
            "url(" + require("@/assets/img/home/floatImg1.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        floatMessage3:{
          backgroundImage:
            "url(" + require("@/assets/img/home/floatImg2.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto"
        },
        messageContent:'',
        floatMessageSeen1:false,
        floatMessageSeen2:false,
        floatMessageSeen3:false,
        company:[]
      }
    },
    mounted() {
      window.addEventListener("scroll",this.showbtn,true);
    },
    created(){
      this.$axios.post(this.$api.company).then(res=>{
        if(res.data.status == 1){
          this.company = res.data.data.list
          console.log(this.company)
        }else{
        }
      })
    },
    methods:{
      showbtn(){
        let that = this;
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        that.scrollTop = scrollTop
      },
      /**
       * 回到顶部功能实现过程：
       * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
       * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
       * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
       * 4. 最后记得在移动到顶部时，清除定时器
       */
      backtop(){
        var timer = setInterval(function(){
          let osTop = document.documentElement.scrollTop || document.body.scrollTop;
          let ispeed = Math.floor(-osTop / 5);
          document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
          this.isTop = true;
          if(osTop === 0){
            clearInterval(timer);
          }
        },30)
      },
      enter(){
        this.floatMessageSeen1 = true;

      },
      leave(){
        this.floatMessageSeen1 = false;
      },
      enter1(){
        this.floatMessageSeen2 = true;

      },
      leave1(){
        this.floatMessageSeen2 = false;
      },
      enter2(){
        this.floatMessageSeen3 = true;

      },
      leave2(){
        this.floatMessageSeen3 = false;
      },
    }
  }
</script>

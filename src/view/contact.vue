<template>
    <div>
        <Header ref="child"/>
        <div class="contact_banner">
            <img src="@/assets/img/new/contact.jpg" alt="">
        </div>
        <div class="home_content">
        <div class="home_contact">
            <p class="home_contact_p">联系我们</p>
            <p class="home_contact_span">如有任何问题请联系我们，我们7*8小时竭诚为您服务</p>
            <p class="home_contact_p2" style="margin-top: 10px;">{{company.phone1}}</p>
            <p class="home_contact_p2" style="margin-bottom: 50px;">{{company.phone2}}</p>
            <div style="width: 500px;height:auto;margin: 0 auto;margin-bottom: 50px;">
                <img class="home_contact_qr_img"  style="margin-right: 50px;" :src="company.pic" alt="">
                <img class="home_contact_qr_img" :src="company.pic1" alt="">
            </div>
            <div class="home_c_box">
                <div class="home_c_box_c">
                    <img src="@/assets/img/new/QQ.png" alt="">
                    <div class="home_c_box_c_d">
                        <p>在线QQ客服</p>
                        <p>{{company.qq}}</p>
                    </div>
                </div>
            </div>
            <div class="home_c_box">
                <div class="home_c_box_c">
                    <img src="@/assets/img/new/kacayu.png" alt="">
                    <div class="home_c_box_c_d">
                        <p class="home_c_box_c_d_p2">咔嚓鱼</p>
                    </div>
                </div>
            </div>
            <div class="home_c_box">
                <div class="home_c_box_c">
                    <img src="@/assets/img/new/WeChat.png" alt="">
                    <div class="home_c_box_c_d">
                        <p>关注官方微信</p>
                        <p>{{company.wechat}}</p>
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>

        </div>
        </div>
        <div class="message">
            <div class="message_content">
                <p style="padding-top: 50px;">发表您的留言：</p>
                <div class="m_b_">
                <span class="m_b_s">姓名:</span>
                <input type="text" v-model="name" class="m_b_i">
            </div>
                <div class="m_b_">
                    <span class="m_b_s">邮箱:</span>
                    <input type="text" v-model="email" class="m_b_i">
                </div>
                <div class="m_b_">
                    <span class="m_b_s">电话:</span>
                    <input type="text" v-model="phone" class="m_b_i">
                </div>
                <div class="m_b_" style="height:75px;">
                    <span class="m_b_s">内容:</span>
                    <textarea type="text" v-model="content" class="m_b_text"></textarea>
                </div>
                <div style="clear: both;"></div>
                <div class="submit_message" @click="submit">提交留言</div>
            </div>
        </div>
        <Footer />
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
        name:'',
        email:'',
        phone:'',
        content:'',
        company:[],
      }
    },
    methods:{
      submit(){
        var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(this.email != '' && !regEmail.test(this.email)){
          this.$toast('邮箱格式不正确')
          return
        }
        var reg = /^1[0-9]{10}$/
        if(this.phone != '' && !reg.test(this.phone)){
          this.$toast('请输入正确的手机号')
          return
        }
        let params={
          name:this.name,
          email:this.email,
          phone:this.phone,
          content:this.content
        }
        this.$axios.post(this.$api.message,params).then(res=>{
          if(res.data.status == 1){
            this.$toast(res.data.msg)
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      getData(){
    this.$axios.post(this.$api.company).then(res=>{
      if(res.data.status == 1){
        this.company = res.data.data.list
        console.log(this.company)
      }else{
      }
    })
  },
    },
    created: function () {
      this.getData();
    },
  }
</script>

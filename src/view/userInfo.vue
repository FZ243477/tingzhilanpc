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
                        <li @click="goRecords">
                            <img src="@/assets/img/records/down.png" alt="">
                            <span>下载记录</span>
                        </li>
                        <li @click="goCollection">
                            <img src="@/assets/img/records/collection.png" alt="">
                            <span>我的收藏</span>
                        </li>
                        <li class="records_nav_select">
                            <img src="@/assets/img/records/setHover.png" alt="">
                            <span>个人设置</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="records_right">
                <div class="records_right_content pers-con">
                    <!--<div class="records_right_title">我的资料</div>-->
                    <!--<div class="records_right_solid"></div>-->
                    <div class="tab">
                        <span class="my-data " @click="document" v-bind:class="{ active: mYdata }">
                            <a href="javascript:void(0);"   >我的资料</a>
                        </span>
                        <span class="account-security " @click="document2" v-bind:class="{ active: data2 }">
                            <a href="javascript:void(0);">账号安全</a>
                        </span>
                        <span class="account-security" @click="document3" v-bind:class="{ active: data3 }">
                            <a href="javascript:void(0);">更改密码</a>
                        </span>
                    </div>
                    <div class="my_content" style="width: 100%;" v-show="mYdata">
                        <form action="#" id="account-form" style="display: block;">
                            <div>
                                <label for="">头像</label>
                                <div class="portrait">
                                    <img :src="userInfo.avatar" alt="用户头像" />
                                </div>
                            </div>
                            <div class="nickname">
                                <label>昵称</label>
                                <span> {{userInfo.username}}</span>
                            </div>
                            <div>
                                <label>性别</label>
                                <div class="gender-box">
                                    <label v-for="(item, index) in sexList" :key="index">
                                        <input
                                                name="sex"
                                                style="display: none;"
                                                type="radio"
                                                v-model="sexActive"
                                                :value="item.value"
                                                @change="changeSex"
                                        />
                                        <span class="radio"></span>{{item.label}}
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label>地址</label>
                                <el-cascader
                                        size="large"
                                        :options="options"
                                        v-model="selectedOptions"
                                        :value="areaDetail"
                                        @change="handleChange">
                                </el-cascader>
                            </div>
                            <div>
                                <label>类型</label>
                                <div class="age-box" style="display: inline-block;position: relative;">
                                    <select v-model="cateTypeActive"  @change="changeCateType($event)" id="cate_type">
                                        <option  v-for="(item, index) in cateTypeList" :key="index" :value="item.id">{{item.title}}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="addr">品牌</label>
                                <input type="text" id="addr"  v-model="message"  name="address" placeholder="请输入" />
                            </div>
                            <div>
                                <label >细分行业</label>
                                <div class="age-box" style="display: inline-block;position: relative;">
                                    <select  v-model="industryActive" @change="changeIndustry($event)"  id="industry">
                                        <option v-for="(item, index) in industryList" :key="index" :value="item.id" >{{item.title}}</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label>图片更新频率</label>
                                <div class="age-box" style="display: inline-block;position: relative;">
                                    <select v-model="frequencyActive"  @change="changeFrequency($event)" id="frequency">
                                        <option  v-for="(item, index) in frequencyList" :key="index" :value="item.id">{{item.title}}</option>
                                    </select>
                                </div>
                            </div>
                            <span  @click="allSubmit" class="common-big-btn block-hover account-submite-btn">保存</span>
                        </form>
                    </div>

                    <div class="account-security-con"  v-show="data2">
                        <div class="clearfix binding" style="">
                            <label for="" class="tel-label">手机号</label>
                            <span class="binding-box" style="">
                                <div style="display: inline-block; position: relative;">
                                     <input class="tel-input" type="text" v-model="mobile" placeholder="请输入新手机号" maxlength="11" />
                                     <p class="error-info tel-error" style="display: none;">新手机号不能为空</p>
                                </div>
                                <br />
                                <div style="display: inline-block; position: relative;">
                                     <input class="ind-input" v-model="captcha" type="text" placeholder="请输入验证码" />
                                     <p class="error-info ind-error" style="display: none;">验证码不能为空</p>
                                </div>
                                <span @click="sms_send" class="get-inde btn-active block-hover">{{codeTips}}</span>
                                <br />
                                <span class="bind-btn" @click="confirm" >绑定</span>
                                <span class="bind-btn-cancal block-hover" style="display: none;">取消</span></span>
                        </div>
                    </div>


                    <div class="account-security-con" v-show="data3">
                        <div class="clearfix change-bind" style="display: none">
                            <label for="" class="tel-label">手机号</label>
                            <span class="binded-text" style="display: none;">已绑定：</span>
                            <span class="binded-tel" style="width: 86px;">18891948754</span>
                            <span class="link" style="display: inline;">更换</span>
                            <br />
                        </div>
                        <div class="clearfix binding" style="">
                            <label for="" class="tel-label">修改密码</label>
                            <span class="binding-box" style="">
                                <div style="display: inline-block; position: relative;">
                                     <input class="tel-input" type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11" />
                                     <p class="error-info tel-error" style="display: none;">手机号不能为空</p>
                                </div>
                                <br />
                                <div style="display: inline-block; position: relative;">
                                     <input class="ind-input" v-model="captcha" type="text" placeholder="请输入验证码" />
                                     <p class="error-info ind-error" style="display: none;">验证码不能为空</p>
                                </div>
                                <span @click="sms_send_pass" class="get-inde btn-active block-hover">{{codeTips}}</span>
                                <br />

                                  <div style="display: inline-block; position: relative;">
                                     <input class="tel-input" type="password" v-model="newpassword" placeholder="请输入新密码" maxlength="11" />
                                     <p class="error-info tel-error" style="display: none;">新密码不能为空</p>
                                </div>
                                <br />
                                <span class="bind-btn" @click="confirmPass" >绑定</span>
                                <span class="bind-btn-cancal block-hover" style="display: none;">取消</span></span>
                        </div>
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
  import { CodeToText,TextToCode,regionData } from 'element-china-area-data'
  export default {
    components: {
      Header,
      Footer
    },
    data(){
      return {
        options: regionData,
        selectedOptions: [],
        message:'',
        sexList:[
          {value: "1", label: "男"},
          {value: "2", label: "女"},
        ],
        cateTypeList:[
          {value: "1", label: "外卖"},
          {value: "2", label: "堂食"},
          {value: "3", label: "都有"},
        ],
         industryList:[
           {value: "1", label: "饺子馄饨"},
           {value: "2", label: "快餐便当"},
           {value: "3", label: "汉堡薯条"},
           {value: "4", label: "意面披萨"},
           {value: "5", label: "包子粥铺"},
           {value: "6", label: "米粉面馆"},
           {value: "7", label: "麻辣烫冒菜"},
           {value: "8", label: "川湘菜"},
           {value: "9", label: "东北菜"},
           {value: "10", label: "西北菜"},
           {value: "11", label: "江浙菜"},
           {value: "12", label: "地方菜系"},
           {value: "13", label: "炸鸡炸串"},
           {value: "14", label: "特色小吃"},
           {value: "15", label: "精致西餐"},
           {value: "16", label: "夹馍饼类"},
           {value: "17", label: "鸭脖卤味"},
           {value: "18", label: "日料寿司"},
           {value: "19", label: "韩式料理"},
           {value: "20", label: "香锅干锅"},
           {value: "21", label: "火锅串串"},
           {value: "22", label: "龙虾烧烤"},
           {value: "23", label: "轻食沙拉"},
         ],
           frequencyList:[
        {value: "1", label: "每月更新"},
        {value: "2", label: "每季更新"},
        {value: "3", label: "半年更新"},
        {value: "4", label: "每年更新"},
      ],
        sexActive:1,
        cateTypeActive:1,
        industryActive:1,
        frequencyActive:1,
        areaDetail:'',
        province:'',
        city:'',
        area:'',
        //修改手机号码
        mobile:'',
        captcha:'',
        timer:1,
        codeTips:'获取验证码',
        userinfo:{},
        clientHeight:'',
        newpassword:'',
        mYdata:true,
        data2:false,
        data3:false,
      }
    },
    computed: {
      ...mapState(["userInfo"]),
    },
    methods: {
      goRecords(){
        this.$router.push({ path: "/records" });
      },
      goCollection(){
        this.$router.push({ path: "/collection" });
      },
      handleChange (value) {
        if(CodeToText[value[0]]){
            this.province = CodeToText[value[0]]
        }
        if(CodeToText[value[1]]){
          this.city = '/'+CodeToText[value[1]]
        }
        if(CodeToText[value[2]]){
          this.area = '/'+CodeToText[value[2]]
        }
        this.areaDetail = this.province + this.city + this.area
      },
      ...mapMutations({
        setUserInfo : 'SET_USERINFO'
      }),
      document(){
        this.mYdata = true
        this.data2 = false
        this.data3 = false
      },
      document2(){
        this.mYdata = false
        this.data2 = true
        this.data3 = false
      },
      document3(){
        this.mYdata = false
        this.data2 = false
        this.data3 = true
      },
      changeSex(){
        console.log(this.sexActive);
      },
      changeCateType(event) {
        this.cateTypeActive = event.target.value; //获取option对应的value值
        //console.log("你选中了",this.cateTypeActive)
      },
      changeIndustry(event) {
        this.industryActive = event.target.value; //获取option对应的value值
        //console.log("你选中了",this.industryActive)
      },
      changeFrequency(event) {
        this.frequencyActive = event.target.value; //获取option对应的value值
        //console.log("你选中了",this.frequencyActive)
      },
      changeTab2(){
        this.$refs.child.menuShow = false;
        this.$refs.child.navShow = false;
      },
      allSubmit(){
        let param = new FormData() // 创建form对象
        param.append('user_id', this.userInfo.id) // 添加form表单中其他数据
        param.append('user_name', this.userInfo.username) // 添加form表单中其他数据
        param.append('sex_id', this.sexActive) // 添加form表单中其他数据
        param.append('address',this.areaDetail) // 添加form表单中其他数据
        param.append('cate_type',this.cateTypeActive) // 添加form表单中其他数据
        param.append('brand',this.message) // 添加form表单中其他数据
        param.append('industry',this.industryActive) // 添加form表单中其他数据
        param.append('frequency',this.frequencyActive) // 添加form表单中其他数据
        this.$axios.post(this.$api.userDetail,param).then(res=>{
          if(res.data.code ==1){
            this.$toast(res.data.msg)
            this.message = "";
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      sms_send(){ //获取验证码
        let param = new FormData() // 创建form对象
        param.append('token', this.userInfo.token) // 添加form表单中其他数据
        param.append('mobile', this.mobile) // 添加form表单中其他数据
        param.append('event', 'changemobile') // 添加form表单中其他数据
        this.$axios.post(this.$api.smsSend,param).then(res=>{
          if(res.data.code ==1){
            if(this.timer==1){
              var time=60;
              var inter=window.setInterval(()=>{
                this.codeTips="重新获取("+time+"s)";
                this.timer=0;
                time--;
                //   console.log(time)
                if(time<0){
                  window.clearInterval(inter)
                  this.timer=1;
                  this.codeTips="获取验证码"
                }
              },1000)
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      confirm(){  //确定
        let param = new FormData() // 创建form对象
        param.append('token', this.userInfo.token) // 添加form表单中其他数据
        param.append('mobile', this.mobile) // 添加form表单中其他数据
        param.append('captcha',this.captcha) // 添加form表单中其他数据
        this.$axios.post(this.$api.changeMobile,param).then(res=>{
          if(res.data.code ==1){
            console.log(res,'resss')
            this.$toast('绑定手机号成功')
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      sms_send_pass(){ //获取验证码
        let param = new FormData() // 创建form对象
        param.append('token', this.userInfo.token) // 添加form表单中其他数据
        param.append('mobile', this.mobile) // 添加form表单中其他数据
        param.append('event', 'resetpwd') // 添加form表单中其他数据
        this.$axios.post(this.$api.smsSend,param).then(res=>{
          if(res.data.code ==1){
            if(this.timer==1){
              var time=60;
              var inter=window.setInterval(()=>{
                this.codeTips="重新获取("+time+"s)";
                this.timer=0;
                time--;
                //   console.log(time)
                if(time<0){
                  window.clearInterval(inter)
                  this.timer=1;
                  this.codeTips="获取验证码"
                }
              },1000)
            }
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      confirmPass(){
        let param = new FormData() // 创建form对象
        param.append('token', this.userInfo.token) // 添加form表单中其他数据
        param.append('mobile', this.mobile) // 添加form表单中其他数据
        param.append('captcha',this.captcha) // 添加form表单中其他数据
        param.append('newpassword',this.newpassword) // 添加form表单中其他数据
        this.$axios.post(this.$api.resetPwdt,param).then(res=>{
          if(res.data.code ==1){
            this.$toast('重置密码成功')
            this.setUserInfo('');
            this.$router.replace({path:'/login'})
          }else{
            this.$toast(res.data.msg)
          }
        })
      },
      getData(){
        this.$axios.post(this.$api.detailCate)
          .then(res=>{
            //
            if(res.data.code ==1){
              this.cateTypeList = res.data.data
            }else{
            }
          })
        this.$axios.post(this.$api.industryCate)
          .then(res=>{
            //
            if(res.data.code ==1){
              this.industryList = res.data.data
            }else{
            }
          })
        this.$axios.post(this.$api.frequencyCate)
          .then(res=>{
            //
            if(res.data.code ==1){
              this.frequencyList = res.data.data
            }else{
            }
          })
        let param = new FormData() // 创建form对象
        param.append('user_id', this.userInfo.id) // 添加form表单中其他数据
        this.$axios.post(this.$api.DetailMessage,param).then(res=>{
          if(res.data.code ==1){
            this.sexActive = res.data.data.sex_id;
            this.cateTypeActive = res.data.data.cate_type;
            this.message = res.data.data.brand;
            this.industryActive = res.data.data.industry;
            this.frequencyActive = res.data.data.frequency;
          }else{
            this.$toast(res.data.msg)
          }
        })
      }
    },
    created: function () {
      this.getData();
      console.log(this.userInfo)
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

<template>
    <div>
        <div class="header">
            <div class="nav" style="position: relative;">
                <img class="logo_position" :src="company1.header_logo">
                <ul style="padding: 0;margin: 0 auto;width: 38%;float:right;">
                    <li @click="goContact" :class="{itemSelected:courent == 2}"><a href="javascript:void(0);">联系我们</a></li>
                    <li @click="goAbout" :class="{itemSelected:courent == 1}"><a href="javascript:void(0);">关于我们</a></li>
                    <li @click="goHome" :class="{itemSelected:courent == 0}"><a href="javascript:void(0);">案例展示</a></li>
                    <div style="clear: both"></div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data(){
      return{
        courent:0,
        company1:[],
        params: {
          id:"",
        },
      }
    },
    watch: {
      '$route' (to, from) {
        location.reload();
        // 对路由变化作出响应...
      },
    },
    methods:{
      goHome(){
        this.$router.push("/home?id=" + 0);
      },
      goAbout(){
        this.$router.push("/about?id=" + 1);
      },
      goContact(){
        this.$router.push("/contact?id=" + 2);
      },
      getData(){
        this.$axios.post(this.$api.company).then(res=>{
          if(res.data.status == 1){
            this.company1 = res.data.data.list
            console.log(this.company1)
          }else{
          }
        })
      }
    },
    created: function () {
      let query = this.$route.query;
      this.params.id = query.id;
      console.log(this.params.id)
      if(this.params.id){
        this.courent = this.params.id
      }
      this.getData();
    }
  }
</script>

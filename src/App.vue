<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components:{

    },
    provide(){
      return{
        reload:this.reload,
      };
    },
    data(){
      return {
        isReloadAlive:true,
      }
    },
    mounted() {
      if (this._isMobile()) {
        location.href =  "http://phone.kacayu.net";
        window.location.href =
                "http://phone.kacayu.net";
      } else {

      }
    },
    methods:{
      _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag;
      },
      reload(){
        this.isReloadAlive = false;
        this.$nextTick(function () {
          this.isReloadAlive = true;
        })
      },
    }
  }
</script>

<style>
/*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
/*}*/
</style>

<template>
  <div class="content" :style="backgroundDiv">
    <img src="~_a/img/logo.png" class="logo" />
    <LoginWrapper :showLogin="true" @close="closeLogin" />
  </div>
</template>

<script>
import LoginWrapper from "@/components/LoginWrapper.vue";
export default {
  name: "Login",
  components: {
    LoginWrapper
  },
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("_a/img/background.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }
    };
  },
  methods: {
    closeLogin() {
      return;
    }
  }
};
</script>
<style lang='scss' scoped>
.content {
  width: 100%;
  height: 100vh;
  background-color: grey;
  padding: 36px 288px;
  box-sizing: border-box;
  .logo {
    width: 126px;
    height: 36px;
  }
}
</style>
<template>
    <div>
        <Header ref="child"/>
        <div style="min-height: 800px;width: 1200px;margin: 0 auto;padding-bottom: 20px;">
            <div style="padding-top: 50px;" class="about_box" >
                <img style="margin:0 auto;display: table-cell;width: 100%;" src="@/assets/img/about/about2.jpg" alt="">

                <img style="margin:0 auto;display: table-cell;width: 100%;" src="@/assets/img/about/about4.jpg" alt="">
                <img style="margin:0 auto;display: table-cell;" src="@/assets/img/about/about1.jpg" alt="">

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
  }
</script>

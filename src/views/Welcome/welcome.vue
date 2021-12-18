<template>
    <div>
        <div style="background-image: url(&quot;http://cdn.shitutu.com/bg.png&quot;); background-repeat: no-repeat; background-size: 100%; height: 937px;">
         <div class="we_head">
          <img src="data:image/png;base64,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" alt="" /> 
          <ul class="we_nav">
           <li @click="goLogin()"><span> 登录</span><span></span></li> 
           <li @click="goAbout(0)">关于我们</li> 
           <li @click="goHome()">进入图库</li>
          </ul> 
          <div style="clear: both;"></div>
         </div> 
         <div class="we_content">
          <div class="we_content_left">
           <div class="we_content_left_bg" :style='backStyle'></div> 
           <div class="we_content_left_img">
            <video loop="loop" autoplay="autoplay" muted="muted" class="my-video">
             <source src="http://cdn.shitutu.com/welcome2.mp4" type="video/mp4"></source>
            </video>
           </div>
          </div> 
          <div class="we_content_right">
           <img src="@/assets/img/011.6df1ebf.png" alt="" />
          </div> 
          <div style="clear: both;"></div>
         </div> 
         <div class="we_footer">
          <ul>
           <li @click="goAbout(1)">版权声明</li> 
           <li @click="goAbout(2)">服务协议</li> 
           <li @click="goAbout(3)">营业执照</li> 
           <div style="clear: both;"></div>
          </ul> 
          <div class="we_footer_p">
           <span>Copyright &copy; 2018-2020食图图 </span> 
           <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAEnElEQVQ4jXWUb2wTBRjGf3e9Xq/Xdu26dmVSnGxT2AJjBtCAcwj+ARIGOiMBYxQNEtAgwUhMDF8IxkBMMKIBDGIURGOEhAQIYYypQYigBiLgNsYYY93YRv9svfau7fVaM6KJwfh8er88v/fNk/d9BbN4g3FJlAAuyF2g+0QrDy5bN0G/cXHpDyd+fT1r5OUnnpmx119ff6Tj8LeR2uYWkKuBEWLXjvzt/6/mA2u/XLdxadHoVvqzKrZSH/qhzk+MPUc/anyy6ijwBXDs307xHozSvntf+8tr2panMn3KQ24bq5Vh1ir9zJ0Twj8nJK1ec+q51p3bxmGO/wOFsxe3nvz44BgrV1exKpzE+9lVYl0WsR6LsSV7WGZdZsP+Few9bFLs+vz78cb3gmpvHdvc07TkcpOvJsSbgcv0HkwiTvJhaTnIFhCCPs6tP8ty9SKhxx7mqSXHm+/8vG884Cl3QemOHqTMSffRLo98YXAWi2dppC4lEW+NIfgcOOIWmbPD2CeXoaQMol+dp2VhjvbrdRw4Y1W4hbTTP/mVuxOFC7+c3lEQnCDplGiDJIfAbpkQzyBUq8gzfYi308gUiPYaTPRnQRBIpEQcQWkHMFns6zz1fG5goLHULUPeQbGigkDjBFIU0eaWYa0M497SgLqhHjGoUj4zQFrPQbFIRbkKkUvz4/3nXhNVd2ltUjOpCmZAKaP1vIq0oIRYcyXWgIbwRxr9+DBm7yjypkb8G2dwaH/i7s41TJdI94yQifSExUJ8sDmZkJgW1gg/IrPrgIuftkVomF2BV/WgX01QGMmSuZzAMzDKla3X2LnfQajBx/SJY0QHspjxzkZRlNI+LSlScucayxda5E035rEhyr77HXGinVzQRqFcIrCggor2G0T3XiGds9Gy1I4n1o2WlJA8ot327qplj0rKwJSSqkrCARe7T5cwpo3gycbgZhQxmafYFUcwoE/08nV/iN+8dezakCIUVMnLBdTyqd9IIJYXk0UGezSm1fby/jsz2bypiWPadEiaLNVj+H0ih457SKECpbz9hsLsmm4Gu4GMTiGvzZAkX25W3hPCHDKJjHTwVqODljYX7Sd0OsV6FtVdp8IZJX90IrmEwaSpKu8tusnwuZvopoISkJF88lQho51/MXZ++0FjKEc2akKkj+pnG3CEFLBiWDGJ1IiBd7IfKssgEqX3SBeGJ4C7yo1zgoq3ZuW8cRA2wfFS/MqOT62M4Y2eGUJyFZkwrxYrbmDqaURVQfG7EGQ7sXM95C0J76xqzAwx75SmFbJdbZOy0QJgDGSGnIYSKnhDC2qwxtJYWhJUGZvsQ3ZCbjRFOpJAqSxDCYfIjupkBrSic1KKHCmEVO+H4zfXarMNP23oAqkbI4iWiV2FnKYj+7xgaKT7xhDdTuRgCYgist+NI6SC/YFDwAuCmfxxHKQmBs9sz0X+fFWydJfqc5BP5zA1E5si3a1t/hJsio2ckUJ0BbAF7r8lqtV7FVfwA6Dwz4fUgfWJjtAWY+zO4qzZP+++umBdQRPcik/0S04P2m1uOYM+XSpvuhTvGWkz+hKtlY8zngsAfwHO3PzDpQ+zwgAAAABJRU5ErkJggg==" alt="" style="margin-left: 15px; margin-right: 5px;" /> 
           <a href="https://beian.miit.gov.cn" style="color: rgb(255, 255, 255);"><span> 浙ICP备18042593号-5</span></a> 
           <span>杭州汀知兰文化创意有限公司</span> 
           <div style="clear: both;"></div>
          </div> 
          <p>举报邮箱：yes@tingzhilan.cn 网上有害信息举报专区</p>
         </div>
        </div>
    </div>
  </template>
  
  <script>
   
  
    export default {
      data(){
        return {
          nim:null,
		  backStyle:{
		              backgroundImage:
		                "url(" + require("@/assets/img/wePhone.png") + ")",
		              backgroundRepeat: "no-repeat",
		              backgroundSize: "100%"
		            },
        }
      },
      methods: {
        back() {
          this.$router.go(-1)
        },
		goHome(){
			this.$router.push({
			    path:'/home'
			})
		},
		goAbout(t){
			this.$router.push({ path: '/about', query: { id: t}  })
		},
		goLogin(){
			this.$router.push({
			    path:'/login'
			})
		}
       
    },
      created: function () {
        
      }
    }
  </script>
  <style>
    body {
      background-color: #f2f2f2;
    }
  
    .header {
      line-height: 36px;
    }
  
    .time {
      line-height: 28px;
    }
  
    .photo {
      border-radius: 6px;
    }
  
    .conText {
      margin: 5px;
      word-break: break-all;
    }
  
    .conbox {
      margin-bottom: 15px;
    }
  </style>
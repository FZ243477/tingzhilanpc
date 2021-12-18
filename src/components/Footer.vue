<template>
	<div>
		<div class="footer" :style="backStyle">
		   <div class="footer_content">
		    <div class="footer_box_1">
		     <img src="data:image/png;base64,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" alt="" /> 
		     <div class="_1_level">
		      <a @click="goHome()" href="javascript:void(0)">首页</a> 
		      <a @click="goClassify()" href="javascript:void(0)">分类</a> 
		      <a @click="goCard()" href="javascript:void(0)">下载卡</a>
		     </div> 
		     <div class="_1_level" style="margin-top: 25px;">
		      <a @click="goAbout(0)" href="javascript:void(0)">关于我们</a> 
		      <a @click="goAbout(2)" href="javascript:void(0)">服务协议</a> 
		      <a @click="goAbout(1)" href="javascript:void(0)">版权问题</a>
		     </div>
		    </div> 
		    <div class="footer_box_2">
		     <div class="contact_us">
		       联系我们 
		     </div> 
		     <div style="clear: both;"></div> 
		     <span>0571-88693669</span>
		    </div> 
		    <div class="footer_box_3">
		     <span>关注食图图</span> 
		     <img alt="" src="https://image.shitutu.com/uploads/20200801/65e4449235808ecacc8348cc3c195528.jpg_artwork" /> 
		     <span>微信扫码关注</span> 
		     <div style="clear: both;"></div>
		    </div> 
		    <div style="clear: both;"></div>
		   </div> 
		   <div class="last">
		    <div class="last_div">
		     <ul>
		      <li>杭州汀知兰文化创意有限公司</li> 
		      <li>举报邮箱：yes@tingzhilan.cn</li> 
		      <li><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAEnElEQVQ4jXWUb2wTBRjGf3e9Xq/Xdu26dmVSnGxT2AJjBtCAcwj+ARIGOiMBYxQNEtAgwUhMDF8IxkBMMKIBDGIURGOEhAQIYYypQYigBiLgNsYYY93YRv9svfau7fVaM6KJwfh8er88v/fNk/d9BbN4g3FJlAAuyF2g+0QrDy5bN0G/cXHpDyd+fT1r5OUnnpmx119ff6Tj8LeR2uYWkKuBEWLXjvzt/6/mA2u/XLdxadHoVvqzKrZSH/qhzk+MPUc/anyy6ijwBXDs307xHozSvntf+8tr2panMn3KQ24bq5Vh1ir9zJ0Twj8nJK1ec+q51p3bxmGO/wOFsxe3nvz44BgrV1exKpzE+9lVYl0WsR6LsSV7WGZdZsP+Few9bFLs+vz78cb3gmpvHdvc07TkcpOvJsSbgcv0HkwiTvJhaTnIFhCCPs6tP8ty9SKhxx7mqSXHm+/8vG884Cl3QemOHqTMSffRLo98YXAWi2dppC4lEW+NIfgcOOIWmbPD2CeXoaQMol+dp2VhjvbrdRw4Y1W4hbTTP/mVuxOFC7+c3lEQnCDplGiDJIfAbpkQzyBUq8gzfYi308gUiPYaTPRnQRBIpEQcQWkHMFns6zz1fG5goLHULUPeQbGigkDjBFIU0eaWYa0M497SgLqhHjGoUj4zQFrPQbFIRbkKkUvz4/3nXhNVd2ltUjOpCmZAKaP1vIq0oIRYcyXWgIbwRxr9+DBm7yjypkb8G2dwaH/i7s41TJdI94yQifSExUJ8sDmZkJgW1gg/IrPrgIuftkVomF2BV/WgX01QGMmSuZzAMzDKla3X2LnfQajBx/SJY0QHspjxzkZRlNI+LSlScucayxda5E035rEhyr77HXGinVzQRqFcIrCggor2G0T3XiGds9Gy1I4n1o2WlJA8ot327qplj0rKwJSSqkrCARe7T5cwpo3gycbgZhQxmafYFUcwoE/08nV/iN+8dezakCIUVMnLBdTyqd9IIJYXk0UGezSm1fby/jsz2bypiWPadEiaLNVj+H0ih457SKECpbz9hsLsmm4Gu4GMTiGvzZAkX25W3hPCHDKJjHTwVqODljYX7Sd0OsV6FtVdp8IZJX90IrmEwaSpKu8tusnwuZvopoISkJF88lQho51/MXZ++0FjKEc2akKkj+pnG3CEFLBiWDGJ1IiBd7IfKssgEqX3SBeGJ4C7yo1zgoq3ZuW8cRA2wfFS/MqOT62M4Y2eGUJyFZkwrxYrbmDqaURVQfG7EGQ7sXM95C0J76xqzAwx75SmFbJdbZOy0QJgDGSGnIYSKnhDC2qwxtJYWhJUGZvsQ3ZCbjRFOpJAqSxDCYfIjupkBrSic1KKHCmEVO+H4zfXarMNP23oAqkbI4iWiV2FnKYj+7xgaKT7xhDdTuRgCYgist+NI6SC/YFDwAuCmfxxHKQmBs9sz0X+fFWydJfqc5BP5zA1E5si3a1t/hJsio2ckUJ0BbAF7r8lqtV7FVfwA6Dwz4fUgfWJjtAWY+zO4qzZP+++umBdQRPcik/0S04P2m1uOYM+XSpvuhTvGWkz+hKtlY8zngsAfwHO3PzDpQ+zwgAAAABJRU5ErkJggg==" alt="" /> 浙ICP备18042593号-5</li> 
		      <li>Copyright &copy; 2018-2020食图图 版权所有</li> 
		      <div style="clear: both;"></div>
		     </ul>
		    </div>
		   </div> 
		   <div class="float_message">
		    <ul>
		     <li class="float_message_li">
				 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAE3ElEQVRoge2bTUsjSxSGTyeayMXBSPzWjRJdqLjQ+QWiIMJc/Q8qIircEZeuhAtXEDcjCOrCvSth0JUrURDGixvBb0VBSTAxRvEj2t2Xt0iFstNpZ8YKpnPzQmNXdyWcp07VqVOVUqGYdF2nZFIURUn6Mg2kJzFeNDsnSQUjWFqDGs01A08A5ZDBYPCLw+H4qijKZyLKT62p79adrus/NE2b8nq938GQzMu86wLSEQqF/o5EIno0GtU1TdPTXbARtsJm2A4Gq17IIP1+/5/4gB0AjYLNsD0QCHQZYR0CJPvrcrm+5uXlJfR7Owg2w/bc3Ny/RCYRlD9A927JyTGNUbYQbAcD5zF6lIQXn+zoTa6Y7Z+sQDNaOQZy+7oyUZZjNNP0/+u6WdBMUxY00yQtBbq/v6fZ2Vk6ODigl5eXxBZ1OKiqqor6+vqopKSEotEozc3N0cnJCT0/P8frPT4+xuuXlZVRT08P+9x7JQ10d3eXQQ4MDJDL5Up4r2kaLS4u0sbGBnV3d9POzg7t7e1Rf38/ctOk9Tc3N9MLFB6AwY2NjUnreL1e5kkIf/Pz86mhocGyvqqqUuxLWfa+vLxMd3d3rAE6OjoYlJVmZmbo9vaWebK3t5eKioqk2pMy0KWlpfh9U1MT1dXVWdbf3t6O34dCIemgaRN1U71iSplHu7q6WNcFQEVFxZv1h4aGKBKJkNPppOrqaun2SAM17kV1dnZa1sfYxXjksgpiMiQNtLCwkJ6enmh+fp7MdijQEPv7++Tz+VgZEfXm5sayPqYrWd5VhAvj1REOh58KCgp+68vW1tbo9PT0lae44MHS0lJqbW2Ng62vr9PR0ZHp5jm6PAJSe3u76TxrJTSgx+NxYzqOXbpU0HSRGajUYHR1dUVnZ2fxlA6eFdPByspKqqmpiZeRDAQCASovL2dlpH8ISDxFhMHFxcVSbJMG6vf7aWJignU5t9ud8B7QgEAy0NzczJ4hDVxYWKCpqSlWRnqI+XRkZIS2trZodXWVxsbGpNgnDfTi4oJBTk5OJp0Tp6en2ZjkoMaxiTJ/hu+QObdKA+WetDIOAUmEq6+vp+HhYdO6LS0tVFtbK8u81GVGo6OjbGUyODhIl5eXpnXwfGVlJV7GXNrW1sbuj4+PX717r1IGigQdQjDi90Yhp8XcyoUA9PDwwErBYJCtVdMeVEwCfvYnDkBjbk2JPSn5ViIaHx9nuw6A5NPHR0pqrot5EN0POwxI8XCJ75EiftTvOtJAsd0BiGRRFEIqhxSQCw0izrl4z7s57n819bOS1BTw+vqazs/P2TRiFBoBua5xQY1gxeHgdWRLKOMeGZbZ/tNbSnkKiBUMrl+RGKjQGLyM+9+BTKbsBnamKQuaacqCZpqyoJkmM9BbqyOt6a6Y7XdWHmU1VFX91+z3TbsItququiUycVBdeIBDg9+wCrGjV/kKCgwikwiMpN6JRQMRuf1+/z92PcYK28EQY3Hys0bi6ar4CgbX4eHhF4/HM+R0Oj8rivLHh7joJ6Xr+r2qqj/C4fA3n8/3XVi1aNyjxqNxDgOwYjw8mKbShUsE5L+NxJdpegyG92VNaAA7guqGMfpqh8EYfTQbHYY0Bh7dLAgZZRy3VnXTQaKDEjz5lvG2+ncQk96YMDci/GaCrCd9IvoP/LsqdLiER9sAAAAASUVORK5CYII=" alt="" /> 
		      <div align="center" class="float_qrCodePosition float_message_div">
		       <div class="float_qrCode">
		        <img alt="" src="https://image.shitutu.com/uploads/20200801/65e4449235808ecacc8348cc3c195528.jpg_artwork" /> 
		        <p>关注食图图公众号</p>
		       </div>
		      </div></li> 
		     <li class="float_message_li" @click="backTop">
				 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAADbklEQVRoge2bz07iQBzHf9MCms0SMMSLiTffYI3ceIN17570vBd8iE32ItHsnknwFXZfQQlEeAJITDQaSDRVFFhlOptf03bHaSma7Qy09ptMrMPIfD/8pj86fyRgizEG00QIIVNfXACxKeZ526kpDUSwhQYV7fqBe0AdyJubm8+apu0TQjYB4KNcq/+tB8bYmWmalUKh8BsZpkXZGboIqd3e3n67v79nT09PzDRNtuhCj+gVPaN3ZAgahRZkr9fbxj+IAqAo9Ize+/3+FxFW4yCtn5lMZn95edkz7qMg9Ize0+l0mWfiQZ0KHN6fUinfHBUJoXdkcHjEiAL3QjaK0XRke88GgcZaKYE8uqH0KvAejZve39BNQOOmBDRuSkBlCWdJQZN8WVL6UDsYDODg4AB0XYdyuQzZbFZZ38oiipCVSgWur6/h8vLSusY6VVIC6kBeXV1BqVSyCl6rhJUOKkLu7OxYZWtrSymsVFA/SJxGYdnb21MKKw10GqTbsaZ5YIfDoSw7ckBnQbqdC7BHR0cwGo1kWAof9LWQrgEO9vz8HA4PD6XAhgrKQxaLxZmQrgkFsKGB8pBoeHd3900ribJhQwF9fHx8AYmG0bio5+dnqFarcHx8DJRSrxkf2PF4HIbFcEDr9fpMSFS324VGowEnJydwcXHhb0iAbTabYVi0RGxgfO7NGIbx5hXy0WjE2u02o5QGtsNtg2q1ymq1GptMJoFt8b1arRYbj8dv9oMMyGIzWSv2hFsFxArNMIw/uVwutE9xHrq7u4N8Pr8EAKZdWDIflaXT01PrPlUtpfNRTEa1Ws26Xltbg/X1dWV9KwVdXV2FlZUVK7MWCgWVXYPyZOQso8jcyPJLRsr3B+e1U5dk3bgpAY2bEtC4KQGNm9416GAeu11hyfb+IL4dD2q1oJS2J5NJxPD+Cb1TSlt2hRsxzf7FqcBDgz9wQSqKUUXP6B0ZeCYeGJ+0dQBIA8BSr9f7HtVjrOgdGWwW3TlrxJ+ucqdqWDqdznY+n/+q6/omIeTDXEL0SjHGhpTSM8Mwfm5sbPzipmemE1HxaJwmABPx8OCCinGFBzRtu+58lNkwzlg2uQ8giqBMuEdfLKWI2ceM0GFIMfEwvyQkSrxvg9ougvgAeSI5y3yk/h3EZzR6vhsx/cZBwV/6APAXigqHl1VdpZ8AAAAASUVORK5CYII=" alt="" /> 
		      <div class="float_message_2Position float_message_div">
		       <div class="float_message_2" :style="backStyle2">
		         回到顶部 
		       </div>
		      </div></li> 
		     <li class="float_message_li">
				 <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAFrElEQVRoge2bXUgbWRTHz9VE3Sg0foLUD8KqiOvHqg+CaJ9KRUVoEYqKhbzoKmJXBPtU+lQoFAQVfVgXMUJhl0X0waAkD+qDtfqgqPuBtUVfBD+bxK80Y4yznEsmO5mMcXXGZmL7h0vgZnDOL/fMueecuRJwi2VZ8CdCCPF7QYDE+jGcb7LKz0VCMEWCCs28CNwHlAM0Go3hxcXFPxFCagkhPwBA1M2ZK0nHLMv+zbLsb7Ozs78QQhgxYC/X5SA3NjaStFrtmFqtzgsPD4fQ0FCfX04pQrtdLhcwDANOp3PZZrNV6XS6TQ5LzEwkIUajMcJqtS45HA422IQ2W63WZbPZ/B3HcxFoyN7e3s/Hx8dBB8np5OSERQZk4YOG8FcTh0qlqkV3DVaFhYUBMvCZ+KCeVSWE5OMzGaxyx5MfhW7LB+Xow5QaeP6P3LaHC59R4YreWqkE5MG7lL7yYhK67m3T1+e630CvK4fDQYfSdGH1clV9/vwZRkZG4O3bt4AJR0tLC6SlpSkGV5YVtVqt8OrVK5iZmYHS0lKIjIyE3t5e2NnZkePPyyLJoKenp9Dd3Q0HBwfQ3t4OtbW10NbWRjfu/v5+ODs7ux2gU1NTsLW1Bc3NzZCenk7n4uLiQK/Xw+bmJpjNZjnslCzJoB8+fIDU1FTIzMz0ms/Ly4PCwkIYHx+HT58+BYrPI8mgGHguirKPHz+mnxMTE1JvI1mSQVNSUmjQOTw89PlOq9XSyLu2thYINi9JBs3NzaWfc3NzPt/hs/v+/XvIycmRehvJkgyamJgIGRkZMDk56RNhp6enQa1WQ3l5eaD4PJJlH62srKR7KcLyhXMxMTEQFRX4BqIsoBhxs7OzsUUKFovFax7dd2VlRY7bSJJsuW5dXR39HBoa8nT97927B3fv3oXBwcGAZ0mygcbGxtLtZHV1le6dKJVKBU1NTTRLwuwJXTlQkrV6KSkpgaKiIhgbG4OlpSU6l5CQAK2trXBycgKdnZ2wu7sbEFTZy7QnT57QTGlgYAA7/nROp9PR/Ndut8Pr16/h48ePnuuxw45bk8lk8nq+5Ra/94nQITabjblz546k22DygEBHR0fQ0dEBSUlJdH57exv6+vpgf3+frn5ERAQt63C1wd2qvH//PlRVVdFt6brCAkOr1WIn8Nw92BsBRWF+i7BY3Tx9+pSuKrjr1uHhYXj37h0NWphMlJWVQXR0NHX52dlZiI+Pp0XBdevZLwqKwpXr6uqiK9zQ0OCVITmdThqkMGDxhekiRm504+rqarrCigdF2Ww2WoRjyfbo0SN48ODBpW/m8Fk2GAywvLxMs6qHDx9e6Z5ioDfeHMPE/tmzZ5Cfn09bLQiNz64/aTQaWt8WFBTQykeO4v2LdAHxxU9jYyPU1NTQffbFixe07XLZcQJcGdyehO59Hd246wqFkffNmze0YMeCoKKigq4cHwZ/gNHRUbrl1NfX0z7UVRSQZ1RMCLK4uEijLObC6KpZWVmQnJxMgRcWFmB9fZ2mkJhaXvWll2JAOSEw1qvz8/PUpbmEAd0Vg1BxcfG1/q7iQIXCoIMDEwkpEgOVrYEth9Bt5Qg8Yvr27uW26RvobdNXDXp6WWqmZLltP/YHSq9wuVxLeLYuWIW2u1yuf/hMHCjLm2AZhvkDi+VgFdqODHwm0TKtp6fnV4Zh/sReTrAJbWYY5i9kuMh0LgXEtCTMZDJ9b7FYlvHwo9PpZM/Pz5VxolFEaBvaiIcdLRbLCtqODG4Wz8FH/qEjr5xXr9dHvHz5slGj0dQQQjIJIRolLjDLsnaWZVftdvvvz58/7zcYDA5+jssNfv3DB/UA+zv3qiBxQHxAPigIQUEAKxxKhuSPc0Ew8jFezJWVfk7QK7oKdxHuIjHjhWBiq64U8TMbIZz4Pw/4AVYqJCdhGiea1gXvUev/dHm+CgD/As9nprR3acRZAAAAAElFTkSuQmCC" alt="" /> 
		      <div class="float_message_3Position float_message_div">
		       <div class="float_message_3 " :style="backStyle2">
		        <p class="float_message_3PositionP1">客服热线：0571-88693669</p> 
		        <p>工作时间：08：30-17：30</p>
		       </div>
		      </div></li>
		    </ul>
		   </div>
		  </div>
	</div>
</template>


<script>
	export default {
	  data(){
	    return {
		  backStyle:{
		  			backgroundImage:
		  			  "url(" + require("@/assets/img/footerB.png") + ")",
		  			backgroundRepeat: "no-repeat",
		  			backgroundSize: "100%"
		  },
		  backStyle2:{
		  			backgroundImage:
		  			  "url(" + require("@/assets/img/footerfloat2.png") + ")",
		  			backgroundRepeat: "no-repeat",
		  			backgroundSize: "100%"
		  },
		 
	    }
	  },
	  
	mounted () {
	  window.addEventListener('scroll', this.scrollToTop)
	},
	destroyed () {
	  window.removeEventListener('scroll', this.scrollToTop)
},
	  methods: {
	    back() {
	      this.$router.go(-1)
	    },
		goCard(){
				   this.$router.push({
				       path:'/card'
				   })
		},
		goAbout(t){
			this.$router.push({ path: '/about', query: { id: t}  })
		},
		goHome(){
				   this.$router.push({
				       path:'/home'
				   })
		},
		goClassify(){
				   this.$router.push({
				       path:'/classify'
				   })
		},
	    backTop () {
	         const that = this
	         let timer = setInterval(() => {
	           let ispeed = Math.floor(-that.scrollTop / 5)
	           document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
	           if (that.scrollTop === 0) {
	             clearInterval(timer)
	           }
	         }, 16)
	     },
		  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
		   scrollToTop () {
		     const that = this
		     let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		     that.scrollTop = scrollTop
		   
		   }
	},
	  created: function () {
	    
	  }
	}
</script>

<style>
</style>

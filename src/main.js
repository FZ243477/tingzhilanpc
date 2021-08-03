// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import '@/assets/style/home.css'
import axios from 'axios'
import './assets/iconfont/iconfont.css'
import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)
/* 导入index.js */
import api from './api/index.js'
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   ak: 'zV2bHbzUGagYyMv82QGl8ZVsWUprIqqg'
// })
// 全局使用index.js 下的方法
Vue.prototype.$api = api
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
import Toasts from './components/Toast'
const Toast = {
  install: function (Vue) {
    // 创建一个Vue的“子类”组件
    const ToastConstructor = Vue.extend(Toasts)
    // 创建一个该子类的实例,并挂载到一个元素上
    const instance = new ToastConstructor()
    // 将这个实例挂载到动态创建的元素上,并将元素添加到全局结构中
    instance.$mount(document.createElement('div'))
    document.body.appendChild(instance.$el)

    // 在Vue的原型链上注册方法，控制组件
    Vue.prototype.$toast = (msg, duration = 1500) => {
      instance.message = msg
      instance.visible = true
      setTimeout(() => {
        instance.visible = false
      }, duration)
    }
  }
}
Vue.use(Toast)

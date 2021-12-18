import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.use(ElementUI);

import { router } from './router/index'

import '_a/style/transition.scss'
import '_a/style/reset.css'
import '_a/style/common.css'
import '_a/icon/iconfont.css'

Vue.config.productionTip = false;
Vue.prototype.bus = new Vue();

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')

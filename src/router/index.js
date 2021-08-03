import Vue from 'vue'
import Router from 'vue-router'
import welcome from '@/view/welcome'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => System.import('@/view/home.vue'),
      redirect: '/home',
      alias: '/home',
      children: [
        {
          path: 'home',
          component: welcome,
          meta: { title: '首页' }
        }
      ]
    },
    {
      path: '/home',
      component: () => System.import('@/view/home.vue'),
      name: '首页'
    },
    {
      path: '/contact',
      component: () => System.import('@/view/contact.vue'),
      name: '；联系我们'
    },
    {
      path: '/classify',
      component: () => System.import('@/view/classify.vue'),
      name: '休闲时刻'
    },
    {
      path: '/detail',
      component: () => System.import('@/view/detail.vue'),
      name: '详情'
    },
    {
      path: '/card',
      component: () => System.import('@/view/card.vue'),
      name: '下载卡'
    },
    {
      path: '/records',
      component: () => System.import('@/view/records.vue'),
      name: '下载记录'
    },
    {
      path: '/collection',
      component: () => System.import('@/view/collection.vue'),
      name: '我的收藏'
    },
    {
      path: '/search',
      component: () => System.import('@/view/search.vue'),
      name: '搜索'
    },
    {
      path: '/userInfo',
      component: () => System.import('@/view/userInfo.vue'),
      name: '个人设置'
    },
    {
      path: '/about',
      component: () => System.import('@/view/about.vue'),
      name: '关于我们'
    },
    {
      path: '/register',
      component: () => System.import('@/view/register.vue'),
      name: '注册'
    },
    {
      path: '/forget',
      component: () => System.import('@/view/forget.vue'),
      name: '忘记密码'
    },
    {
      path: '/login',
      component: () => System.import('@/view/login.vue'),
      name: '登录'
    },
    {
      path: '/verification',
      component: () => System.import('@/view/verification.vue'),
      name: '验证'
    }
  ]
})

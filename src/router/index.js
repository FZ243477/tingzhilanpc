import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

import Layout from '@/Layout'

const scrollBehavior = () => {
    return { x: 0, y: 0 }
}


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export const router = new Router({
    scrollBehavior,
    mode: 'history',
    routes: [
        {
            path: '/index',
            component: Layout,
            redirect: '/index',
            children:[
                {
                    name:'Index',
                    path: 'index',
                    component: () => import('@/views/Index'),
                },
                {
                    path: 'submit-demand',
                    component: () => import('@/views/SubmitDemand/submitDemand.vue'),
                    name: 'SubmitDemand',
                    meta: { title: '提交需求' }
                },
                {
                    path: 'mine',
                    component: () => import('@/views/Mine/index.vue'),
                    name: 'Mine',
                    meta: { title: '我的' }
                }
            ]
        },
		{
		    path: '/home',
		    component: () => import('@/views/Home/home.vue'),
		    name: 'Home'
		},
		{
		    path: '/classify',
		    component: () => import('@/views/Classify/classify.vue'),
		    name: 'Classify'
		},
		{
		    path: '/detail',
		    component: () => import('@/views/Classify/detail.vue'),
		    name: 'Detail'
		},
		{
		    path: '/card',
		    component: () => import('@/views/Card/card.vue'),
		    name: 'Card'
		},
		{
		    path: '/about',
		    component: () => import('@/views/About/about.vue'),
		    name: 'About'
		},
		{
		    path: '/userInfo',
		    component: () => import('@/views/User/userInfo.vue'),
		    name: 'userInfo'
		},
		{
		    path: '/collection',
		    component: () => import('@/views/User/collection.vue'),
		    name: 'collection'
		},
        {
            path: '/login',
            component: () => import('@/views/Login/login'),
            name: 'Login'
        },
        {
            path: '/',
            component: () => import('@/views/Welcome/welcome.vue'),
            name: 'Welcome'
        },
		{
		    path: '/search',
		    component: () => import('@/views/Search/search.vue'),
		    name: 'Search'
		},
		{
		    path: '/downList',
		    component: () => import('@/views/User/downList.vue'),
		    name: 'downList'
		},
    ]
})

const ignoreRoute = [
    'Index',
    'SubmitDemand'
];
router.beforeEach((to, from, next) => {
    Nprogress.start();
    let userInfo = Cookies.get('userInfo');
    next()
    // if(to.name === 'Login'){
    //     userInfo 
    //     ? next({
    //         path: '/index'
    //     }) 
    //     : next()
    // }else if(ignoreRoute.indexOf(to.name) >-1 ){
    //     next()
    // }else{
    //     userInfo 
    //     ? next() 
    //     : next({
    //         path: '/index'
    //     })
    // }
})
router.afterEach(() => {
    Nprogress.done();
})
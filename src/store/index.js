import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)



const state = {
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,

}

const mutations = {
    SET_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo;
    }
}

const actions = {

}

const store = new Vuex.Store({
    state,
    mutations,
    actions
})

export default store;
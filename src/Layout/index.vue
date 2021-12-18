<template>
    <div>
        <div class="header-wrapper">
            <img src="~_a/img/logo.png" style="width:126px; cursor:pointer;" @click="navIndex" />
            <el-input
                size="medium"
                v-model="keyword"
                placeholder="请输入内容"
                prefix-icon="el-icon-search"
            ></el-input>
            <el-button type="primary" plain @click='search'>搜索</el-button>
            <div class="btn-wrapper" v-if="userInfo">
                <span class="iconfont" style="font-size:30px;">&#xe716;</span>
                <span
                    class="iconfont"
                    style="font-size:22px; margin-left:10px; cursor:pointer;"
                    @click="navMine"
                >&#xe65f;</span>
            </div>
            <div class="btn-wrapper" v-else>
                <el-button type="text" @click="login">登录</el-button>
                <span>|</span>
                <el-button type="text">注册</el-button>
            </div>
        </div>
        <div class="search-wrapper" v-if="showTabs">
            <MenuList :list="tagList" />
        </div>
        <AppMain />
        <LoginWrapper :showLogin="showLogin" @close="closeLogin" />
    </div>
</template>

<script>
import Cookies from "js-cookie";
import AppMain from "./components/AppMain";
import MenuList from "./components/MenuList";
import LoginWrapper from "@/components/LoginWrapper.vue";
import { tagsIndex, searchImg } from "_api/api";
import { mapState } from 'vuex';
export default {
    components: {
        AppMain,
        MenuList,
        LoginWrapper
    },
    data() {
        return {
            keyword: "",
            tagList: [],
            showTabs: true,
            showLogin: false
        };
    },
    watch: {
        $route(ol) {
            if (ol.name === "Mine") {
                this.showTabs = false;
            } else {
                this.showTabs = true;
            }
        }
    },
    computed:{
        ...mapState([
            'userInfo'
        ])
    },
    methods: {
        getTags() {
            tagsIndex()
                .then(res => {
                    if (res.code === 1) {
                        let hotItem = {};
                        res.data.forEach(element => {
                            element.text = element.title;
                            if (element.title === "热门") {
                                hotItem = element;
                            }
                        });
                        res.data.splice(0, 1);
                        this.tagList = res.data.reverse();
                        this.tagList.unshift(hotItem);
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        navIndex() {
            this.$router.push({
                path: "/index"
            });
        },
        navMine() {
            this.$router.push({
                path: "/mine"
            });
        },
        search() {
            this.bus.$emit('search',this.keyword);
        },
        login() {
            this.showLogin = true;
        },
        closeLogin() {
            this.showLogin = false;
        }
    },
    created() {
        this.getTags();
    }
};
</script>
<style lang='scss' scoped>
@import "_a/style/global.scss";
/deep/ .el-button--text {
    color: #fff;
}
/deep/ .el-menu.el-menu--horizontal {
    border-bottom: none;
}
.header-wrapper {
    width: 100%;
    height: 120px;
    background-color: $backgColor;
    padding: 28px 288px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .logo-text {
        font-size: 36px;
        color: #fff;
        word-break: keep-all;
    }
    .el-input {
        margin: 0 20px;
    }
    .btn-wrapper {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 15px;
    }
}
.search-wrapper {
    width: 100%;
    height: 60px;
    box-shadow: 0px 1px 1px 0px rgba(35, 24, 21, 0.44);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
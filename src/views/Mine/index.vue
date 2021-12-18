<template>
    <div style="padding-top:76px;">
        <div style="display:flex; align-items:center;" v-if='userInfo'>
            <img :src="userInfo.avatar" style="width:76px; height:76px;" />
            <div style="margin-left:10px;">
                <b style="font-size:16px; margin-bottom:7px;">{{userInfo.nickname}}</b>
                <div>
                    <span style="color:#999999; font-size:14px;">已下载</span>
                    <b style="margin:0 7px;">{{userInfo.download_num}}张</b>
                    <span>|</span>
                    <span style="margin:0 7px; color:#999999; font-size:14px;">剩余下载次数</span>
                    <b>{{userInfo.free_download_num}}张</b>
                </div>
            </div>
        </div>
        <div style="width:100%; display:flex; justify-content:space-between;">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我的收藏" name="1">
                    <Waterfall :imgArr="collectList" @refresh = 'getCollect' :isCollect='true' />
                </el-tab-pane>
                <el-tab-pane label="我的下载" name="2">
                    <Waterfall :imgArr="boughtList" @refresh = 'getDownLoad' />
                </el-tab-pane>
                <el-tab-pane label="下载卡" name="3" v-if='userInfo && userInfo.is_elme !==1'>
                    <DownLoadCard />
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Waterfall from "@/components/waterfall.vue";
import Cookies from "js-cookie";
import DownLoadCard from "./components/DownLoadCard.vue";
import { seeMyBought, seeMyCollection, userIndex } from "_api/api";
import { mapState, mapMutations } from 'vuex';
export default {
    components: {
        DownLoadCard,
        Waterfall
    },
    data() {
        return {
            input4: "",
            activeName: "1",
            collectList: [],
            boughtList: [],
            vipRsp:null
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    watch: {},
    methods: {
        ...mapMutations({
            setUserInfo:'SET_USERINFO'
        }),
        handleClick(tab) {
            if (tab.name == 1) {
                this.getCollect();
            } else if (tab.name == 2) {
                this.getDownLoad();
            }
        },
        getCollect() {
            seeMyCollection({ token: this.userInfo.token })
                .then(res => {
                    if (res.code === 1) {
                        this.collectList = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getDownLoad() {
            seeMyBought({ token: this.userInfo.token })
                .then(res => {
                    if (res.code === 1) {
                        this.boughtList = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getUserInfo(){
            userIndex({
                token: this.userInfo.token
            }).then(res => {
                if(res.code === 1){
                    Cookies.set("userInfo", res.data.welcome, { expires: 7 });
                    this.setUserInfo(res.data.welcome)
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    created() {
        if (this.userInfo) {
            this.getUserInfo()
        }else{
            this.$router.push({
                path:'/index'
            })
        }
        this.getCollect();
    }
};
</script>
<style lang='scss' scoped>
/deep/ .el-tabs__nav-wrap::after {
    background-color: unset;
}
/deep/ .el-input__icon {
    height: auto;
}
</style>
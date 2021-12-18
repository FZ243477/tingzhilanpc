<template>
    <div>
        <div style="height:calc(100vh - 180px);">
            <el-scrollbar style="height:100%;" ref="scrollBox">
                <Waterfall
                    :imgArr="list"
                    :loading="loading"
                    @noLogin="setLogin"
                    @preview="previewImg"
                >
                    <template v-slot:pagination>
                        <div style="float:right;">
                            <el-pagination
                                @current-change="handle_material"
                                :current-page="pageNum"
                                :page-size="20"
                                layout="prev, pager, next, total, jumper"
                                :total="total"
                            ></el-pagination>
                        </div>
                    </template>
                </Waterfall>
            </el-scrollbar>
        </div>
        <LoginWrapper :showLogin="showLogin" @close="closeLogin" />
        <ImageDetail
            v-show="showDetail"
            :previewId="previewId"
            @close="closePreview"
            @noLogin="setLogin"
        />
    </div>
</template>

<script>
import Cookie from "js-cookie";
import Waterfall from "@/components/waterfall.vue";
import LoginWrapper from "@/components/LoginWrapper.vue";
import ImageDetail from "@/components/ImageDetail.vue";
import { classifyImg, searchImg, userIndex } from "_api/api";
import { mapState, mapMutations } from "vuex";
export default {
    components: {
        Waterfall,
        LoginWrapper,
        ImageDetail
    },
    data() {
        return {
            input: "",
            list: [],
            loading: false,
            pageNum: 1,
            tagsId: null,
            noData: false,
            showLogin: false,
            keyword: null,
            showDetail: false,
            previewId: null,
            total: 0
        };
    },
    watch: {
        $route(ol) {
            this.loading = true;
            this.tagsId = ol.query.id;
            this.pageNum = 1;
            this.noData = false;
            this.list = [];
            this.keyword = null;
            this.getList();
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    methods: {
        ...mapMutations({
            setUserInfo: "SET_USERINFO"
        }),
        navIndex() {
            this.$router.push({
                path: "/index"
            });
        },
        navMine() {
            this.$router.push({
                path: "/mine/mine"
            });
        },
        getList() {
            this.loading = true;
            classifyImg({
                tags_id: this.tagsId,
                page: this.pageNum,
                page_size: 20
            }).then(res => {
                if (res.code === 1) {
                    if (res.data.data.length) {
                        this.total = res.data.total;
                        // this.list = this.list.concat(res.data.data);
                        this.list = res.data.data;
                        this.$nextTick(() => {
                            setTimeout(() => {
                                this.loading = false;
                            }, 1000);
                        });
                    } else {
                        // this.pageNum--;
                        this.noData = true;
                    }
                } else {
                    this.$message.error(res.msg);
                }
            });
        },
        load() {
            console.log(this.noData);
            if (this.noData) {
                return false;
            }
            if (this.keyword) {
                this.loadSearch();
            } else {
                this.getList();
            }
        },
        closeLogin() {
            this.showLogin = false;
        },
        setLogin() {
            this.showLogin = true;
        },
        search(keyword) {
            this.keyword = keyword;
            this.list = [];
            this.noData = false;
            this.pageNum = 1;
            this.loadSearch();
        },
        loadSearch() {
            searchImg({
                keyword: this.keyword,
                page: this.pageNum,
                page_size: 20
            })
                .then(res => {
                    if (res.code === 1) {
                        // this.list = this.list.concat(res.data.data);
                        if(res.data.data.length){
                            this.list = res.data.data;
                            this.total = res.data.total;
                        }else{
                            this.$message.error('无法搜索到数据')
                        }
                        
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        previewImg(data) {
            this.showDetail = true;
            this.previewId = data.id;
            console.log(this.previewId);
        },
        closePreview() {
            this.showDetail = false;
        },
        GetUrlParam(paraName) {
            var url = document.location.toString();
            var arrObj = url.split("?");
            if (arrObj.length > 1) {
                var arrPara = arrObj[1].split("&");
                var arr;
                for (var i = 0; i < arrPara.length; i++) {
                    arr = arrPara[i].split("=");
                    if (arr != null && arr[0] == paraName) {
                        return arr[1];
                    }
                }
                return "";
            } else {
                return "";
            }
        },
        handle_material(val) {
            this.pageNum = val;
            this.load();
        }
    },
    created() {
        this.bus.$on('search',data => {
            this.search(data)
        })
        let urlToken = this.GetUrlParam("token");
        if (urlToken) {
            userIndex({ token: urlToken }).then(res => {
                if (res.code == 1) {
                    Cookie.set("userinfo", res.data.welcome, { expires: 7 });
                    this.setUserInfo(res.data.welcome);
                } else {
                    this.$vux.toast.text(res.msg, "middle");
                }
            });
        }
        this.tagsId = this.$route.query.id || 82;
        this.getList();
    }
};
</script>
<style lang='scss' scoped>
@import "_a/style/global.scss";
/deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
}
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
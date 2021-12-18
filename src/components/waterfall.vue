<template>
    <!-- <div id="root" v-loading="loading">
        <div class="item" v-for="(item,index) in imgArr" :key="index" @click='previewImg(item)'>
            <img class="itemImg" :src="item.url" alt />
            <div class="control-box">
                <div style='height:100%; display: flex; align-items: center; justify-content: space-between; font-size:12px;'>
                    <span>{{item.title}}</span>
                    <div>
                        <span class="iconfont download-btn" style="font-size:16px; cursor:pointer;" @click.stop='download(item.id)'>&#xe694;</span>
                        <span class="iconfont collection-btn" style="font-size:16px; margin-left:10px; cursor:pointer;" :style="{color:isCollect? '#1989FA' : '' }" @click.stop='collect(item.id)'>&#xe60c;</span>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
    <div class="content-wrapper">
        <div class="img-box">
            <div class="item" v-for="(item,index) in imgArr" :key="index" @click="previewImg(item)">
                <img class="itemImg" :src="item.url" alt />
                <div class="control-box">
                    <div
                        style="height:100%; display: flex; align-items: center; justify-content: space-between; font-size:12px;"
                    >
                        <span>{{item.title}}</span>
                        <div>
                            <span
                                class="iconfont download-btn"
                                style="font-size:16px; cursor:pointer;"
                                @click.stop="download(item.id)"
                            >&#xe694;</span>
                            <span
                                class="iconfont collection-btn"
                                style="font-size:16px; margin-left:10px; cursor:pointer;"
                                :style="{color:isCollect? '#1989FA' : '' }"
                                @click.stop="collect(item.id)"
                            >&#xe60c;</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <slot name='pagination' />
    </div>
</template>

<script>
import { collection, download2 } from "_api/api";
import Cookie from "js-cookie";
export default {
    name: "Waterfall",
    props: ["imgArr", "loading", "isCollect"],
    data() {
        return {
            userInfo: null
        };
    },
    methods: {
        collect(id) {
            if (this.userInfo) {
                collection({
                    image_id: id,
                    token: this.userInfo.token
                })
                    .then(res => {
                        console.log(res);
                        if (res.code == 1 || res.code == 2) {
                            this.$message.success(res.msg);
                            this.$emit("refresh");
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$emit("noLogin");
            }
        },
        download(id) {
            if (this.userInfo) {
                download2({
                    image_id: id,
                    token: this.userInfo.token
                })
                    .then(res => {
                        console.log(res);
                        if (res.code == "1001") {
                            this.downloadImg(res.data.url, "食图图图片");
                        } else {
                            this.$message.error(res.msg);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.$emit("noLogin");
            }
        },
        downloadImg(href, name) {
            let eleLink = document.createElement("a");
            eleLink.download = name || "pic";
            eleLink.href = href;
            eleLink.click();
            eleLink.remove();
        },
        previewImg(item) {
            this.$emit("preview", item);
        }
    },
    created() {
        if (Cookie.get("userInfo")) {
            this.userInfo = JSON.parse(Cookie.get("userInfo"));
        }
    }
};
</script>

<style scoped>
/* 瀑布流最外层 */
#root {
    margin: 20px auto;
    max-width: 1100px;
    /* column-count: 4;
    column-width: 240px;
    column-gap: 20px; */
}
.img-box {
    display: flex;
    flex-wrap: wrap;
}
/* 每一列图片包含层 */
.item {
    width: 240px;
    height: 160px;
    margin: 10px;
    break-inside: avoid;
    background: #fff;
    position: relative;
    border-radius: 8px;
}
.itemImg {
    height: 100%;
    object-fit: cover;
}
.control-box {
    width: 100%;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    bottom: 0;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    display: none;
}
.item:hover .control-box {
    display: block;
}
/* 图片 */
.itemImg {
    width: 100%;
    vertical-align: middle;
    border-radius: 8px;
}
</style>
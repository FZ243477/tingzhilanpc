<template>
    <div class="content" @click='close' v-loading="loading">
        <span class="iconfont" @click="close">&#xe600;</span>
        <div class="wrapper" @click.stop='noHandle'>
            <div class="top-wrapper">
                <p v-if='msgDetail'>{{msgDetail.title}}</p>
                <div class="btn-box">
                    <div class="btn-items" @click='collect'>
                        <span class="iconfont">&#xe60c;</span>
                        <span>加入收藏</span>
                    </div>
                    <div class="btn-items download-btn" @click='download'>
                        <span class="iconfont">&#xe694;</span>
                        <span>立即下载</span>
                    </div>
                </div>
            </div>
            <div class="img-wrapper">
                <img :src="msgDetail.url" v-if='msgDetail'>
            </div>
            <div class="same-wrapper">
                <div class="same-head">更多相似照片</div>
                <Waterfall :imgArr="msgDetail.recommend" v-if='msgDetail' @preview='previewImg'></Waterfall>
            </div>
        </div>
    </div>
</template>

<script>
import Waterfall from './waterfall.vue';
import {seeImageDetail,collection, download2} from '_api/api';
import Cookie from 'js-cookie';
export default {
    name:'ImageDetail',
    props:['previewId'],
    components:{Waterfall},
    data() {
        return {
            userInfo:null,
            msgDetail:null,
            loading:false,
        };
    },
    watch: {
        previewId(){
            this.getDetail()
        }
    },
    methods: {
        noHandle(){
            return true;
        },
        getDetail(){
            seeImageDetail({
                id:this.previewId,
                token: this.userInfo?.token
            }).then(res=>{
                console.log(res)
                setTimeout(()=>{
                    this.loading = false;
                },1000)
                if(res.code === 1){
                    this.msgDetail = res.data;
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        close(){
            this.$emit('close')
        },
        collect(){
            if(this.userInfo){
                collection({
                    image_id:this.previewId,
                    token:this.userInfo.token
                }).then(res=>{
                    console.log(res)
                    if(res.code == 1 || res.code == 2){
                        this.$message.success(res.msg)
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$emit('noLogin')
            }
        },
        download(){
            if(this.userInfo){
                download2({
                    image_id:this.previewId,
                    token:this.userInfo.token
                }).then(res=>{
                    console.log(res)
                    if(res.code == '1001'){
                        this.downloadImg(res.data.url,'食图图图片')
                    }else{
                        this.$message.error(res.msg)
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }else{
                this.$emit('noLogin')
            }
        },
        downloadImg(href, name) {
          let eleLink = document.createElement('a')
          eleLink.download = name || 'pic'
          eleLink.href = href
          eleLink.click()
          eleLink.remove()
        },
        previewImg(item){
            this.loading = true;
            this.previewId = item.id;
        }
    },
    created(){
        this.userInfo = Cookie.get('userInfo') ? JSON.parse(Cookie.get('userInfo')) : null;
    }
};
</script>
<style lang='scss' scoped>
.content{
    width:100%;
    position:fixed;
    top:120px;
    bottom:0;
    left:0;
    background-color: #000;
    padding:0 240px;
    box-sizing: border-box;
    z-index:9;
    >.iconfont{
        position:absolute; left:15px; top:15px; font-size:14px; color:#fff; cursor:pointer;
    }
    .wrapper{
        width:100%;
        height:100%;
        overflow-y:scroll;
        background-color: #fff;
        border-radius: 8px;
        .top-wrapper{
            height:76px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding:14px 15px;
            box-sizing: border-box;
            .btn-box{
                display:flex; align-items: center;
                .btn-items{
                    padding:4px 12px;
                    box-sizing: border-box;
                    border-radius: 8px;
                    border: 1px solid #000;
                    font-size:18px;
                    margin-left:10px;
                    >.iconfont{
                        margin-right:6px;
                    }
                }
                .download-btn{
                    background-color:#1989FA;
                    color:#fff;
                    border:none;
                }
            }
        }
        .img-wrapper{
            width:100%; display:flex; justify-content: center; padding:0 180px; box-sizing: border-box;
            img{
                width:100%; height:517px; object-fit: cover;
            }
        }
        .same-wrapper{
            width:100%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            margin-top:20px;
            margin-bottom:15px;
            padding:0 60px;
            box-sizing: border-box;
            .same-head{
                text-align: center;
                font-size:18px;
            }
            .same-img{
                width:100%; height:100px; background-color:blue;
            }
        }
    }
}
</style>
<template>
    <div>
        <div
            style="width:341px; height:174px; color:#936549; padding:22px; 28px; box-sizing:border-box;"
            :style="backgroundDiv"
        >
            <p style="font-size:18px; margin-bottom:15px;">我的下载卡</p>
            <div style="width:100%; display:flex; justify-content: space-between; font-size:13px;">
                <span style="color:#BD957C;">将在{{vipTime}}到期</span>
                <span style="color:#fff;">开通自动续费></span>
            </div>
            <div style="display:flex; align-items:center; margin-top:50px;">
                <div style="display:flex; align-items:center;">
                    <span>已下载</span>
                    <h3 style="margin-left:8px;">9张</h3>
                </div>
                <div style="display:flex; align-items:center; margin-left:35px;">
                    <span>剩余下载次数</span>
                    <h3 style="margin-left:8px;">21张</h3>
                </div>
            </div>
        </div>
        <div style="margin-top:40px;">
            <div style="display:flex; align-items:center; margin-bottom:15px;">
                <h2 style="font-size:23px; color:#333333;">购买下载卡</h2>
                <span style="font-size:15px; color:#999999; margin-left:10px;">开通后有效期为365天</span>
            </div>
            <div style="display:flex;" v-if="vipRsp && vipRsp.list.length">
                <div
                    v-for="item in vipRsp.list"
                    :key="item.id"
                    @click="vipType=item.id"
                    :class="{selected:vipType==item.id}"
                    style="width:136px; height:174px; margin-right:15px; border-radius:8px; display:flex; flex-direction:column; align-items: center; border:1px solid #808080; box-sizing:border-box; padding:20px 0;"
                >
                    <p style="font-size:24px; font-weight:bold;">{{item.download_num}}张</p>
                    <img
                        src="~_a/img/crown.png"
                        style="width:67px; height:44px; margin:10px 0; flex-grow:0; flex-shrink:0;"
                    />
                    <div style="font-size:32px; color:#1989FA;">￥{{item.price}}</div>
                </div>
            </div>
        </div>
        <div style='color:#1989FA; font-size:20px; margin-top:20px;'>支付方式</div>
        <el-radio-group v-model="typeData" style='display:flex; flex-direction:column;'>
            <el-radio label="wechat" style="display:flex; align-items: center; justify-content: space-between; margin-top:15px;">
                <div>
                    <span>微信支付</span>
                    <span class="iconfont" style="color: #6BCC03;">&#xe607;</span>
                </div>
            </el-radio>
            <el-radio label="alipay" style="display:flex; align-items: center; justify-content: space-between; margin-top:15px;">
                <div>
                    <span>支付宝支付</span>
                    <span class="iconfont" style="color:#06B4FD;">&#xe60a;</span>
                </div>
            </el-radio>
        </el-radio-group>
        <div
            @click="buyNow"
            style="width:440px; heght:41px; margin:40px 0; text-align:center; line-height:41px; background-color:#1989FA; color:#fff; border-radius:8px; font-size:23px;"
        >立即购买</div>
        <div
            v-if='showQrcode'
            style="width:100%; height:100vh; background-color:rgba(0,0,0,0.4); position:fixed; top:0; left:0; z-index:9999; display:flex; align-items:center; justify-content:center;"
        >
        <div style='width:360px; height:360px; display:flex; align-items:center; justify-content:center; flex-direction:column; background-color:#fff; position:relative;'>
            <div @click='closeBuy' style="width:10px; height:10px; position:absolute; right:10px; top:10px; cursor:pointer;">x</div>
            <div id="qrcode"></div>
            <div style='width:100%; text-align:center; font-size:20px; margin-top:20px;' v-if='typeData === "wechat"'>
                <span class="iconfont" style="color: #6BCC03; margin-right:5px; font-size:20px;">&#xe607;</span>
                <span>微信扫码支付</span>
            </div>
            <div style='width:100%; text-align:center; font-size:20px; margin-top:20px;' v-else>
                <span class="iconfont" style="color:#06B4FD; margin-right:5px; font-size:20px;">&#xe60a;</span>
                <span>支付宝扫码支付</span></div>
        </div>
            <div id="qrcode"></div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import { vipList, purchaseMember, checkPaySuccess } from "_api/api.js";
import QRCode2 from "qrcodejs2";
import { mapState } from "vuex";
export default {
    name: "DownLoadCard",
    data() {
        return {
            backgroundDiv: {
                backgroundImage: "url(" + require("_a/img/vip.png") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover"
            },
            vipRsp: null,
            vipType: "",
            typeData: "wechat",
            showQrcode: false,
            linkUrl: "",
            buyInterval:null,
            out_trade_no:null
        };
    },
    computed: {
        vipTime() {
            if (this.userInfo.expire_time) {
                return moment
                    .unix(this.userInfo.expire_time)
                    .format("YYYY-MM-DD HH:mm:ss");
            }else{
                return null;
            }
        },
        ...mapState(['userInfo'])
    },
    methods: {
        closeBuy(){
            this.linkUrl = null;
            this.out_trade_no = null;
            this.showQrcode = false;
            clearInterval(this.buyInterval)
            this.buyInterval = null;
        },
        qrcode() {
            let qrcode = new QRCode2("qrcode", {
                width: 200,
                height: 200, // 高度
                text: this.linkUrl // 二维码内容
                // render: 'canvas' ,   // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                // background: '#f0f',   // 背景色
                // foreground: '#ff0'    // 前景色
            });
        },
        getVipList() {
            vipList({ token: this.userInfo.token })
                .then(res => {
                    if (res.code === 1) {
                        this.vipRsp = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(res => {
                    console.log(res);
                });
        },
        buyNow() {
            if(!this.vipType){
                this.$message.error('请先选择需要购买的会员卡')
                return false;
            }
            purchaseMember({
                token: this.userInfo.token,
                member_id: this.vipType,
                type: this.typeData,
                pay_type: "scan"
            }).then(res => {
                this.showQrcode = true;
                this.out_trade_no = res.out_trade_no
                if(this.typeData === 'wechat'){
                    this.linkUrl = res.code_url ;
                }else{
                    this.linkUrl = res.qr_code ;
                }
                this.$nextTick(()=>{
                    this.qrcode()
                    this.buyInterval = setInterval(()=>{
                        console.log(this)
                        this.checkPayStatus()
                    },1000)
                })
            });
        },
        checkPayStatus(){
            checkPaySuccess({
                token: this.userInfo.token,
                type:1,
                out_trade_no:this.out_trade_no
            }).then(res=>{
                if(res.code === 1){
                    this.$message.success('支付成功')
                    setTimeout(()=>{
                        this.linkUrl = null;
                        this.out_trade_no = null;
                        this.showQrcode = false;
                        clearInterval(this.buyInterval)
                        this.buyInterval = null;
                        this.$router.go(0)
                    },500)
                }
            })
        }
    },
    created() {
        this.getVipList();
    }
};
</script>
<style lang='scss' scoped>
/deep/ .el-radio{
    margin-right: 0;
}
.selected {
    border-color: #1989fa !important;
}
</style>
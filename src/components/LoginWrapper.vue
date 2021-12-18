<template>
    <div
        v-if="showLogin"
        style="width:100%; height:100vh; background-color:rgba(0,0,0,0.4); position:fixed; top:0; left:0; z-index:9;"
        @click="close"
    >
        <div class="login-wrapper" @click.stop="noClick">
            <h2 style="font-size:30px; line-height:32px; color:#1989FA; margin-bottom:52px;">用户登录</h2>
            <el-input v-model="account" placeholder="请输入账号" style="margin-bottom:15px;"></el-input>
            <el-input
                placeholder="请输入密码"
                v-model="password"
                show-password
                style="margin-bottom:15px;"
            ></el-input>
            <div style="display:flex; aling-items:center; margin-bottom:40px;">
                <el-input v-model="captcha" placeholder="验证码" style="width:200px;"></el-input>
                <img :src="verifyImg" style="width:96px; height:42px; margin:0 5px;" ref="codeImg" />
                <span
                    style="font-size:11px; color:#666666; line-height:42px; cursor:pointer;"
                    @click="changeCode"
                >换一张</span>
            </div>
            <div
                style="width:341px; height:42px; border-radius:8px; background-color:#1989FA; color:#fff; text-align:center; line-height:42px; font-size:15px;"
                @click="handleLogin"
            >登录</div>
            <div
                style="color:#666666; font-size:15px; line-height:32px; margin-top:15px; text-align:left;"
            >忘记密码?</div>
            <div
                style="width:342px; color:#666666; font-size:15px; text-align:center; line-height:32px; position:absolute; bottom:40px;"
            >
                <span>还没有账号?</span>
                <span style="color:#1989FA;">去注册</span>
            </div>
        </div>
    </div>
</template>

<script>
import { login, verify } from "_api/api";
import Cookie from "js-cookie";
import { arrayBufferToBase64 } from "_utils/utils";
import { mapMutations } from "vuex";
export default {
    name: "LoginWrapper",
    components: {},
    props: ["showLogin"],
    data() {
        return {
            account: "",
            password: "",
            captcha: "",
            verifyImg: null
        };
    },
    methods: {
        ...mapMutations({
            setUserInfo : 'SET_USERINFO'
        }),
        noClick() {
            return true;
        },
        handleLogin() {
            login({
                account: this.account,
                password: this.password,
                captcha: this.captcha
            })
                .then(res => {
                    if (res.code === 1) {
                        this.$message.success(res.msg);
                        Cookie.set("userInfo", res.data.userinfo, { expires: 7 });
                        this.setUserInfo(res.data.userinfo);
                        if (this.$route.name === "Index") {
                            this.$router.go(0);
                        } else {
                            this.$router.replace({ path: "/index" });
                        }
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        close() {
            this.$emit("close");
        },
        getVerify() {
            verify().then(res => {
                let url = arrayBufferToBase64(res);
                this.verifyImg = "data:image/jpeg;base64," + url;
            });
        },

        changeCode() {
            this.getVerify();
        }
    },
    created() {
        this.getVerify();
    }
};
</script>
<style lang='scss' scoped>
.login-wrapper {
    width: 550px;
    height: 584px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.8);
    margin-left: -275px;
    position: absolute;
    top: 196px;
    left: 50%;
    padding: 72px 104px 0;
    box-sizing: border-box;
    text-align: center;
}
</style>
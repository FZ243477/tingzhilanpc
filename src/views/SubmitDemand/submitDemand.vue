<template>
    <div class="content">
        <div>
            <h2 style="font-size:20px; color:#1989FA;">找不到您想要的照片？提交您的需求，72小时为您研发交稿</h2>
        </div>
        <div>
            <div style="font-size:14px; margin-top:7px;">姓名</div>
            <el-input v-model="user_name" placeholder="请输入内容" style='max-width:718px;'></el-input>
        </div>
        <div>
            <div style="font-size:14px;">电话</div>
            <el-input v-model="phone" placeholder="请输入内容" style='max-width:718px; margin-top:7px;'></el-input>
        </div>
        <div>
            <div style="font-size:14px;">您的需求</div>
            <el-input
                type="textarea"
                :autosize="{ minRows: 8, maxRows: 8}"
                placeholder="请输入内容"
                v-model="content"
                style='max-width:718px; margin-top:7px;'
            ></el-input>
        </div>
        <div style='width:718px; text-align:right;'>
            <el-button type="primary" @click='submitDemand'>提交</el-button>
        </div>
    </div>
</template>

<script>
import {feedbackAdd} from '_api/api'
export default {
    components: {},
    data() {
        return {
            user_name: "",
            phone: "",
            content:""
        };
    },
    methods: {
        submitDemand(){
            feedbackAdd({
                user_name:this.user_name,
                phone:this.phone,
                content:this.content
            }).then(res=>{
                console.log(res)
                if(res.code === 1){
                    this.user_name= "";
                    this.phone= "";
                    this.content="";
                    this.$message.success(res.msg)
                }else{
                    this.$message.error(res.msg)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    created() {},
    mounted() {}
};
</script>
<style lang='scss' scoped>
.content {
    width: 100%;
    >div{
        margin-top:28px;
    }
}
</style>
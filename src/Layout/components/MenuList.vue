<template>
    <div class="content">
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#1989FA"
        >
            <template v-for="(item,index) in list">
                <el-submenu
                    v-if="item.childlist && item.childlist.length>0"
                    :key="index"
                    :index="String(index)"
                >
                    <template slot="title">
                        <span>{{item.title}}</span>
                    </template>
                    <div v-if="item.childlist && item.childlist.length>0" style="overflow-x:hidden;">
                        <el-menu-item
                            v-for="(childItem,childIndex) in item.childlist"
                            :key="childIndex"
                            :index="String(childItem.id)"
                        >{{childItem.title}}</el-menu-item>
                    </div>
                </el-submenu>
                <el-menu-item v-else :index="String(item.id)" :key="index">
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </template>
        </el-menu>
        <span style="color:#1989FA; font-size:14px; cursor:pointer;" @click="navDemand">没有想要的图？</span>
    </div>
</template>

<script>
export default {
    name: "MenuList",
    props: ["list"],
    data() {
        return {
            activeIndex: ""
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleSelect(keyPath) {
            this.$router.push({
                path:'/index',
                query:{
                    id:keyPath
                }
            })
        },
        navDemand(){
            this.$router.push({
                path:'/submit-demand'
            })
        }
    },
    created() {
        
    }
};
</script>
<style lang='scss' scoped>
.content {
    width: 100%;
    height: 60px;
    box-shadow: 0px 1px 1px 0px rgba(35, 24, 21, 0.44);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
<template>
    <div class="waiter_details">
        <el-button type="text" class="el-icon-d-arrow-left" @click="backHander">返回</el-button>
        <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</P>
        <p>员工名称：{{waiter.realname}}</p>
        <span>----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
        <p>员工QQ：{{waiter.qq}}</p>
         <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</P>
        <p>员工身份证：{{waiter.idCard}}</p>
         <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</P>
        <p>员工身份证照片:</p>
            <img :src="waiter.idcardPhotoPositive" alt="" width='300'>
            <img :src="waiter.idcardPhotoNegative" alt="" width='300'>
    </div>
</template>
<script>
import { mapState, mapMutations ,mapActions } from 'vuex';
export default {
    data(){
        return{
            waiter:{}
        }
    },
    // computed:{
    //     ...mapState("waiter",["waiterId"])
    // },
    created(){
        // let id = this.$route.query.id;
        // //通过id查询详情信息
        // this.findByIdwaiter();
        this.waiter = this.$route.query.waiter
    },
    methods:{
        ...mapMutations("waiter",["refreswaiterId"]),
        ...mapActions("waiter",["findByIdwaiter"]),
        //返回上一页面
        backHander(){
            this.$router.go(-1);
        }
    }
}
</script>
<style>

</style>
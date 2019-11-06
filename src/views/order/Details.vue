<template>
    <div class="order_details">
        <el-button type="text" class="el-icon-d-arrow-left" @click="backHander">返回</el-button>
        <p>商品介绍：{{order.description}}</p>
        <p>商品单价：{{order.price}}</p>
        <p>商品图片：</p>
            <img :src="order.photo" alt=""  width='300'>
        
    </div>
</template>
<script>
import { mapState, mapMutations ,mapActions } from 'vuex';
export default {
    data(){
        return{
            order:{}
        }
    },
    // computed:{
    //     ...mapState("order",["orderId"])
    // },
    created(){
        // let id = this.$route.query.id;
        // //通过id查询详情信息
        // this.findByIdorder();
        this.order = this.$route.query.order
    },
    methods:{
        ...mapMutations("order",["refresorderId"]),
        ...mapActions("order",["findByIdorder"]),
        //返回上一页面
        backHander(){
            this.$router.go(-1);
        }
    }
}
</script>
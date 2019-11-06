<template>
    <div class="product_details">
        <el-button type="text" class="el-icon-d-arrow-left" @click="backHander">返回</el-button>
         <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</P>
        <p>商品介绍：{{product.description}}</p>
         <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</P>
        <p>商品单价：{{product.price}}</p>
         <p>-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</P>
        <p>商品图片：</p>
            <img :src="product.photo" alt=""  width='300'>
        
    </div>
</template>
<script>
import { mapState, mapMutations ,mapActions } from 'vuex';
export default {
    data(){
        return{
            product:{}
        }
    },
    // computed:{
    //     ...mapState("product",["productId"])
    // },
    created(){
        // let id = this.$route.query.id;
        // //通过id查询详情信息
        // this.findByIdproduct();
        this.product = this.$route.query.product
    },
    methods:{
        ...mapMutations("product",["refresProductId"]),
        ...mapActions("product",["findByIdproduct"]),
        //返回上一页面
        backHander(){
            this.$router.go(-1);
        }
    }
}
</script>

<style>

</style>
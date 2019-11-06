import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default {
  namespaced:true,
  state:{
    products:[],
    loading:false,
    category:[],
    visible:false,
    productId:{}//当前产品
  },
  getters:{
    productSize(state){
      return state.products.length;
    },
    orderProduct:(state)=>{
      return function(flag){
        state.products.sort((a,b)=>{
          if(a[flag] > b[flag]) {
            return -1;
          } else {
            return 1;
          }
        })
        return state.products;
      }
    }
  },
  mutations:{
    //加载
    endLoading(state){
      state.loading = false;
    },
    beginLoading(state){
      state.loading = true;
    },
    //数据
    refresProduct(state,products){
      state.products = products;
    },
    refresCategory(state,category){
      state.category = category;
    },
    refresProductId(state,productId){
      state.productId = productId;
    },
    //模态框
    showModel(state){
      state.visible = true;
    },
    closeModel(state){
      state.visible = false;
    }
  },
  actions:{
    //通过id查找详情页面
    async findByIdproduct(context,id){
      const response = await get("http://47.93.46.32:6677/product/findById",{id})
      context.commit("refresProductId",response.data);
    },
    async findAllproduct({commit}){
      commit("beginLoading");
      let response = await request.get("http://47.93.46.32:6677/product/findAll");
      commit("refresProduct",response.data);
      setTimeout(()=>{
        commit("endLoading")
      },1000)
    },
    //查找栏目
    async findAllcategory({commit}){
      let response = await request.get("http://47.93.46.32:6677/category/findAll")
      commit("refresCategory",response.data);
    },
    //通过id删除
    async deleteProduct(context,id){
      let response = await request.get("http://47.93.46.32:6677/product/deleteById?id="+id);
      context.dispatch("findAllproduct");
      return response;
    },
    //批量删除
    async batchDeleteProduct(context,ids){
      let response = await post_array("http://47.93.46.32:6677/product/batchDelete",{ids})
      context.dispatch("findAllproduct");
      return response;
    },
    //添加
    async saveProduct({commit,dispatch},payload){
      let response = await post("http://47.93.46.32:6677/product/saveOrUpdate",payload)
      //刷新页面
      dispatch("findAllproduct");
      commit("closeModel");
      return response;
    }
  }
}
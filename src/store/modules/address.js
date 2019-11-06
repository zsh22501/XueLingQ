import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default {
  namespaced:true,
  state:{
    // customers:[],
    visible:false,
    title:"添加地址信息",
    loading:false,
    addresses:{}
  },
  // getters:{
  //   customerSize(state){
  //     return state.customers.length;
  //   },
  //   orderCustomer:(state)=>{
  //     return function(flag){
  //       state.customers.sort((a,b)=>{
  //         if(a[flag] > b[flag]){
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       })
  //       return state.customers;
  //     }
  //   }
  // },
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    refreshAddresses(state,addresses){
      state.addresses = addresses;
    },
    setTitle(state,title){
      state.title = title;
    },
    beginLoading(state){
      state.loading = true;
    },
    endLoading(state){
      state.loading = false;
    }
  },
  actions:{
  //   async batchDeleteCustomer(context,ids){
  //     // 1. 批量删除
  //     let response = await post_array("/customer/batchDelete",{ids})
  //     // 2. 分发
  //     context.dispatch("findAllCustomers");
  //     // 3. 返回结果
  //     return response;
  //   },
    async deleteAddressById(context,id){
      let response = await request.get("/address/deleteById?id="+id);
      context.dispatch("findAllAddresses");
      return response;
    },
    async findAllAddresses({dispatch,commit}){
      // 1. ajax查询
      commit("beginLoading");
      let response = await request.get("/address/findAll");
      // 2. 将查询结果更新到state中
      commit("refreshAddresses",response.data);
      setTimeout(()=>{
        commit("endLoading")
      },1000)
    },
    // payload 顾客信息
    async saveOrUpdateAddress({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await post("/address/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllAddresses");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    }
  }
}
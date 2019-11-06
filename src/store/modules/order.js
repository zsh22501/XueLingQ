import request from '@/utils/request'
import {get} from '@/http/axios'
import moment from 'moment'

export default {
  namespaced:true,
  state:{
    orders:[],
    message:'',
    // visible:false,
    // title:"添加顾客信息",
    loading:false
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
  getters:{
    filterOrdersByStatus(state){
      return (status)=>{
        return state.orders.filter((item)=>{
          return item.status === status;
        })
      }
    }
  },
  // mutations:{
  //   resetOrders(state,orders){
  //     state.orders = orders;
  //   },
  //   resetMessage(state,message){
  //     state.message = message;
  //   }
  // },
  mutations:{
    // resetOrders(state,orders){
    //   state.orders = orders;
    // },
    resetMessage(state,message){
      state.message = message;
    },
    // showModal(state){
    //   state.visible = true;
    // },
    // closeModal(state){
    //   state.visible = false;
    // },
    refreshOrders(state,orders){
      state.orders = orders;
    },
    // setTitle(state,title){
    //   state.title = title;
    // },
    beginLoading(state){
      state.loading = true;
    },
    endLoading(state){
      state.loading = false;
    }
  },
  actions:{
    // 派单
    async sendOrder({commit,dispatch},params){
      console.log("2",params);
      let response = await get("/order/sendOrder",params);
      console.log(response);
      dispatch("findAllOrders");
      return response;
    },
    // 取消派单
    async cancelSendOrder({commit,dispatch},orderId){
      let response = await request.get("/order/cancelSendOrder?orderId="+orderId);
      dispatch("findAllOrders");
      return response;
    },
  //   async batchDeleteCustomer(context,ids){
  //     // 1. 批量删除
  //     let response = await post_array("/customer/batchDelete",{ids})
  //     // 2. 分发
  //     context.dispatch("findAllCustomers");
  //     // 3. 返回结果
  //     return response;
  //   },
    // async deleteCustomerById(context,id){
    //   let response = await request.get("/customer/deleteById?id="+id);
    //   context.dispatch("findAllCustomers");
    //   return response;
    // },
    async findAllOrders({dispatch,commit}){
      // 1. ajax查询
      commit("beginLoading");
      let response = await request.get("/order/findAll");
      response.data.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss') 
      })
      // 2. 将查询结果更新到state中
      commit("refreshOrders",response.data);
      setTimeout(()=>{
        commit("endLoading")
      },1000)
    },
    // payload 顾客信息
    // async saveOrUpdateCustomer({commit,dispatch},payload){
    //   // 1. 保存或更新
    //   let response = await post("/customer/saveOrUpdate",payload)
    //   // 2. 刷新页面
    //   dispatch("findAllCustomers");
    //   // 3. 关闭模态框
    //   commit("closeModal");
    //   // 4. 提示
    //   return response;
    // }
  }
}
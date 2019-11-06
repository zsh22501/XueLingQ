// import {get,post,post_array,post_json} from '../http/axios'
import {get, post_array,post} from '@/http/axios'
export default {
    namespaced:true,
    state:{
        visible:false,
        categorys:[],
        title:"添加栏目信息",
        categories:[]
        
      },
      //同步
      mutations:{
        showModal(state){
          state.visible = true;
        },
        closeModal(state){
          state.visible = false;
        },
        // 需要接收一个参数，这个参数就是categorys
        refreshCategorys(state,categorys){
          // console.log("state ->" ,state); 
          // console.log("categorys",categorys);
          state.categorys = categorys;
        },
        
        setTitle(state,title){
          state.title = title;
        }
        
      },
      //异步
      actions:{

        //批量删除
        async batchDeleteCategorys(context,ids){
          let response = await post_array("/category/batchDelete",{ids});
          context.dispatch("findAllCategorys")
          return response;
        },

        //查询所有栏目信息
        async findAllCategorys(context,params){
          if(!params){
            params={
              page:0,
              pageSize:5
            }
          }
          let response = await post("/category/query",params);
          // console.log("response",response.data);
          //把信息设置到state.categorys中
          context.commit('refreshCategorys',response.data)
        },

        //分页查询所有栏目信息
        async saveOrUpdateCategory({dispatch,commit},category){
          //1.提交请求
          // console.log(category);
          let response = await post("/category/saveOrUpdate",category)
          //2.关闭模态框
          commit("closeModal");
          //3.刷新页面
          dispatch("findAllCategorys");
          //4.提示成功 react
          return response;
        },

        //通过栏目ID删除
        async deleteCategoryById({dispatch},id){
          let response = await get("/category/deleteById?id="+id);
          //刷新
          dispatch("findAllCategorys")
          //提示成功
          return response;

        }
      }
}
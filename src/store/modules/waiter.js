import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default {
    namespaced:true,
    state:{
        waiters:[],
        loading:false,
        params:{
            name:''
        }
    },
    getters:{

    },
    mutations:{
        refresWaiter(state,waiters){
            state.waiters = waiters;
        },
        endLoading(state){
            state.loding = false;
        },
        beginLoading(state){
            state.loading = true;
        }
    },
    actions:{
        async findAllwaiter({dispatch,commit}){
            commit("beginLoading")
            let response = await request.get("http://47.93.46.32:6677/waiter/findAll",this.params)
            commit("refresWaiter",response.data);
            setTimeout(()=>{
                commit("endLoading")
            },1000)
        }
    }

}
<template>
    <div class="waiter">
        <!-- 搜索 -->
        <div class="btns">
            <el-row>
				<el-col :span="18">
					<el-form :inline="true">
						<el-form-item>
							<el-input v-model="params.name" size="small" placeholder="请输入关键字"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button @click="findAllwaiter" szie="small" type="primary">搜 索</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
        </div>
        <!-- 表格 -->
        <el-table  size="small" :data="waiters" >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="username" label="名称"></el-table-column>
            <el-table-column prop="realname" label="姓名"></el-table-column>
            <el-table-column prop="password" label="密码"></el-table-column>
            <el-table-column prop="telephone" label="电话"></el-table-column>
            <el-table-column label="操作" width="100px" align="center">
                <template #default="record">
                <!-- <a href="" @click.prevent="toDetailHandler(record.row.id)">详情</a> -->
                 <el-button @click.prevent = "toDetailsHandler(record.row)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
 import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
 export default {
     data(){
        return{
            waiter:{}
        }
    },
    computed:{
        ...mapState("waiter",["waiters","loading","params"]),
    },
    created(){
        this.findAllwaiter();
    },
    methods:{
        ...mapMutations("waiter",["refresWaiter","endLoading","beginLoading"]),
        ...mapActions("waiter",["findAllwaiter"]),
        //跳转详情页面
        toDetailsHandler(waiter){
            this.$router.push({
                path:"/waiter/Details",
                query:{waiter}
            })
        },
        //查找

    }
}


</script>
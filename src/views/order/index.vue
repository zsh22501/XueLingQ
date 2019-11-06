<template>
  <div class="order">
		<!-- 按钮. -->
		<!-- <div>
			<el-button @click="toAddHandler" size="small" type="primary">添加</el-button>
			<el-button @click="batchDeleteHandler"  size="small" type="danger">批量删除</el-button>
		</div> -->
		<!-- 表格 -->
    <!-- {{waiters}} -->
		<div v-loading="loading">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="所有订单" name="所有订单">
                    <el-table :data="orders" size="mini">
                        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                        <el-table-column prop="id" label="订单编号" width="80" align="center"></el-table-column>
                        <el-table-column prop="orderTime" label="下单时间"></el-table-column>
                        <el-table-column prop="total" label="总价"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column prop="customerId" label="顾客id"></el-table-column>
                        <el-table-column label="操作">
                        <template #default="record">
                            <!-- <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)"></i> &nbsp;
                                            <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)"></i> &nbsp; -->
                            <!-- <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a> -->
                            <el-button @click.prevent = "toDetailsHandler(record.row)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="待支付" name="待支付">
                    <el-table :data="filterOrdersByStatus(activeName)" size="small">
                        <el-table-column label="订单编号" prop="id" width="80" align="center"/>
                        <el-table-column label="下单时间" prop="orderTime"/>
                        <el-table-column label="总价" prop="total"/>
                        <el-table-column label="状态" prop="status"/>
                        <el-table-column label="顾客id" prop="customerId"/>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="待派单" name="待派单">
                    <el-table :data="filterOrdersByStatus(activeName)" size="small">
                        <el-table-column label="订单编号" prop="id" width="80" align="center"/>
                        <el-table-column label="下单时间" prop="orderTime"/>
                        <el-table-column label="总价" prop="total"/>
                        <el-table-column label="状态" prop="status"/>
                        <el-table-column label="顾客id" prop="customerId"/>
                        <el-table-column label="操作" width="80px">
                            <template v-slot="slot">
                            <a href="" @click.prevent="paidanHandler(slot.row.id)">派单</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                 <el-tab-pane label="待接单" name="待接单">
                    <el-table :data="filterOrdersByStatus(activeName)" size="small">
                        <el-table-column label="订单编号" prop="id" width="80" align="center"/>
                        <el-table-column label="下单时间" prop="orderTime"/>
                        <el-table-column label="总价" prop="total"/>
                        <el-table-column label="状态" prop="status"/>
                        <el-table-column label="顾客id" prop="customerId"/>
                        <el-table-column label="操作" width="80px">
                            <template v-slot="slot">
                            <a href="" @click.prevent="cancelHandler(slot.row.id)">取消</a>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="待服务" name="待服务">
                    <el-table :data="filterOrdersByStatus(activeName)" size="small">
                        <el-table-column label="订单编号" prop="id" width="80" align="center"/>
                        <el-table-column label="下单时间" prop="orderTime"/>
                        <el-table-column label="总价" prop="total"/>
                        <el-table-column label="状态" prop="status"/>
                        <el-table-column label="顾客id" prop="customerId"/>
                        <el-table-column label="员工id" prop="waiterId"/>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="待确认" name="待确认">
                    <el-table :data="filterOrdersByStatus(activeName)" size="small">
                        <el-table-column label="订单编号" prop="id" width="80" align="center"/>
                        <el-table-column label="下单时间" prop="orderTime"/>
                        <el-table-column label="总价" prop="total"/>
                        <el-table-column label="状态" prop="status"/>
                        <el-table-column label="顾客id" prop="customerId"/>
                        <el-table-column label="员工id" prop="waiterId"/>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="已完成">
                    <el-table :data="filterOrdersByStatus(activeName)" size="small">
                        <el-table-column label="订单编号" prop="id" width="80" align="center"/>
                        <el-table-column label="下单时间" prop="orderTime"/>
                        <el-table-column label="总价" prop="total"/>
                        <el-table-column label="状态" prop="status"/>
                        <el-table-column label="顾客id" prop="customerId"/>
                        <el-table-column label="员工id" prop="waiterId"/>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
            
		</div>
    
     <el-dialog :title="title" :visible.sync="visible" width="40%" :before-close="handleClose">
       <!-- {{params.waiterId}} -->
     <div class="dialog-content">
        <el-radio-group v-model="params.waiterId">
          <div v-for="w in waiters" :key="w.id" >
            <el-radio style="line-height:3em" :label="w.id" >{{w.realname}}</el-radio>
          </div>
        </el-radio-group>
     </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="sendOrderHandler(params)">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 模态框 -->
    <!-- <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model="customer" :rules="rules" ref="customerForm">
        <el-form-item label="姓名" label-width="100px"  prop="realname">
          <el-input v-model="customer.realname" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px" prop="telephone">
          <el-input v-model="customer.telephone" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- /模态框. -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      title:"派单",
      visible:false,
      order:{},
      // ids:[],
      activeName:"all",
      params:{
        waiterId:0,
        orderId:0
      }
    //   rules:{
    //     realname: [
    //       { required: true, message: '请输入姓名', trigger: 'blur' },
    //       { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
    //     ],
    //     telephone: [
    //       { required: true, message: '请输入手机号', trigger: 'blur' }
    //     ]
    //   }
    }
  },
  computed:{
    ...mapState("order",["orders"/**,"visible","title" */,"loading","message"]),
    // ...mapGetters("customer",["orderCustomer","customerSize"])
    ...mapGetters("order",["filterOrdersByStatus"]),
    ...mapState("waiter",["waiters"])
  },
  created(){
    // 查询所有的订单
    this.findAllOrders();
    //查询所有的服务员
    this.findAllWaiters();
  },
  methods:{
      ...mapActions("order",["findAllOrders","sendOrder","cancelSendOrder"]),
      ...mapActions("waiter",["findAllWaiters"]),
      handleClick(tab){
      this.activeName = tab.name;
    },
     handleClose(){
      this.visible = false;
    },
    //打开模态框设置派单对象
     paidanHandler(orderId){
      this.params.orderId = orderId;
      this.visible = true;
    },
    //派单
    sendOrderHandler(params){
      console.log("1",params);
      
        this.sendOrder(params)
        .then(()=>{
          this.visible = false;
          this.$notify({ title: '成功', message: this.message, type: 'success' });
        })
      
    },
    //取消派单
     cancelHandler(orderId){
       console.log(orderId);
      this.cancelSendOrder(orderId).then(()=>{
        this.$notify({ title: '成功', message: this.message, type: 'success' });
      })
    },
    // ...mapMutations("customer",["showModal","closeModal",]),
    // ...mapActions("order",["findAllOrders"/**,"saveOrUpdateCustomer","deleteCustomerById","batchDeleteCustomer" */]),
    // 普通方法
    toDetailsHandler(order){
      //跳转到详情页面
      // this.$router.push("/customerDetails")
      this.$router.push({
        path:"/order/details",
        query:{order}
      })
    },
    // handleSelectionChange(val) {
    //   this.ids = val.map(item=>item.id);
    // },
    // toAddHandler(){
      // 1. 重置表单
      // this.customer = {};
      // this.setTitle("添加顾客信息");
      // 2. 显示模态框
    //   this.showModal();
    // },
    // submitHandler(){
    //   // 校验
    //   this.$refs.customerForm.validate((valid)=>{
    //     // 如果校验通过
    //     if(valid){
    //       let promise = this.saveOrUpdateCustomer(this.customer)
    //       promise.then((response)=>{
    //         // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
    //         this.$message({type:"success",message:response.statusText});
    //       })
    //     } else {
    //       return false;
    //     }
    //   })
    // },
    // dialogCloseHandler(){
    //   this.$refs.customerForm.resetFields();
    // },
    // editHandler(row){
    //   this.customer = row;
    //   this.setTitle("修改顾客信息");
    //   this.showModal();
    // },
    // deleteHandler(id){
    //   this.deleteCustomerById(id)
    //   .then((response)=>{
    //     this.$message({type:"success",message:response.statusText});
    //   })
    // },
    // batchDeleteHandler(){
    //   this.batchDeleteCustomer(this.ids)
    //   .then((response)=>{
    //     this.$message({type:"success",message:response.statusText});
    //   })
    // }

  }

}
</script>
<style scoped>

</style>
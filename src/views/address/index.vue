<template>
  <div class="address">
		<!-- 按钮 -->
		<div>
			<!-- <el-button @click="toAddHandler" size="small" type="primary">添加</el-button> -->
			<!-- <el-button @click="batchDeleteHandler"  size="small" type="danger">批量删除</el-button> -->
		</div>
		<!-- 表格 -->
		<div v-loading="loading">
      <el-table :data="addresses" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="province" label="省份"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="address" label="下级市/县"></el-table-column>
        <el-table-column prop="telephone" label="联系方式"></el-table-column>
        <el-table-column prop="customerId" label="顾客编号"></el-table-column>
        <el-table-column label="操作">
          <template #default="record">
              <!-- <i class="el-icon-delete" href="" @click.prevent="deleteHandler(record.row.id)"></i> &nbsp; -->
			  <!-- <i class="el-icon-edit-outline" href="" @click.prevent="editHandler(record.row)"></i> &nbsp; -->
              <a href="" @click.prevent="toDetailsHandler(record.row)">详情</a>
          </template>
        </el-table-column>
      </el-table>
		</div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model=" address" :rules="rules" ref=" addressForm">
        <el-form-item label="省份" label-width="100px"  prop="province">
          <el-input v-model=" address.province" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="下级市/县" label-width="100px" prop="address">
          <el-input v-model=" address.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="100px" prop="city">
          <el-input v-model=" address.city" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="danger" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      address:{},
      ids:[],
      rules:{
        province: [
          { required: true, message: '请输入省份', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地区', trigger: 'blur' }
        ],
         city: [
          { required: true, message: '请输入城市', trigger: 'blur' }
        ]
      }
    }
  },
  computed:{
     ...mapState("address",["addresses","visible","title","loading"]),
    // ...mapGetters(" address",["orderCustomer"," addressSize"])
  },
  created(){
    this.findAllAddresses();
  },
  methods:{
    ...mapMutations(" address",["showModal","closeModal","setTitle"]),
    ...mapActions("address",["findAllAddresses","saveOrUpdateAddress"]),
    // 普通方法
    toDetailsHandler(address){
      //跳转到详情页面
      // this.$router.push("/ addressDetails")
      this.$router.push({
        path:"/ address/details",
        query:{id: address.id}
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item=>item.id);
    },
    // toAddHandler(){
    //   // 1. 重置表单
    //   this. address = {};
    //   this.setTitle("添加地址信息");
    //   // 2. 显示模态框
    //   this.showModal();
    // },
    submitHandler(){
      // 校验
      this.$refs. addressForm.validate((valid)=>{
        // 如果校验通过
        if(valid){
          let promise = this.saveOrUpdateAddress(this. address)
          promise.then((response)=>{
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      })
    },
    dialogCloseHandler(){
      this.$refs. addressForm.resetFields();
    },
    editHandler(row){
      this.address = row;
      this.setTitle("修改地址信息");
      this.showModal();
    }
    // deleteHandler(id){
    //   this.deleteAddressById(id)
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
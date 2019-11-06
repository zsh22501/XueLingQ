<template>
  <div id="category">
      <!-- <h2>栏目管理</h2> -->
    <!-- 按钮 -->
    <div class="btns">
      <el-row>
        <!-- 左侧搜索 -->
        <!-- {{params}} -->
        <el-col :span="12">
          <el-form :inline="true" v-model="params" @keyup.native="loadData">
            <el-form-item>
              <el-input v-model="params.name" placeholder="请输入栏目名称" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="params.num" placeholder="请输入栏目数量" ></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-input v-model="params.parentId" placeholder="请输入父Id" ></el-input>
            </el-form-item> -->
          </el-form>
        </el-col>
        <!-- 返回 -->
        <el-col :span="8">
          <el-button @click.prevent="returnHandler" type="success" size="small" >返回</el-button>
        </el-col>
        <!-- /左侧搜索 -->
        <!-- 右侧添加与批量删除 -->
        <el-col :span="4" style="text-align:right;">
          <el-button @click.prevent="toAddHandler" type="primary" size="small" >添加</el-button>
          <el-button @click.prevent="batchDeleteHandler" type="danger" size="small" >批量删除</el-button>
        </el-col>
        <!-- /右侧添加与批量删除 -->
      </el-row>
    </div>
    <!-- 模态框 -->
    <el-dialog @close="dialogCloseHandler" :title="title" :visible.sync="visible" width="30%">
      <el-form :model="form" :rules="rules" ref="categoryForm">
        <el-form-item label="栏目名称" label-width="100px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目数量" label-width="100px" prop="num">
          <el-input v-model="form.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父Id" label-width="100px" prop="parentId">
          <el-select v-model="form.parentId" placeholder="请选择父Id">
            <el-option v-for="item in categorys.list" :label="item.id" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <!-- {{ids}} -->
    <el-table :data="categorys.list" @selection-change="idsChangeHandler">
      <el-table-column prop="id" label="栏目编号" align="center" width="50" type="selection"></el-table-column>
      <el-table-column prop="name" label="栏目名称" align="center"></el-table-column>
      <el-table-column prop="num" label="栏目数量" align="center"></el-table-column>
      <el-table-column prop="icon" label="栏目图标"  align="center">
        <template v-slot:default="record">
          <img :src="record.row.icon" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="父Id" align="center">
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template #default="record">
          <el-button @click.prevent = "deleteHandler(record.row.id)" type="danger" size="small" icon="el-icon-delete" plain circle></el-button>
          <el-button @click.prevent = "editHandler(record.row)" type="success" size="small" icon="el-icon-edit" plain circle></el-button>
          <el-button @click.prevent = "toDetailsHandler(record.row.id)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align:center">
      <el-pagination
        background
        @current-change="pageChangeHandler"
        layout="prev, pager, next"
        :current-page="categorys.page+1"
        :page-size="categorys.pageSize"
        :total="categorys.total">
      </el-pagination>
    </div>
    <!-- /分页 -->
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations,mapState} from 'vuex'
export default {
  // 一般双向数据绑定的值放于data中
  data(){
  //   var checkNum = (num, value, callback) => {
  //       if (!value) {
  //         return callback(new Error('数量不能为空'));
  //       }
  //       setTimeout(() => {
  //         if (!Number.isInteger(value)) {
  //           callback(new Error('请输入数字值'));
  //         } else {
  //           if (value > 1) {
  //             callback(new Error('必须大于1'));
  //           } else {
  //             callback();
  //           }
  //         }
  //       }, 1000);
  //     };
    return {
      ids:[],
      form:{},
      rules:{
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        num: [
          // { validator: checkNum, trigger: 'blur' }
          { required: true, message: '请输入栏目数量', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个数字', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请输入父Id', trigger: 'blur' }
        ]
      },
      params:{
        page:0,
        pageSize:5,
        name:'',
        num:'',
        parentId:''
      }
    }
  },
  created(){
    this.loadData();
    this.findAllCategorys();
  },
  computed:{
    ...mapState("category",["categorys","visible","title"]),
    // ...mapState("category",["categories"]),
    ...mapGetters("category",["countCategorys","categoryStatusFilter"])
    // 普通属性
  },
  methods:{
    ...mapActions("category",["findAllCategorys","deleteCategoryById","saveOrUpdateCategory","batchDeleteCategorys"]),
    // ...mapActions("category",["findAllCategories"]),
    ...mapMutations("category",["showModal","closeModal","setTitle","pageChangeHandler"]),
    // 普通方法

    // 跳转到栏目详情页面
    toDetailsHandler(id){
      this.$router.push({
        path:'/category/Details',
        query:{id}
      })
    },

    //返回
    returnHandler(){
      this.params.name = '',
      this.params.description = '',
      this.params.price = '',
      this.params.status = '',
      this.loadData();
    },
    //分页查询
    loadData(){
      this.findAllCategorys(this.params);
    },
    //换页
    pageChangeHandler(currentPage){
      this.params.page = currentPage-1;
      //刷新页面
      this.findAllCategorys(this.params);
    },
    //批量删除
    batchDeleteHandler(){
      this.batchDeleteCategorys(this.ids)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    //为全选绑定事件
    idsChangeHandler(val){
      this.ids = val.map((item)=>{
        return item.id;
      })
      // 简写形式
      // this.ids = val.map(item => item.id);
    },
    dialogCloseHandler(){
      this.$refs.categoryForm.clearValidate();
      this.closeModal();
    },
    //为添加按钮绑定事件
    toAddHandler(){
      this.form = {};
      this.setTitle("添加栏目信息");
      this.showModal();
    },
    //为提交按钮绑定事件
    submitHandler(){
      this.$refs.categoryForm.validate((vaild)=>{
        if(vaild){
          //提交表单
          this.saveOrUpdateCategory(this.form)
          .then((response)=>{
            console.log(response.data);
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      })
    },
    //通过ID删除
    deleteHandler(id){
      let promise = this.deleteCategoryById(id);
      promise.then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    //为修改按钮绑定事件
    editHandler(row){
      this.form = row;
      this.setTitle("修改栏目信息");
      this.showModal();
    }
  }
}
</script>

<style scoped>

</style>  
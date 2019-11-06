<template>
    <div class="product">
        <!-- 搜索框 -->
        <div class="btn">
            <el-col :span="18">
                <el-form :inline="true">
                    <el-form-item>
                        <el-input placeholder="请输入关键字"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" plain >搜 索</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="6" style="text-align:right">
                <el-button type="primary" @click="toAddHandler" size="small">添 加</el-button>
                <el-button type="danger" @click="batchDeleteHandler" size="small">批量删除</el-button>
            </el-col>
        </div>
        <!-- 表格 -->
        <div v-loading="loading">
            <el-table  size="mini" :data="products" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="categoryId" label="所属栏目"></el-table-column>
                <el-table-column prop="description" label="描述"></el-table-column>
                <el-table-column label="操作">
                <template #default="record">
                   <el-button @click.prevent = "deleteHandler(record.row.id)" type="danger" size="small" icon="el-icon-delete" plain circle></el-button>
                   <el-button @click.prevent = "editHandler(record.row)" type="success" size="small" icon="el-icon-edit" plain circle></el-button>
                   <el-button @click.prevent = "toDetailsHandler(record.row)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
                </template>
                </el-table-column>
            </el-table>
		</div>
        <!-- 表单 -->
        <el-dialog :visible.sync="visible" @close="dialogCloseHandler">
            <el-form ref="productForm" :model="product" :rules="rules">
                <el-form-item label="姓名" label-width="100px"  prop="name">
                <el-input v-model="product.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="100px" prop="description">
                <el-input v-model="product.description"  auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="价格" label-width="100px" prop="price">
                <el-input v-model="product.price" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
                <el-select v-model="product.categoryId" placeholder="请选择所属栏目">
                    <el-option v-for="(c,index) in category" :label="c.name" :value="c.id" :key="index"></el-option>
                </el-select>
                </el-form-item>
                 <el-form-item label="上传图片" label-width="100px" prop="photo">
                <el-upload
                    class="upload-demo"
                    action="http://134.175.154.93:6677/file/upload"
                    :file-list="fileList"
                    :on-success="uploadSuccessHandler"
                    :limit=1
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeModel">取 消</el-button>
                <el-button @click="submitHandler" size="small" type="primary">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'

export default {
    data(){
        return{
            fileList:[],
            ids:[],
            product:{},
            rules:{
                name:[
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                price:[
                    { required: true, message: '请输入价格', trigger: 'blur' },
                ],
                categoryId:[
                     { required: true, message: '请选择所属栏目', trigger: 'change' }
                ]
            }
        }
    },
    created(){
        this.findAllproduct();
        this.findAllcategory();
    },
    computed:{
        ...mapState("product",["loading","products","category","visible"]),
        ...mapGetters("product",["orderProduct","productSize"])
    },
    methods:{
        ...mapMutations("product",["endLoading","beginLoading","refresProduct","refresCategory","showModel","closeModel"]),
        ...mapActions("product",["batchDeleteProduct","findAllproduct","findAllcategory","deleteProduct","saveProduct"]),
        //跳转
        toDetailsHandler(product){
            this.$router.push({
                path:"/product/Details",
                query:{product}
            })
        },
        //上传
        uploadSuccessHandler(response){
            //获取返回值的id，将id设置到表单中
            if(response.statys === 200){
                let id = response.data.id;
                let photo = "http://134.175.154.93:8888/group1/"+id
                this.product.photo = photo;
                //克隆，强制数据刷新做双向渲染
                this.product = Object.assign({},this.product);
            } else{
                this.$message.error("上传失败")
            }
        },
        //删除
        deleteHandler(id){
            this.deleteProduct(id)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText})
            })
        },
        //批量删除
        batchDeleteHandler(){
            this.batchDeleteProduct(this.ids)
            .then((response)=>{
                this.$message({type:"success",message:response.statusText})
            })
        },
        handleSelectionChange(val){
            this.ids = val.map(item=>item.id);
        },
        //添加按钮
        toAddHandler(){
            //打开模态框
            this.showModel();
            //重置表单
            this.product = {};
        },
        //模态框关闭并清除数据
        dialogCloseHandler(){
            this.$refs.productForm.resetFields();
        },
        //添加事件绑定
        submitHandler(){
            this.$refs.productForm.validate((valid)=>{
                //如果通过校验
                if (valid) {
                    let promise = this.saveProduct(this.product)
                    promise.then((response)=>{
                        this.$message({type:"success",message:response.statusText})
                    })
                } else {
                    return false;
                }
            })
        },
        //修改
        editHandler(row){
            //将当前信息绑定在当前行
            this.product = row;
            //将图片绑定在修改表单中
            this.fileList.push({name:'old',url:row.photo})
            this.showModel();
        },
        //返回上一页
        
    }
}
</script>
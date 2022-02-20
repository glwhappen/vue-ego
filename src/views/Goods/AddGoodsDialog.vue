<template>
  <!--
    title 弹窗标题
    :visible.sync="dialogVisible" 控制显示隐藏
  -->
  <el-dialog
    title="添加商品"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="handleClose">

    <div class="myform">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

        <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="dialogCategoryVisible = true">类目选择</el-button>
          <span class="category">{{ ruleForm.category }}</span>
        </el-form-item>

        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>

        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>

        <el-form-item label="发布时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.data" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="选择时间" v-model="ruleForm.time" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>

        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="dialogUploadImageVisible = true">上传图片</el-button><br>
          <el-image v-if="ruleForm.image"
            style="width: 100px; height: 100px"
            :src="ruleForm.image"
            fit="contain">
          </el-image>
        </el-form-item>

        <el-form-item label="商品描述" prop="descs">
          <el-input type="textarea" v-model="ruleForm.descs"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--弹窗底部区域-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    <!--1. 内弹框 - 类目选择-->
    <el-dialog
      width="50%"
      title="类目选择"
      :visible.sync="dialogCategoryVisible"
      append-to-body>
      <CategoryTree @sendTreeData="sendTreeData" />
      <!--弹窗底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCategoryVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogUploadImageVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--2. 内弹窗 - 上传图片-->
    <el-dialog
      width="50%"
      title="上传图片"
      :visible.sync="dialogUploadImageVisible"
      append-to-body>
      <UploadImage @sendImg="sendImg" />
      <!--弹窗底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUploadImageVisible = false">取 消</el-button>
        <el-button type="primary" @click="showImage">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import CategoryTree from '@/views/Goods/CategoryTree'
import UploadImage from '@/views/Goods/UploadImage'
export default {
  name: 'AddGoodsDialog',
  components: { UploadImage, CategoryTree },
  // props: ['dialogVisible'],
  data() {
    return {
      dialogVisible: false,
      dialogCategoryVisible: false,
      dialogUploadImageVisible: false,
      treeData: {}, // 接受tree的数据
      imgUrl: '',
      ruleForm: {
        title: '', // 商品名称
        price: 0, // 商品价格
        num: 0,
        sellPoint: '',
        image: '',
        descs: '',
        category: '',
        data: '', // 商品时间
        time: ''
      },
      rules: { // 校验规则
        title: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        num: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /**
     * 显示图片
     */
    showImage() {
      this.dialogUploadImageVisible = false
      this.ruleForm.image = this.imgUrl
    },
    /**
     * 显示图片地址
     */
    sendImg(url) {
      console.log('父', url)
      // this.image = url
      this.imgUrl = url // 中转一步
    },
    /**
     * 显示categoryTree的数据
     */
    showTreeData() {
      console.log('显示', this.treeData)
      this.dialogCategoryVisible = false
      this.ruleForm.category = this.treeData.name
    },
    /**
     * 获取tree的数据
     */
    sendTreeData(data) {
      // console.log('tree传过来的', data)
      this.treeData = data
    },
    handleClose() {
      this.dialogVisible = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.category{
  margin-left: 10px;
}
</style>

<template>
  <!--
    title 弹窗标题
    :visible.sync="dialogVisible" 控制显示隐藏
  -->
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="70%"
    :before-close="resetForm">

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
          <WangEditor ref="wangEditor" @sendEditor="sendEditor" />
        </el-form-item>

      </el-form>
    </div>

    <!--弹窗底部区域-->
    <span slot="footer" class="dialog-footer">
      <el-button @click="resetForm">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
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
        <el-button type="primary" @click="showTreeData">确 定</el-button>
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
import WangEditor from '@/views/Goods/WangEditor'
export default {
  name: 'AddGoodsDialog',
  components: { WangEditor, UploadImage, CategoryTree },
  props: {
    title: {
      type: String,
      default: '添加商品'
    },
    formData: { // 默认表单数据
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  // 监听器 读不到vue的this 在created前
  watch: {
    formData(val) {
      this.ruleForm = val
      // 设置富文本编译器的内容
      this.$nextTick(() => {
        this.$refs.wangEditor.editor.txt.html(val.descs)
      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogCategoryVisible: false,
      dialogUploadImageVisible: false,
      treeData: {}, // 接受tree的数据
      imgUrl: '',
      ruleForm: {
        id: '', // 添加的时候不需要指定
        title: '', // 商品名称
        price: null, // 商品价格
        num: null,
        sellPoint: '',
        image: '',
        descs: '',
        cid: '', // 类目id
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
  mounted () {
    this.ruleForm = this.formData
  },
  methods: {
    /**
     * 接收wangEditor传过来的html
     * @param html html内容
     */
    sendEditor(html) {
      // console.log('内容', html)
      this.ruleForm.descs = html
    },
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
      this.imgUrl = url // 中转一步
    },
    /**
     * 显示categoryTree的数据
     */
    showTreeData() {
      console.log('显示', this.treeData)
      this.dialogCategoryVisible = false
      this.ruleForm.category = this.treeData.name
      this.ruleForm.cid = this.treeData.cid
    },
    /**
     * 获取tree的数据
     */
    sendTreeData(data) {
      this.treeData = data
    },
    submitForm () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(this.title === '添加商品') {
            this.$api.addGoods(this.ruleForm).then(res => {
              if(res.status === 200) {
                this.$message.success('添加商品成功！') // 2. 提示消息
                this.$parent.getGoodsList(1) // 3. 更新父组件的商品列表数据
                this.resetForm()
              } else {
                this.$message.error('添加商品失败！') // 2. 提示消息
              }
            })
          } else {
            // 编辑商品
            console.log(this.ruleForm)
            this.$api.editGoods(this.ruleForm).then(res => {
              if(res.status === 200) {
                this.$message.success('编辑商品成功！') // 2. 提示消息
                this.$parent.getGoodsList(1) // 3. 更新父组件的商品列表数据
                this.resetForm()
              } else {
                this.$message.error('修改商品失败！') // 2. 提示消息
              }
            })
          }
        } else {
          this.$message.error('数据校验失败')
          return false
        }
      })
    },
    resetForm () {
      this.dialogVisible = false // 1. 关闭弹窗
      this.$refs.ruleForm.resetFields() // 4. 清空表单 element自带的方法 不能传引用
      // this.ruleForm = {
      //   title: '', // 商品名称
      //   price: null, // 商品价格
      //   num: null,
      //   sellPoint: '',
      //   image: '',
      //   descs: '',
      //   cid: '', // 类目id
      //   category: '',
      //   data: '', // 商品时间
      //   time: ''
      // }
      this.$refs.wangEditor.editor.txt.clear() // 5. 情况wangEditor内容
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

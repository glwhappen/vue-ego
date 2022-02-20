<template>
  <!--
    ref="upload" 获取dom元素，
    action="" 上传地址
    :on-preview="handlePreview" 点击已上传文件的钩子
    :on-remove="handleRemove" 删除文件
    auto-uoload 是否自动上传
    :file-list="fileList" 上传文件列表
  -->
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="successUpload"
    :file-list="fileList"
    :auto-upload="false">
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
  </el-upload>
</template>

<script>
import base from '@/api/base'
export default {
  name: 'UploadImage',
  data() {
    return {
      fileList: [],
      url: base.uploadUrl,
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    /**
     * 上传成功
     */
    successUpload(res, file, filelist) {
      console.log('上传成功')
      this.$message.success('上传成功')
      // 把成功的数据接口相应数据给父组件
      const imgUrl = base.server + '/' + res.url.slice(7)
      this.$emit('sendImg', imgUrl)
    }
  }
}
</script>

<style scoped>

</style>

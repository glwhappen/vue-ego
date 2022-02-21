<template>
  <div class="login">
    <div class="login-box">

      <h3 class="title">登录界面</h3>
      <hr>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input type="txt" v-model="ruleForm.username" name="username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" password></el-input>
        </el-form-item>
        <div class="buttons">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        password: '',
        username: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!', )
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  .login-box {
    width: 400px;
    height: 300px;
    box-shadow: 0 0 10px #ddd;
    padding: 10px;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .title {
      color: #2f6fb9;
      padding-bottom: 5px;
      font-size: 30px;
    }
    hr {
      border-bottom: 1px solid #2f6fb9;
      //box-shadow: 0 0 10px #aaa;
      width: 80%;
    }
    .el-form {
      width: 80%;
      padding-right: 10px;
    }
    .buttons {
      display: flex;
      justify-content: center;
    }
  }
}

</style>

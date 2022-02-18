<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button <i class="iconfont icon-add"></i></el-button>
    </div>

  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
/*引入iconfont*/
@import url('https://at.alicdn.com/t/font_2448847_4xsojqvt7qt.css');
</style>

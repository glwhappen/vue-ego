<template>
  <div>
    <div class="header">顶部区域</div>
    <!--内容区域 路由出口-->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style scoped lang="less">
  .header {
    height: 60px;
    background: skyblue;
  }
</style>

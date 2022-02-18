<template>
  <div class="layout">
    <!--左侧导航区域-->
    <NavMenu class="menu"/>
    <!--右侧内容区域-->
    <Content class="content"/>
  </div>
</template>

<script>
import NavMenu from './NavMenu'
import Content from './Content'
export default {
  name: 'Layout',
  components: {
    NavMenu,
    Content
  }
}
</script>

<style scoped lang="less">
.layout {
  display: flex;
  .menu {
    width: 200px;
    min-height: 500px;
    background: #999;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    flex: 1;
    margin-left: 200px;
    //background: red;
  }
}
</style>

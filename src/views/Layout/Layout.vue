<template>
  <div class="layout">
    <!--左侧导航区域-->
    <NavMenu class="menu" :isCollapse="isCollapse"/>
    <!--右侧内容区域-->
    <Content class="content" @changeCollapse="changeCollapse" :isCollapse="isCollapse"/>
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
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    changeCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped lang="less">
.layout {
  display: flex;
  height: 100vh;
  overflow-y: hidden;
  .menu {
    background: #1b3554;
  }
  .content {
    flex: 1;
    width: 50%; // 用来修复宽度太宽的问题，不知道为什么这样可以
  }
}
</style>

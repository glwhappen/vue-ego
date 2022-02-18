<template>
  <div class="layout">
    <!--左侧导航区域-->
    <NavMenu class="menu" :isCollapse="isCollapse"/>
    <!--右侧内容区域-->
    <Content class="content" :class="{isActive:isCollapse}" @changeCollapse="changeCollapse" :isCollapse="isCollapse"/>
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
  .menu {
    //width: 200px;
    //min-height: 500px;
    background: #1b3554;
    position: fixed;
    top: 0;
    bottom: 0;
  }
  .content {
    flex: 1;
    margin-left: 200px;
  }
  .isActive {
    margin-left: 64px;
  }
}
</style>

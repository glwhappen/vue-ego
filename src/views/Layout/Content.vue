<template>
  <div class="content">
    <div class="header">
      <i v-show="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent collapse"></i>
      <i v-show="isCollapse" @click="changeMenu" class="iconfont icon-left-indent collapse"></i>

      顶部区域
    </div>
    <!--内容区域 路由出口-->
    <div class="view">
      <router-view />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Content',
  props: ['isCollapse'],
  methods: {
    changeMenu () {
      // 修改父亲的数据
      this.$emit('changeCollapse')
    }
  }
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  flex-direction: column;
  .header {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: #1e78bf;
    .iconfont {
      font-size: 24px;
    }
  }
  .view {
    flex: 1;
    overflow-y: auto;
  }
  .collapse {
    cursor: pointer;
  }
}

</style>

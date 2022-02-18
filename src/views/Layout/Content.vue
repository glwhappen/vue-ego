<template>
  <div>
    <div class="header">
      <i v-show="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent"></i>
      <i v-show="isCollapse" @click="changeMenu" class="iconfont icon-left-indent"></i>

      顶部区域
    </div>
    <!--内容区域 路由出口-->
    <router-view />
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
  .header {
    height: 50px;
    line-height: 50px;
    color: #fff;
    background: #1e78bf;
    .iconfont {
      font-size: 24px;
    }
  }
</style>

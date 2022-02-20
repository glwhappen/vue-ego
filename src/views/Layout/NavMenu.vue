<template>
  <div>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#1b3554"
      text-color="#fff"
      router
      :collapse="isCollapse"
      active-text-color="#ffd04b">
      <el-menu-item>
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("global.title") }}</span>
      </el-menu-item>
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">{{ $t("navMenu.home") }}</span>
      </el-menu-item>
      <el-menu-item index="/goods">
        <i class="el-icon-document"></i>
        <span slot="title">{{ $t("navMenu.goods") }}</span>
      </el-menu-item>
      <el-menu-item index="/params">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("navMenu.params") }}</span>
      </el-menu-item>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span slot="title">{{ $t("navMenu.advert") }}</span>
      </el-menu-item>
      <el-submenu index="/order">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ $t("navMenu.order") }}</span>
        </template>
          <el-menu-item index="/order/order-list">{{ $t("navMenu.orderList") }}</el-menu-item>
          <el-menu-item index="/order/order-back">{{ $t("navMenu.orderBack") }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['isCollapse'],
  data () {
    return {
      // isCollapse: false
    }
  }
}
</script>

<style scoped lang="less">
.el-menu {
  border: 0;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 500px;
}
</style>

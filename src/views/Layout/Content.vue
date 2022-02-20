<template>
  <div class="content">
    <div class="header">
      <i v-show="!isCollapse" @click="changeMenu" class="iconfont icon-right-indent collapse"></i>
      <i v-show="isCollapse" @click="changeMenu" class="iconfont icon-left-indent collapse"></i>

      <div class="header-right">
        <el-dropdown trigger="click" @command="clickLang">
          <span class="el-dropdown-link">
            多语言<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user">
          欢迎xxx
        </div>
        <span>退出</span>
      </div>
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
    /**
     * 获取点击的语言是什么
     * @param command 传入的语言 zh|en
     */
    clickLang(command) {
      this.$i18n.locale = command // 设置语言
    },
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
    .header-right {
      float: right;
      padding-right: 20px;
      display: flex;
      font-size: 15px;
      .el-dropdown {
        margin: 0 20px;
        .el-dropdown-link {
          cursor: pointer;
          color: #FFF;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
        .demonstration {
          display: block;
          color: #8492a6;
          font-size: 14px;
          margin-bottom: 20px;
        }
      }
      .user {
        margin-right: 20px;
      }
    }
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

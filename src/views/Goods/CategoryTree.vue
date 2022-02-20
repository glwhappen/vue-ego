<template>
  <!--
    props 配置项
      label 节点对象的某个属性
      children 子树
      isLeaf 为叶子节点 指定lazy是生效
    load loading图表
    lazy 开启数据懒加载
    show-checkbox 选择框
    accordion 展开后折叠其他
  -->
  <el-tree
    :props="props"
    :load="loadNode"
    accordion
    @node-click="nodeClick"
    lazy>
  </el-tree>
</template>

<script>
export default {
  name: 'CategoryTree',
  data() {
    return {
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      },
    }
  },
  methods: {
    /**
     * 点击tree获取数据
     */
    nodeClick(data, node) {
      this.$emit('sendTreeData', data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        this.$api.getSelectCategory().then(res => {
          return resolve(res.result)
        })
        // return resolve([{ title: '手机' }, { title: '电脑' }]) // 不成功执行
      }
      if (node.level >= 1) {
        this.$api.getSelectCategory({ id: node.data.cid }).then(res => {
          if(res.status === 200) {
            return resolve(res.result)
          } else {
            return resolve([])
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

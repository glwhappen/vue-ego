<template>
  <!--
    props 配置项
      label 节点对象的某个属性
      children 子树
      isLeaf 为叶子节点 指定lazy是生效
    load loading图表
    lazy 开启数据懒加载
    show-checkbox 选择框
  -->
  <el-tree
    :props="props"
    :load="loadNode"
    lazy>
  </el-tree>
</template>

<script>
export default {
  name: 'CategoryTree',
  data() {
    return {
      props: {
        label: 'title',
        children: 'zones',
        isLeaf: 'leaf'
      },
    }
  },
  methods: {
    loadNode(node, resolve) {
      console.log(node)
      if (node.level === 0) {
        return resolve([{ title: '手机' }, { title: '电脑' }])
      }
      if (node.level >= 1) {
        // 请求当前tree下面的数据
        return resolve([])
      }
    }
  }
}
</script>

<style scoped>

</style>

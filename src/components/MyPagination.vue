<template>
  <el-pagination
    background
    layout="total, prev, pager, next, jumper"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="changePage"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'MyPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    changePage (page) {
      this.$emit('changePage', page)
    }
  }
}
</script>

<style scoped>
  .el-pagination {
    margin-top: 10px;
    text-align: center;
  }
</style>

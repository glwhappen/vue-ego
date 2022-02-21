<template>
  <div class="params">
    <!--1. 目录位置-->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/params' }">规格参数</el-breadcrumb-item>
        <el-breadcrumb-item>规格包装</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--2. 搜索框-->
    <div class="header">
      <el-input v-model="inp" />
      <el-button type="primary">查看</el-button>
      <el-button type="primary">添加</el-button>

    </div>
    <!--3. 表格-->
    <el-table
      :data="tableData" class="my-table">

      <el-table-column prop="id" label="规格参数ID" width="100"></el-table-column>
      <el-table-column prop="itemCatId" label="类目ID" width="100" show-overflow-tooltip></el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="150"></el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip ></el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <el-button
            type="primary"
            size="mini">编辑</el-button>
          <el-button
            size="mini"
            type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--4. 分页-->
    <MyPagination :total="total" :pageSize="pageSize" @changePage="changePage" :currentPage="currentPage"></MyPagination>
    <!--5. 弹框-->

  </div>
</template>

<script>

import MyPagination from '@/components/MyPagination'
export default {
  name: 'Specifications',
  components: { MyPagination },
  data() {
    return {
      inp: '',
      tableData: [],
      total: 0,
      pageSize: 8,
      currentPage: 1,
    }
  },
  methods: {
    getParamsList(page) {
      this.$api.getParams({ page }).then(res => {
        if(res.status === 200) {
          this.tableData = res.data
          this.total = res.total
          this.pageSize = res.pageSize
        }
      })
    },
    changePage (page) {
      this.currentPage = page
      this.getParamsList(page)
    },
  },
  mounted () {
    this.getParamsList(1)
  }
}
</script>

<style scoped lang="less">
.params {
  margin: 20px;
  .nav {
    background: white;
    padding: 10px;
    margin-bottom: 10px;
  }
  .header {
    display: flex;
    background: white;
    padding: 10px;
    margin-bottom: 10px;
    button {
      margin-left: 20px;
    }
  }
  .my-table {
    margin: 10px auto;
  }
}
</style>

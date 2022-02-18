<template>
  <div class="goods">
    <!--1. 搜索区域-->
    <div class="header">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary">添加</el-button>
    </div>
    <!--2. 表格区域展示视图数据-->
    <div class="wrapper">
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
        <el-table-column prop="title" label="商品名称" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="商品价格" width="100"></el-table-column>
        <el-table-column prop="num" label="商品数量" width="100"></el-table-column>
        <el-table-column prop="category" label="规格类目" width="100"></el-table-column>
        <el-table-column prop="image" label="商品图片" show-overflow-tooltip></el-table-column>
        <el-table-column prop="sellPoint" label="商品卖点" show-overflow-tooltip></el-table-column>
        <el-table-column prop="descs" label="商品描述" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--3. 分页-->
    <MyPagination :total="total" :pageSize="pageSize" @changePage="changePage"></MyPagination>
  </div>
</template>

<script>
import MyPagination from '../../components/MyPagination'
export default {
  name: 'Goods',
  components: { MyPagination },
  data () {
    return {
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }],
      total: 0,
      pageSize: 1,
      loading: false
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log('编辑', index, row)
    },
    handleDelete (index, row) {
      console.log('删除', index, row)
    },
    getGoodsList (page) {
      this.loading = true
      this.$api.getGoodsList({ page }).then(res => {
        this.loading = false
        if (res.data.status === 200) {
          this.tableData = res.data.data
          this.total = res.data.total
          this.pageSize = res.data.pageSize
        } else {
          this.tableData = []
          this.total = 0
          this.pageSize = 1
        }
      })
    },
    changePage (page) {
      this.getGoodsList(page)
    }
  },
  created () {
    this.getGoodsList(1)
  }
}
</script>

<style scoped lang="less">
.goods {
  margin: 20px;
}
.header {
  display: flex;
  button {
    margin-left: 20px;
  }
}
.wrapper {
  margin-top: 20px;
}
</style>

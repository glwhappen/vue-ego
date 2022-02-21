<template>
  <div class="home">
    <p class="message">
      用vue和element写的测试页面，通过不断的学习一直完善这个页面,
      学习笔记:<a href="https://www.glwsq.cn/post/note-vue-element/">传送门</a>
    </p>
    <div id="chart1" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted () {
    this.line()
  },
  methods: {
    line() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('chart1'))

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="less">
.home {
  margin: 20px;
  .message {
    padding: 10px;
    margin-bottom: 10px;
    background: white;
    color: #333;
  }
  #chart1 {
    padding: 20px;
    background: white;
  }
}
</style>

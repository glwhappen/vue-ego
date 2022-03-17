<template>
  <div class="home">
    <p class="message">
      折线图完整Vue模板，尽量和BH客户端兼容
    </p>
    <div class="buttons">
      <el-button @click="stopInterval" size="small">暂停</el-button>
    </div>
    <div id="chart1" style="height: 400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartsTest',
  data: function() {
    return {
      mychart: {},
      interval: null
    }
  },
  mounted() {
    console.log('挂载成功')
    const myCharts = this.$echarts.init(document.getElementById('chart1')) // 传入dom元素和主题 主题默认是light还可以是dark
    const xDataArr = []
    const yDataArr = []
    // 模拟数据
    for(let i = 0; i <= 10000; i += 25) {
      xDataArr.push(i)
      if(i > 500) {
        yDataArr.push(Math.floor(Math.random() * 5))
      } else {
        yDataArr.push(Math.floor(Math.random() * 50))
      }
    }
    const option = {
      title: {
        text: '折线图',
      },
      grid: {
        left: '7%',
        right: '7%',
        top: '21%',
        bottom: '15%'
      },
      legend: {}, // 在头部显示每个折线的名称和颜色
      toolbox: { // 工具箱
        feature: {
          saveAsImage: {} // 保存图片
        }
      },
      dataZoom: [{
        type: 'inside',
      }], // 开启缩放，滚滑轮缩放x轴
      tooltip: {
        trigger: 'axis'
      }, // 鼠标移动上去内容提示框
      xAxis: { // x轴数据类型
        type: 'category', // 类目轴category是需要data的
        // boundaryGap: false, // x轴的点和数据对齐 建议折线图这样设置，更好看
        data: xDataArr,
        name: '[Hz]'
      },
      yAxis: { // y轴数据类型
        type: 'value' // value不需要data数据
      },
      series: [{ // 具体的数据
        name: '数据',
        data: yDataArr,
        type: 'line',
      }]
    }
    myCharts.setOption(option)
    this.interval = setInterval(() => {
      for(let i = 0; i < yDataArr.length; i++) {
        if(i > 20) {
          yDataArr[i] = Math.floor(Math.random() * 5)
        } else {
          yDataArr[i] = Math.floor(Math.random() * 50)
        }
      }
      myCharts.setOption(option)
    }, 2000)
    this.mychart = myCharts

    // 监听窗口大小变化
    window.onresize = () => {
      console.log('窗口大小改变')
      this.mychart.resize() // 刷新echarts的大小
    }
    // 页面加载完成
    // window.onload = function() {
    //   bindMaxInput()
    // }
  },
  methods: {
    stopInterval() {
      console.log(this.interval)
      clearInterval(this.interval) // 停止interval https://www.cnblogs.com/fengxm/p/6150537.html
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
  .buttons {
    padding: 10px;
    margin-bottom: 10px;
    background: white;
  }
  #chart1 {
    padding: 20px;
    background: white;
  }
}
</style>

<template>
  <div class="home">
    <p class="message">
      折线图完整Vue模板，尽量和BH客户端兼容
    </p>
    <div class="buttons">
      <el-button @click="stopInterval" size="small">暂停</el-button>
      <el-button @click="getZr" size="small">获取zr</el-button>
      <el-button @click="get_chart_pixel" size="small">图表在屏幕中的位置</el-button>
      <el-button @click="get_00_pixel" size="small">获取(0, 0)在图表中的位置坐标</el-button>
      <el-button size="small">获取(0, 0)在屏幕中的位置坐标</el-button>
    </div>
    <div id="chart1" style="height: 400px;"></div>
    <div class="message">
      一些基本信息显示
      <ul>
        <li v-for="msg in msgs" :key="msg.key">{{ msg.key }} = {{ msg.value }}</li>
      </ul>

      <pre>{{ jsonMsg }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EchartsTest',
  data: function() {
    return {
      mychart: {},
      msgs: [{ key: '关键字', value: '内容' }],
      interval: null,
      jsonMsg: null
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
    window.onresize = (event) => {
      console.log('窗口大小改变', event)
      this.mychart.resize() // 刷新echarts的大小
    }
    this.debug('x轴数据长度', xDataArr.length)
    // 页面加载完成
    // window.onload = function() {
    //   bindMaxInput()
    // }
  },
  methods: {
    debug(key, value) {
      this.msgs.unshift({ key, value })
    },
    getZr() {
      // this.jsonMsg = this.mychart.getZr()
      const zr = this.mychart.getZr()
      console.log(this.mychart.getZr())
      this.debug('chart图表的高 zr.dom.clientHeight', zr.dom.clientHeight)
      this.debug('chart图表的宽 zr.dom.clientWidth', zr.dom.clientWidth)
    },
    get_00_pixel() {
      const point = this.mychart.convertToPixel({ seriesIndex: 0 }, [0, 0]) // x最右边，y等于0，获取最大值位置的坐标
      this.debug('(0, 0)坐标像素位置', point)
    },
    get_chart_pixel() {
      this.debug('距离左边和上边', `${this.mychart.getDom().offsetLeft}, ${this.mychart.getDom().offsetTop}`)
    },
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
    margin-bottom: 10px;
  }
}
</style>

<template>
  <div class="home">
    <button @click="showVer">显示所有变量</button>
    <div id="chart1" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartsTest',
  data() {
    return {
      mychart: null
    }
  },
  mounted () {
    this.line()
    this.initMaxInput(this.mychart)
  },
  methods: {
    line() {
      // 基于准备好的dom，初始化echarts实例
      this.mychart = this.$echarts.init(document.getElementById('chart1'))

      // 指定图表的配置项和数据
      const option = {
        xAxis: {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7']
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [{ type: 'inside', }],

        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 760],
            type: 'line'
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      this.mychart.setOption(option)
    },
    showVer() {
      const option = this.mychart.getOption()
      const zr = this.mychart.getZr()
      console.log('option', option)
      console.log('zr', zr)
    },
    /**
     * 刷新最大值input框的位置，返回input框实例
     * 需要配置chart实例的id
     * @returns {HTMLElement}
     */
    resizeMaxInput(chart) {
      const chartId = 'chart1'
      let oDiv
      // 如果没有input框实例，则创建，有直接获取
      if(!this.maxInputId) { // 没有maxInputElement实例
        oDiv = document.createElement('input')
        oDiv.style = 'width: 43px;font-size: 10px;cursor: pointer;position: absolute;top:0;left:0;'
        oDiv.id = 'input_max_' + Math.random()
        this.maxInputId = oDiv.id
        document.getElementById(chartId).parentElement.appendChild(oDiv)
      } else {
        oDiv = document.getElementById(this.maxInputId)
      }
      /**
       * 获取echarts图表x轴n位置的像素坐标
       * @param chart echarts图表
       * @returns {{x, y}} 对应点的坐标
       */
      function getMaxPixel(chart) {
        const option = chart.getOption() // 获取图表的option
        // const x = option.dataZoom[0].endValue
        const x = 0
        const y = 800
        const pxInGrid = chart.convertToPixel({ seriesIndex: 0 }, [x, y]) // x最右边，y等于0，获取最大值位置的坐标
        // return { x: pxInGrid[0], y: pxInGrid[1] }
        return { x: pxInGrid[0], y: option.grid[0].top }
      }

      /**
       * 将echarts上一个点的像素坐标，转换为相对整个网页的坐标，方便dom操作
       * @param chart 对应的echarts图表
       * @param x
       * @param y
       * @returns {{x: *, y: *}} 对应坐标
       */
      function getMaxPagePixel(chart, { x, y }) {
        return { x: x + chart.getDom().offsetLeft, y: y + chart.getDom().offsetTop }
      }

      const { x, y } = getMaxPagePixel(chart, getMaxPixel(chart))
      // x = x - oDiv.clientWidth / 2
      // y = y + 5
      // console.log(x, y, oDiv.clientWidth)
      oDiv.style.position = 'absolute'
      oDiv.style.left = x + 'px'
      oDiv.style.top = y + 'px'
      return oDiv
    },
    /**
     * 初始化maxInput框，绑定事件
     * @param chart
     */
    initMaxInput(chart) {
      const oDiv = this.resizeMaxInput(chart) // 绘制input框

      // 设置input框的默认值
      const option = chart.getOption()
      const endValue = option.dataZoom[0].endValue // 设置oDiv的默认值
      oDiv.value = option.xAxis[0].data[endValue]

      oDiv.onfocus = function() { // 监听input获取焦点事件
        this.style.opacity = 1
      }
      oDiv.onclick = function(event) {
        event.stopPropagation() // 阻止事件的冒泡
        event.preventDefault() // 阻止默认事件的方法
        return false
      }
      oDiv.ondblclick = oDiv.onclick
      oDiv.onblur = function() { // 监听input离开焦点事件
        this.style.opacity = 0
        const value = this.value
        // console.log('相邻的值', value)
        this.value = value
        const option = {
          dataZoom: [{
            startValue: '0',
            endValue: '' + value
          }],
        }
        chart.setOption(option)
        // 控制图例滚动到开始
        chart.dispatchAction({
          type: 'legendScroll',
          scrollDataIndex: 0
        })
      }
      oDiv.onkeydown = function(event) {
        if(event.key === 'Enter') {
          // console.log('回车')
          this.onblur()
          this.style.opacity = 1
        }
      }
      chart.on('datazoom', () => {
        const option = chart.getOption()
        const endValue = option.dataZoom[0].endValue // 设置oDiv的默认值
        oDiv.value = option.xAxis[0].data[endValue] // 获取最后一个位置的值，放到input框中
      })
    },
  }
}
</script>

<style scoped lang="less">
.home {
  margin: 20px;
  #chart1 {
    padding: 20px;
    background: white;
  }
}
</style>

import * as echarts from 'echarts'
import { ref } from 'vue'
const strip = {
  variation(ref: string) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById(ref)!, 'dark');//dark为主题

    // 绘制图表
    myChart.setOption({
      title: {
        text: '大学生周末状况',
        subtext: '假数据',
        left: 'center'
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: ['宅在宿舍玩游戏', '宅在宿舍睡觉', '出去玩', '学习', '陪女朋友', '兼职', '做学习安排的事']
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          data: [1048, 735, 580, 118, 35, 147, 260],
        }
      ]
    });
  }
}
export default strip
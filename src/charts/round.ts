import * as echarts from 'echarts';
const round = {
  variation(id: string) {

    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom!,'dark');
    var option;
    option = {
      title: {
        text: '大学生周末状况',
        subtext: '假数据',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '大学生周末状况',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: '宅在宿舍玩游戏' },
            { value: 735, name: '宅在宿舍睡觉' },
            { value: 580, name: '出去玩' },
            { value: 484, name: '学习' },
            { value: 100, name: '陪女朋友' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    option && myChart.setOption(option);
  }
}

export default round
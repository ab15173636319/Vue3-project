import * as echarts from 'echarts'
export default function xAxis(id: string, smooth: boolean, dark: string) {
  var chartDom = document.getElementById(id);
  var myChart = echarts.init(chartDom!, dark);
  var option: any;

  option = {
    title: {
      text: '大学生周末状况',
      subtext: '假数据',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: ['宅在宿舍玩游戏', '宅在宿舍睡觉', '出去玩', '学习', '陪女朋友', '兼职', '做学习安排的事']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [1048, 735, 580, 118, 35, 147, 260],
        type: 'line',
        smooth: smooth
      }
    ]
  };

  myChart.on('mouseover', function (params) {
    // 控制台打印数据的名称
    console.log(params.name);
  });

  option && myChart.setOption(option);
}
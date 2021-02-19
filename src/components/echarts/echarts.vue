<template>
  <el-container class="me-main">
    <div id="main" style="width: 600px; height: 400px"></div>
  </el-container>
</template>
<script>
import * as echarts from "echarts";

export default {
  name: "echarts",
  props: {
    msg: String,
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
};
</script>
<style lang="less">
.me-main {
  // border: 1px solid red;
  display: flex;
  flex-direction: column !important;
  justify-content: center;
  align-items: center;
  div.me-button-group {
    flex: 1;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    // border: 1px solid red;
  }
  #main {
    // border: 1px solid red;
    width: 100%;
  }
}
</style>
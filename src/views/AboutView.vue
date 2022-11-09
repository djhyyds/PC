<template>
  <div class="about">
    <h3>风险级别</h3>
    <hr />
    <div class="action">
      <div class="code">
        <div>
          <p>高风险</p>
          <span>1</span>
          <div @click="filter('高风险')">查看详情</div>
        </div>
        <div id="main" style="width:150px;height:150px"></div>
      </div>
      <div class="code">
        <div>
          <p>警示</p>
          <span>{{result['警示']}}</span>
          <div @click="filter('警示')">查看详情</div>
        </div>
        <div id="main1" style="width:150px;height:150px"></div>
      </div>
      <div class="code">
        <div>
          <p>提示</p>
          <span>{{result['提示']}}</span>
          <div @click="filter('提示')">查看详情</div>
        </div>
        <div id="main2" style="width:150px;height:150px"></div>
      </div>
      <div class="code">
        <div>
          <p>利好</p>
          <span>{{result['利好']}}</span>
          <div @click="filter('利好')">查看详情</div>
        </div>
        <div id="main3" style="width:150px;height:150px"></div>
      </div>
    </div>
    <div class="code2">
      <div id="main4" style="width:100%;height:300px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      input: "",
      result: {},
      res: this.$store.state.res
    };
  },
  methods: {
    filter(a) {
      this.$router.push({
        name: "details",
        params: {
          result: "等级",
          a
        }
      });
    },
    show() {
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      let option;
      const gaugeData = [
        {
          value: ((1 / 170) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ];
      option = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: false,
              clip: false,
              itemStyle: {
                color: "red"
              }
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: gaugeData,
            detail: {
              fontSize: 20,
              color: "red",
              formatter: "{value}%"
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
    show1() {
      let chartDom = document.getElementById("main1");
      let myChart = echarts.init(chartDom);
      let option;
      const gaugeData = [
        {
          value: ((this.result["警示"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ];
      option = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: false,
              clip: false,
              itemStyle: {
                color: "#ff7d18"
              }
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: gaugeData,
            detail: {
              fontSize: 20,
              color: "#ff7d18",
              borderColor: "auto",
              formatter: "{value}%"
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
    show2() {
      let chartDom = document.getElementById("main2");
      let myChart = echarts.init(chartDom);
      let option;
      const gaugeData = [
        {
          value: ((this.result["提示"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ];
      option = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: false,
              clip: false,
              itemStyle: {
                color: "#aa77cc"
              }
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: gaugeData,
            detail: {
              fontSize: 20,
              color: "#aa77cc",
              borderColor: "auto",
              formatter: "{value}%"
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
    show3() {
      let chartDom = document.getElementById("main3");
      let myChart = echarts.init(chartDom);
      let option;
      const gaugeData = [
        {
          value: ((this.result["利好"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ];
      option = {
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: false,
              clip: false,
              itemStyle: {
                color: "#119944",
                borderColor: "#119944"
              }
            },
            axisLine: {
              lineStyle: {
                width: 20
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: gaugeData,
            detail: {
              fontSize: 20,
              color: "#119944",

              formatter: "{value}%"
            }
          }
        ]
      };
      option && myChart.setOption(option);
    },
    show4() {
      var chartDom = document.getElementById("main4");
      var myChart = echarts.init(chartDom);
      var option;

      setTimeout(function() {
        option = {
          legend: {},
          tooltip: {
            trigger: "axis"
          },
          dataset: {
            source: [
              ["22.4", "22.5", "22.6", "22.7", "22.8", "22.9"],
              ["提示", 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
              ["利好", 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
              ["警示", 20.1, 62.2, 69.5, 36.4, 45.2, 32.5],
              ["高风险", 25.2, 37.1, 41.2, 18, 33.9, 49.1]
            ]
          },
          xAxis: { type: "category", boundaryGap: false },
          yAxis: { gridIndex: 0 },
          grid: { top: "20%" },
          series: [
            {
              type: "line",
              smooth: true,
              seriesLayoutBy: "row",
              symbol: "none",
              emphasis: { focus: "series" }
            },
            {
              type: "line",
              smooth: true,
              symbol: "none",
              seriesLayoutBy: "row",
              emphasis: { focus: "series" }
            },
            {
              type: "line",
              smooth: true,
              symbol: "none",
              seriesLayoutBy: "row",
              emphasis: { focus: "series" }
            },
            {
              type: "line",
              smooth: true,
              symbol: "none",
              seriesLayoutBy: "row",
              emphasis: { focus: "series" }
            }
          ]
        };
        myChart.on("updateAxisPointer", function(event) {
          const xAxisInfo = event.axesInfo[0];
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1;
            myChart.setOption({
              series: {
                id: "pie",
                label: {
                  formatter: "{b}: {@[" + dimension + "]} ({d}%)"
                },
                encode: {
                  value: dimension,
                  tooltip: dimension
                }
              }
            });
          }
        });
        myChart.setOption(option);
      });

      option && myChart.setOption(option);
    }
  },
  mounted() {
    this.show();
    this.show1();
    this.show2();
    this.show3();
    this.show4();
  },
  created() {
    this.res.forEach(item => {
      if (this.result[item["等级"]]) {
        this.result[item["等级"]]++;
      } else {
        this.result[item["等级"]] = 1;
      }
    });
  }
};
</script>

<style lang='less'>
.about {
  .input {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    span {
      margin-left: 10px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  .action {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .code {
      padding: 10px;
      border-radius: 10px;
      width: 20%;
      border: 1px solid #eaeaea;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      div {
        p {
          font-weight: 100;
          margin: 0;
        }
        div {
          font-size: 12px;
          font-weight: 100;
        }
        span {
          display: block;
          font-size: 24px;
          margin: 5px 0;
          font-weight: bold;
        }
      }
    }
  }
  .code2 {
    padding: 10px;
    margin-top: 60px;
    border-radius: 10px;
    border: 1px solid #eaeaea;
  }
}
</style>
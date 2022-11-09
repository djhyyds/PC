<template>
  <div class="about">
    <h3>风险级别</h3>
    <hr />
    <div class="input">
      <div>
        动态时间：
        <span @click="DateTime(86400)" :class="date == 86400 ? 'active' : ''"
          >今天</span
        >
        <span @click="DateTime(604800)" :class="date == 604800 ? 'active' : ''"
          >近7天</span
        >
        <span
          @click="DateTime(2592000)"
          :class="date == 2592000 ? 'active' : ''"
          >近30天</span
        >
      </div>
    </div>
    <div class="action">
      <div class="code">
        <div>
          <p>高风险</p>
          <span>{{ result["高风险"] }}</span>
          <div @click="filter('高风险')">查看详情</div>
        </div>
        <div id="main" style="width: 150px; height: 150px" ref="main"></div>
      </div>
      <div class="code">
        <div>
          <p>警示</p>
          <span>{{ result["警示"] }}</span>
          <div @click="filter('警示')">查看详情</div>
        </div>
        <div id="main1" style="width: 150px; height: 150px" ref="main1"></div>
      </div>
      <div class="code">
        <div>
          <p>提示</p>
          <span>{{ result["提示"] }}</span>
          <div @click="filter('提示')">查看详情</div>
        </div>
        <div id="main2" style="width: 150px; height: 150px" ref="main2"></div>
      </div>
      <div class="code">
        <div>
          <p>利好</p>
          <span>{{ result["利好"] }}</span>
          <div @click="filter('利好')">查看详情</div>
        </div>
        <div id="main3" style="width: 150px; height: 150px" ref="main3"></div>
      </div>
    </div>
    <div class="code2">
      <div id="main4" style="width: 100%; height: 300px" ref="main4"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
export default {
  data () {
    return {
      date: "",
      input: "",
      result: { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 },
      res2: this.$store.state.res,
      res: "",
      gaugeData: [],
      myChart: "",
      myChart1: "",
      myChart2: "",
      myChart3: "",
      myChart4: ""
    }
  },
  methods: {
    into () {
      this.res = this.res2.filter(
        item => 1666972800 - item.时间戳 <= this.date
      )
      this.res.forEach(item => {
        if (this.result[item["等级"]]) {
          this.result[item["等级"]]++
        } else {
          this.result[item["等级"]] = 1
        }
      })
    },
    DateTime (a) {

      this.result = { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 }
      this.$store.commit("DateChange", a)
      this.date = this.$store.state.date
      this.into()
      this.show()
      this.show1()
      this.show2()
      this.show3()
    },
    filter (a) {
      this.$router.push({
        name: "details",
        params: {
          result: "等级",
          a
        }
      })
    },
    show () {
      let option
      this.gaugeData = [
        {
          value: ((this.result["高风险"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ]
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
            data: this.gaugeData,
            detail: {
              fontSize: 20,
              color: "red",
              formatter: "{value}%"
            }
          }
        ]
      }
      option && this.myChart.setOption(option, true)
    },
    show1 () {
      let option
      const gaugeData = [
        {
          value: ((this.result["警示"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ]
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
      }
      option && this.myChart1.setOption(option, true)
    },
    show2 () {
      let option
      this.gaugeData = [
        {
          value: ((this.result["提示"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ]
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
            data: this.gaugeData,
            detail: {
              fontSize: 20,
              color: "#aa77cc",
              borderColor: "auto",
              formatter: "{value}%"
            }
          }
        ]
      }
      option && this.myChart2.setOption(option, true)
    },
    show3 () {
      let option
      const gaugeData = [
        {
          value: ((this.result["利好"] / this.res.length) * 100).toFixed(2),
          detail: {
            valueAnimation: false,
            offsetCenter: ["0%", "0%"]
          }
        }
      ]

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
      }
      option && this.myChart3.setOption(option)
    },
    show4 () {
      let main4 = this.$refs.main4
      let myChart4 = echarts.init(main4)
      var option
      setTimeout(function () {
        option = {
          legend: {},
          tooltip: {
            trigger: "axis"
          },
          dataset: {
            source: [
              ["", "2022-13-13", "23-12-12", "31-12"],
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
        }
        myChart4.on("updateAxisPointer", function (event) {
          const xAxisInfo = event.axesInfo[0]
          if (xAxisInfo) {
            const dimension = xAxisInfo.value + 1
            myChart4.setOption({
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
            })
          }
        })
        myChart4.setOption(option)
      })

      option && myChart4.setOption(option)
    }
  },
  mounted () {
    let main1 = this.$refs.main1
    this.myChart1 = echarts.init(main1)
    let main2 = this.$refs.main2
    this.myChart2 = echarts.init(main2)
    let main3 = this.$refs.main3
    this.myChart3 = echarts.init(main3)
    let main = this.$refs.main
    this.myChart = echarts.init(main)
    this.show()
    this.show1()
    this.show2()
    this.show3()
    this.show4()
  },
  created () {
    this.date = this.$store.state.date
    this.into()
  }
};
</script>

<style lang='less' scoped>
.about {
  .input {
    display: flex;
    justify-content: end;
    margin: 20px;
    .active {
      color: aqua;
    }
    span {
      cursor: pointer;
      margin-left: 10px;
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
          font-size: 24px;
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
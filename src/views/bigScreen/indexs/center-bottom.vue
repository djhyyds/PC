<template>
  <div class="center_bottom">
    <Echart
      :options="options"
      id="bottomLeftChart"
      class="echarts_bottom"
    ></Echart>
  </div>
</template>

<script>

export default {
  data () {
    return {
      options: {},
    }
  },
  props: {

  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.pageflag = true
      let res = this.$store.state.json[0]


      this.init(res.data)
    }
    ,

    init (newData) {
      this.options = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter: function (params) {
            // 添加单位
            var result = params[0].name + "<br>"
            params.forEach(function (item) {
              if (item.value) {
                if (item.seriesName == "高风险") {
                  result += item.marker + " " + item.seriesName + " : " + item.value + "%</br>"
                } else {
                  result += item.marker + " " + item.seriesName + " : " + item.value + "个</br>"
                }
              } else {
                result += item.marker + " " + item.seriesName + " :  - </br>"
              }
            })
            return result
          }
        },
        legend: {
          data: ["提示", "警示", "高风险"],
          textStyle: {
            color: "#B4B4B4"
          },
          top: "0"
        },
        grid: {
          left: "50px",
          right: "40px",
          bottom: "30px",
          top: "20px",
        },
        xAxis: {
          data: newData.category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4"
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },

            axisLabel: {
              formatter: "{value}"
            }
          },
          {
            splitLine: { show: false },
            axisLine: {
              lineStyle: {
                color: "#B4B4B4"
              }
            },
            axisLabel: {
              formatter: "{value}% "
            }
          }
        ],
        series: [

          {
            name: "提示",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#956FD4" },
                  { offset: 1, color: "#3EACE5" }
                ])
              }
            },
            data: newData.barData
          },
          {
            name: "警示",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              normal: {
                barBorderRadius: 5,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(156,107,211,0.8)" },
                  { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                  { offset: 1, color: "rgba(156,107,211,0.2)" }
                ])
              }
            },
            z: -12,
            data: newData.lineData
          },
          {
            name: "高风险",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                color: "#F02FC2"
              }
            },
            data: newData.rateData
          },
        ]
      }
    }
  },

}
</script>
<style lang="scss" scoped>
.center_bottom {
  width: 100%;
  height: 100%;

  .echarts_bottom {
    width: 100%;
    height: 100%;
  }
}
</style>
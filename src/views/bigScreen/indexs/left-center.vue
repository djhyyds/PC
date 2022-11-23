<template>

    <Echart
      id="leftCenter"
      :options="options"
      class="left_center_inner"
      ref="charts"
    />
</template>

<script>
export default {
  data () {
    return {
      options: {},
      countUserNumData: {
        lockNum: 10,
        onlineNum: 10,
        offlineNum: 10,
        totalNum: 10
      },
      pageflag: true,
      timer: null
    }
  },
  created () {
    this.getData()
  },
  mounted () {
  },
  beforeDestroy () {
    this.clearData()

  },
  methods: {
    clearData () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    getData () {
      this.pageflag = true
           
      // this.countUserNumData = res.data
      this.$nextTick(() => {
        this.init()
        // this.switper()
      })
    },
    //轮询
    // switper () {
    //   if (this.timer) {
    //     return
    //   }
    //   let looper = (a) => {
    //     this.getData()
    //   }
    //   this.timer = setInterval(looper, this.$store.state.settings.echartsAutoTime)
    //   let myChart = this.$refs.charts.chart
    //   myChart.on('mouseover', params => {
    //     this.clearData()
    //   })
    //   myChart.on('mouseout', params => {
    //     this.timer = setInterval(looper, this.$store.state.settings.echartsAutoTime)
    //   })
    // },
    init () {
      let total = this.countUserNumData.totalNum
      let colors = ["#ECA444", "#33A1DB", "#56B557", "#f5023d"]
      let piedata = {
        name: "用户总览",
        type: "pie",
        radius: ["42%", "65%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 2,
        },

        color: colors,
        data: [
          // {
          //   value: 0,
          //   name: "告警",
          //   label: {
          //     shadowColor: colors[0],
          //   },
          // },
          {
            value: this.countUserNumData.lockNum,
            name: "警示",
            label: {
              shadowColor: colors[0],
            },
          },
          {
            value: this.countUserNumData.onlineNum,
            name: "利好",
            label: {
              shadowColor: colors[2],
            },
          },
          {
            value: this.countUserNumData.offlineNum,
            name: "提示",
            label: {
              shadowColor: colors[1],
            },
          },
          {
            value: this.countUserNumData.offlineNum,
            name: "高风险",
            label: {
              shadowColor: colors[4],
            },
          },


        ],
      }
      this.options = {
        title: {
          // zlevel: 0,
          text: ["{value|" + total + "}", "{name|总数}"].join("\n"),
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              value: {
                color: "#ffffff",
                fontSize: 24,
                fontWeight: "bold",
                lineHeight: 20,
              },
              name: {
                color: "#ffffff",
                lineHeight: 20,
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        legend: {
          show: false,
          top: "5%",
          left: "center",
        },
        series: [
          //展示圆点
          {
            ...piedata,
            tooltip: { show: true },
            label: {
              formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
              //   position: "outside",
              rich: {
                b: {
                  color: "#fff",
                  fontSize: 12,
                  lineHeight: 26,
                },
                c: {
                  color: "#31ABE3",
                  fontSize: 14,
                },
                per: {
                  color: "#31ABE3",
                  fontSize: 14,
                },
              },
            },
            labelLine: {
              length: 20, // 第一段线 长度
              length2: 36, // 第二段线 长度
              show: true,
              emphasis: {
                show: true,
              },
            },
          },
          {
            ...piedata,
            tooltip: { show: true },
            itemStyle: {},
            label: {
              backgroundColor: "auto", //圆点颜色，auto：映射的系列色
              height: 0,
              width: 0,
              lineHeight: 0,
              borderRadius: 2.5,
              shadowBlur: 8,
              shadowColor: "auto",
              padding: [2.5, -2.5, 2.5, -2.5],
            },
            labelLine: {
              length: 20, // 第一段线 长度
              length2: 36, // 第二段线 长度
              show: false,
            },
          },
        ],
      }
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
<template>
  <div class="about">
    <h2>风险级别</h2>
    <hr />
    <div class="input">
      <el-select
        v-if="this.$store.state.show"
        v-model="search2"
        multiple
        collapse-tags
        filterable
        clearable
        @change="onSearch"
        placeholder="请选择分组"
      >
        <el-option
          v-for="item in setOption2"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <div v-else></div>
      <div>
        动态时间：
        <!-- <span @click="DateTime(86400)" :class="date == 86400 ? 'active' : ''"
          >今天</span
        > -->
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
      <div id="main4" style="width: 100%; height: 400px" ref="main4"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      search: "",
      date: "",
      input: "",
      setOption2: ['全部'],
      search2: '',
      result: { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 },
      res2: this.$store.state.res,
      res: [],
      myChart: "",
      myChart1: "",
      myChart2: "",
      myChart3: "",
      myChart4: "",
      ECres: this.$store.state.ECres
    }
  },
  methods: {
    onSearch () {
      if (this.search2[this.search2.length - 1] == '全部' || this.search2.length == 0) {
        this.search2 = ['全部']
      } else {
        this.search2 = this.search2.filter(item => item != '全部')
      }
      console.log(this.search2)
      this.$store.commit("SearchChange", this.search2)
      this.into()
    },
    into () {
      this.result = { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 }

      this.res = this.res2.filter(
        item => {
          if (this.search2.length != 0 && this.search2.indexOf('全部') == -1) {
            return this.$store.state.nowDate / 1000 - item.时间戳 <= this.date && this.search2.find(a => a == item.分组)

          } else {
            return this.$store.state.nowDate / 1000 - item.时间戳 <= this.date
          }

        }
      )
      this.res.forEach(item => {
        if (this.result[item["等级"]]) {
          this.result[item["等级"]]++;
        } else {
          this.result[item["等级"]] = 1;
        }
      })
      if (this.res.length == 0) {
        this.res.length = 1
      }
      this.show5()
      this.show1()
      this.show2()
      this.show3()
      this.show4()
    },
    DateTime (a) {
      this.$store.commit("DateChange", a)
      this.date = this.$store.state.date
      this.into()
    },
    filter(a) {
      this.$router.push({
        name: "details",
        params: {
          result: "等级",
          a
        }
      });
    },
    show5 () {
      let option
      let gaugeData = [
        {
          value: ((this.result["高风险"] / this.res.length) * 100).toFixed(2),
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
              borderColor: "auto",
              formatter: "{value}%"
            }
          }
        ]
      };
      option && this.myChart.setOption(option, true);
    },
    show1 () {
      let option

      let gaugeData = [
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
      option && this.myChart1.setOption(option, true);
    },
    show2 () {
      let option
      let gaugeData = [
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
      option && this.myChart2.setOption(option, true);
    },
    show3 () {
      let option
      let gaugeData = [
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
      option && this.myChart3.setOption(option);
    },
    show4 () {
      var option
      let a, b = true
      a = this.date == 604800 ? 7 : 30
      let s = []
      if (this.search2.length) {
        this.search2.forEach(item2 => {
          let r = this.ECres.find(
            item => {
              if (this.search2.length != 0 && this.search2.indexOf('全部') == -1) {
                b = item.group === item2
              } else {
                if (item.group == 'all') { b = item.group == 'all' }
                else if (item.group.substr(item.group.length - 3, item.group.length - 1) === 'all') {
                  b = item.group.substr(item.group.length - 3, item.group.length - 1) === 'all'
                } else {
                  b = item.group.substr(0, 2) === '人法' || item.group.substr(0, 2) === '数科'
                }
              }
              return item['source_' + a] && b
            }
          )
          s.push(r)
       
        })
      }

      let aaa = null
      if (s.length == 1) {
        aaa = s[0]
      } else {
        let ts = [[], [], [], [], []]
        s.forEach(item => {
          ts[0] = item['source_' + a][0]
          ts[1].push(item['source_' + a][1])
          ts[2].push(item['source_' + a][2])
          ts[3].push(item['source_' + a][3])
          ts[4].push(item['source_' + a][4])
        })
        ts.forEach((item, index) => {
          if (index > 0) {
            ts[index] = item.reduce((prev, cur) => {
              cur.forEach((item, index) => {
                if (typeof prev[index] === 'number') {
                  prev[index] += item
                } else {
                  prev[index] = item
                }
              })
              return prev
            }, [])
          }
        })
        aaa = {}
        aaa['source_' + a] = ts
      }

      option = {
        legend: {},
        tooltip: {
          trigger: "axis"
        },
        dataset: {
          source: aaa['source_' + a]
        },
        xAxis: { type: "category", boundaryGap: false },
        yAxis: { gridIndex: 0 },
        grid: { top: "20%" },
        series: [
          {
            type: "line",
            smooth: true,
            seriesLayoutBy: "row",
            // symbol: "none",
            symbolSize: 5,//一定要加这个字段才能显示
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 13,
                  textStyle: {
                    color: 'auto'
                  }
                }
              }
            },


            emphasis: { focus: "series" }
          },
          {
            type: "line",
            smooth: true,
            // symbol: "none",
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
            symbolSize: 5,//一定要加这个字段才能显示
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 13,
                  textStyle: {
                    color: 'auto'
                  }
                }
              }
            },
          },
          {
            type: "line",
            smooth: true,
            // symbol: "none",
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
            symbolSize: 5,//一定要加这个字段才能显示
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 13,
                  textStyle: {
                    color: 'auto'
                  }
                }
              }
            },
          },
          {
            type: "line",
            smooth: true,
            // symbol: "none",
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
            symbolSize: 5,//一定要加这个字段才能显示
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'top',
                  fontSize: 13,
                  textStyle: {
                    color: 'auto'
                  }
                }
              }
            },
          }
        ]
      }
      // this.myChart4.on("updateAxisPointer", function (event) {
      //   const xAxisInfo = event.axesInfo[0]
      //   if (xAxisInfo) {
      //     const dimension = xAxisInfo.value + 1
      //     this.myChart4.setOption({
      //       series: {
      //         id: "pie",
      //         label: {
      //           formatter: "{b}: {@[" + dimension + "]} ({d}%)"
      //         },
      //         encode: {
      //           value: dimension,
      //           tooltip: dimension
      //         }
      //       }
      //     })
      //   }
      // })

      this.myChart4.setOption(option)
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
    let main4 = this.$refs.main4
    this.myChart4 = echarts.init(main4)
    this.into()
  },
  created () {
    this.date = this.$store.state.date
    this.res2.forEach(item => {
      if (this.setOption2.indexOf(item.分组) == -1) {
        this.setOption2.push(item.分组)
      }
    })
    if (this.$store.state.search == '全部') {
      this.$store.commit("showChange", this.setOption2)

    }

    this.setOption2 = this.$store.state.setOption
    this.search2 = this.$store.state.search
  }
};
</script>

<style lang='less' scoped>
.about {
  .input {
    .el-select {
      width: 240px;
    }
    display: flex;
    justify-content: space-between;
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
          cursor: pointer;
          &:hover {
            color: aqua;
          }
          font-size: 12px;
          font-weight: 100;
          cursor: pointer;
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
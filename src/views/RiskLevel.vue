<template>
  <div class="risk">
    <h2>风险维度</h2>
    <hr />
    <div class="input">
      <el-select
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
      <div></div>
      <div>
        动态时间：
        <!-- <span @click="DateTime(86400)" :class="date==86400?'active':''">今天</span> -->
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
          <p>司法风险</p>
          <span>{{ result["司法风险"] }}</span>
          <div @click="filter('司法风险')">查看详情</div>
        </div>
        <div id="main" style="width: 150px; height: 150px" ref="main"></div>
      </div>
      <div class="code">
        <div>
          <p>工商风险</p>
          <span>{{ result["工商风险"] }}</span>
          <div @click="filter('工商风险')">查看详情</div>
        </div>
        <div id="main1" style="width: 150px; height: 150px" ref="main1"></div>
      </div>
      <div class="code">
        <div>
          <p>经营风险</p>
          <span>{{ result["经营风险"] }}</span>
          <div @click="filter('经营风险')">查看详情</div>
        </div>
        <div id="main2" style="width: 150px; height: 150px" ref="main2"></div>
      </div>
      <div class="code">
        <div>
          <p>经营状况</p>
          <span>{{ result["经营状况"] }}</span>
          <div @click="filter('经营状况')">查看详情</div>
        </div>
        <div id="main3" style="width: 150px; height: 150px" ref="main3"></div>
      </div>
    </div>
    <div class="code2">
      <div id="main4" style="width: 100%; height: 500px" ref="main4"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts"
export default {
  data () {
    return {
      setOption: ["全部"],
      search: "",
      info: [],
      date: this.$store.state.date,
      ECres: this.$store.state.ECres,
      myChart: "",
      myChart1: "",
      myChart2: "",
      myChart3: "",
      myChart4: "",
      setOption2: this.$store.state.setOption,
      search2: this.$store.state.search,
      res2: this.$store.state.res,
      res: [],
      result: { 司法风险: 0, 工商风险: 0, 经营风险: 0, 经营状况: 0 }
    }
  },
  methods: {
    onSearch () {
      if (this.search2[this.search2.length - 1] == '全部' || this.search2.length == 0) {
        this.search2 = ['全部']
      } else {
        this.search2 = this.search2.filter(item => item != '全部')
      }
      this.$store.commit("SearchChange", this.search2)
      this.into()
    },
    into () {
      this.result = { 司法风险: 0, 工商风险: 0, 经营风险: 0, 经营状况: 0 }
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
        if (this.result[item["风险维度"]]) {
          this.result[item["风险维度"]]++
        } else {
          this.result[item["风险维度"]] = 1
        }
      })
      if (this.res.length == 0) {
        this.res.length = 1
      }
      this.show()
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
    filter (b) {
      this.$router.push({
        name: "details",
        params: {
          result: "风险维度",
          b
        }
      })
    },
    show () {
      let option
      const gaugeData = [
        {
          value: ((this.result["司法风险"] / this.res.length) * 100).toFixed(2),
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
              clip: false
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
              color: "auto",
              formatter: "{value}%"
            }
          }
        ]
      }
      option && this.myChart.setOption(option)
    },
    show1 () {
      let option
      const gaugeData = [
        {
          value: ((this.result["工商风险"] / this.res.length) * 100).toFixed(2),
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
              clip: false
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
              color: "auto",
              borderColor: "auto",
              formatter: "{value}%"
            }
          }
        ]
      }
      option && this.myChart1.setOption(option)
    },
    show2 () {
      let option
      const gaugeData = [
        {
          value: ((this.result["经营风险"] / this.res.length) * 100).toFixed(2),
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
              clip: false
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
              color: "auto",
              formatter: "{value}%"
            }
          }
        ]
      }
      option && this.myChart2.setOption(option)
    },
    show3 () {
      let option
      const gaugeData = [
        {
          value: ((this.result["经营状况"] / this.res.length) * 100).toFixed(2),
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
              clip: false
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
              color: "auto",
              formatter: "{value}%"
            }
          }
        ]
      }
      option && this.myChart3.setOption(option)
    },
    show4 () {
      let option

      let a, b = true
      a = this.date == 604800 ? 7 : 30
      let s = [], r = []
      if (this.search2.length) {
        this.search2.forEach(item2 => {
          r = this.ECres.find(
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

              return item["info_" + a] && b

            }
          )
          s.push(r)
        })
      }

      let aaa = null
      if (s.length == 1) {
        aaa = s[0]
      } else {
        let ts = []
        ts = s.reduce((prev, cur) => {
          return cur["info_" + a].concat(prev)
        }, [])

        let temp = {}   //用于name判断重复
        let result = []  //最后的新数组

        ts.map(function (item) {
          if (!temp[item.name]) {
            result.push(JSON.parse(JSON.stringify(item)))
            temp[item.name] = true
          } else {
            result.filter(a => a.name == item.name)[0].value += item.value
          }
          aaa = {}
          aaa["info_" + a] = result
        })

      }
      let data = aaa["info_" + a]
      data = data.sort((a, b) => {
        let value1 = a["value"],
          value2 = b["value"]
        return value2 - value1
      })
      option = {
        series: {
          type: "pie",
          radius: [80, 160],
          emphasis: {
            focus: "self"
          },
          left: "center",
          width: "700px",
          label: {
            formatter: "{name|{b}:{c}，{d}%} \n",
            minMargin: 1,
            edgeDistance: 1,
            lineHeight: 1,
            rich: {
              name: {
                fontSize: "13",
                color: "auto"
              }
            }
          },
          data: data
        }
      }
  
      option && this.myChart4.setOption(option)
      this.myChart4.on('click', (e) => {
        this.$router.push({ name: 'details', params: { name: e.name } })
      })
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

  }
};
</script>

<style scoped lang='less'>
.input {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  margin: 20px;
  .el-select {
    width: 240px;
  }
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
        font-size: 12px;
        font-weight: 100;
        cursor: pointer;
        &:hover {
          color: aqua;
        }
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
  height: 100%;
  padding: 10px;
  margin-top: 30px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
}
</style>
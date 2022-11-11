<template>
  <div class="about">
    <h2>风险级别</h2>
    <hr />
    <div class="input">
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item>
          <el-select
            style="width:130px"
            @change="onSubmit"
            v-model="formInline.region"
            placeholder="风险级别"
          >
            <el-option label="全部" value></el-option>
            <el-option label="高风险" value="高风险"></el-option>
            <el-option label="警示" value="警示"></el-option>
            <el-option label="提示" value="提示"></el-option>
            <el-option label="利好" value="利好"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-cascader
            v-model="value"
            :options="options"
            :show-all-levels="false"
            :props="{ checkStrictly: true, expandTrigger: 'hover' }"
            popper-class="myCascade"
            filterable
            ref="myCascadeRef"
          >
            <template slot-scope="{ node, data }">
              <div @click="()=>onItemClick(node,data)">
                <span>{{ data.label }}</span>
           
              </div>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-select v-model="search" filterable clearable @change="onSearch" placeholder="请输入公司名称">
            <el-option v-for="item in setOption" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item class="box">
          <el-select v-model="search" filterable clearable @change="into" placeholder="请选择分组">
            <el-option v-for="item in setOption" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        动态时间：
        <span @click="DateTime(691200)" :class="date==691200?'active':''">近7天</span>
        <span @click="DateTime(2592000)" :class="date==2592000?'active':''">近30天</span>
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
      source: [],
      setOption: ["全部"],
      // source_30: [
      //   [
      //     "date",
      //     "2022-10-12",
      //     "2022-10-13",
      //     "2022-10-14",
      //     "2022-10-15",
      //     "2022-10-16",
      //     "2022-10-17",
      //     "2022-10-18",
      //     "2022-10-19",
      //     "2022-10-20",
      //     "2022-10-21",
      //     "2022-10-22",
      //     "2022-10-23",
      //     "2022-10-24",
      //     "2022-10-25",
      //     "2022-10-26",
      //     "2022-10-27",
      //     "2022-10-28",
      //     "2022-10-29",
      //     "2022-10-30",
      //     "2022-10-31",
      //     "2022-11-01",
      //     "2022-11-02",
      //     "2022-11-03",
      //     "2022-11-04",
      //     "2022-11-05",
      //     "2022-11-06",
      //     "2022-11-07",
      //     "2022-11-08",
      //     "2022-11-09",
      //     "2022-11-10"
      //   ],
      //   [
      //     "提示",
      //     36,
      //     28,
      //     12,
      //     1,
      //     0,
      //     3,
      //     9,
      //     6,
      //     15,
      //     13,
      //     0,
      //     0,
      //     8,
      //     4,
      //     9,
      //     13,
      //     7,
      //     4,
      //     1,
      //     7,
      //     10,
      //     7,
      //     7,
      //     4,
      //     1,
      //     4,
      //     6,
      //     7,
      //     10,
      //     3
      //   ],
      //   [
      //     "利好",
      //     4,
      //     0,
      //     41,
      //     0,
      //     0,
      //     28,
      //     20,
      //     0,
      //     0,
      //     24,
      //     0,
      //     0,
      //     4,
      //     32,
      //     14,
      //     0,
      //     55,
      //     0,
      //     0,
      //     1,
      //     31,
      //     0,
      //     0,
      //     34,
      //     4,
      //     0,
      //     1,
      //     7,
      //     0,
      //     0
      //   ],
      //   [
      //     "警示",
      //     0,
      //     49,
      //     5,
      //     1,
      //     1,
      //     1,
      //     0,
      //     2,
      //     4,
      //     12,
      //     2,
      //     1,
      //     0,
      //     2,
      //     4,
      //     8,
      //     7,
      //     1,
      //     9,
      //     1,
      //     0,
      //     10,
      //     22,
      //     1,
      //     21,
      //     0,
      //     3,
      //     1,
      //     6,
      //     0
      //   ],
      //   [
      //     "高风险",
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     0,
      //     1,
      //     0,
      //     0,
      //     0,
      //     0,
      //     1,
      //     0,
      //     0,
      //     0,
      //     1,
      //     0,
      //     0,
      //     0,
      //     0,
      //     1,
      //     0,
      //     2,
      //     0
      //   ]
      // ],
      // source_7: [
      //   [
      //     "date",
      //     "2022-11-03",
      //     "2022-11-04",
      //     "2022-11-05",
      //     "2022-11-06",
      //     "2022-11-07",
      //     "2022-11-08",
      //     "2022-11-09",
      //     "2022-11-10"
      //   ],
      //   ["提示", 7, 4, 1, 4, 6, 7, 10, 3],
      //   ["利好", 0, 34, 4, 0, 1, 7, 0, 0],
      //   ["警示", 22, 1, 21, 0, 3, 1, 6, 0],
      //   ["高风险", 0, 0, 0, 0, 1, 0, 2, 0]
      // ],
      result: { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 },
      res2: this.$store.state.res,
      res: "",
      gaugeData: [],
      myChart: "",
      myChart1: "",
      myChart2: "",
      myChart3: "",
      myChart4: ""
    };
  },
  methods: {
    into() {
      this.$store.commit("groupChange", this.search);
      let source2 = this.$store.state.groupData;
      console.log(source2);
      this.source = source2.filter(item => {
        let bool = true;
        if (this.search) {
          bool = item.group.substring(0, 1) == this.search.substring(0, 1);
          return bool;
        } else {
          return item.group == "全部";
        }
      });
      console.log(this.source);
      this.source =
        this.date === 691200
          ? this.source[1].source_7
          : this.source[0].source_30;
      this.result = { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 };
      this.res = this.res2.filter(item => {
        let bool = true;
        if (this.search && this.search != "全部")
          bool = item.分组.substring(0, 1) == this.search.substring(0, 1);
        return 1668182400 - item.时间戳 <= this.date && bool;
      });
      this.res.forEach(item => {
        if (this.result[item["等级"]]) {
          this.result[item["等级"]]++;
        } else {
          this.result[item["等级"]] = 1;
        }
      });
      this.show4();
      this.show();
      this.show1();
      this.show2();
      this.show3();
    },
    DateTime(a) {
      this.result = { 高风险: 0, 警示: 0, 提示: 0, 利好: 0 };
      this.$store.commit("DateChange", a);
      this.date = this.$store.state.date;
      this.into();
      this.show();
      this.show1();
      this.show2();
      this.show3();
      this.show4();
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
    show() {
      let option;
      this.gaugeData = [
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
            data: this.gaugeData,
            detail: {
              fontSize: 20,
              color: "red",
              formatter: "{value}%"
            }
          }
        ]
      };
      option && this.myChart.setOption(option, true);
    },
    show1() {
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
      option && this.myChart1.setOption(option, true);
    },
    show2() {
      let option;
      this.gaugeData = [
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
            data: this.gaugeData,
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
    show3() {
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
      option && this.myChart3.setOption(option);
    },
    show4() {
      var option;
      option = {
        legend: {},
        // tooltip: {
        //   trigger: "axis"
        // },
        dataset: {
          source: this.source
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

            emphasis: { focus: "series" },
            symbolSize: 8,
            itemStyle: {
              normal: {
                label: {
                  show: true // 在折线拐点上显示数据
                }
              }
            }
          },
          {
            type: "line",
            smooth: true,
            // symbol: "none",
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
            symbolSize: 8,
            itemStyle: {
              normal: {
                label: {
                  show: true // 在折线拐点上显示数据
                }
              }
            }
          },
          {
            type: "line",
            smooth: true,
            // symbol: "none",
            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
            symbolSize: 8,
            itemStyle: {
              normal: {
                label: {
                  show: true // 在折线拐点上显示数据
                }
              }
            }
          },
          {
            type: "line",
            smooth: true,

            seriesLayoutBy: "row",
            emphasis: { focus: "series" },
            symbolSize: 8,
            itemStyle: {
              normal: {
                label: {
                  show: true // 在折线拐点上显示数据
                }
              }
            }
          }
        ]
      };
      this.myChart4.on("updateAxisPointer", event => {
        const xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
          const dimension = xAxisInfo.value + 1;
          this.myChart4.setOption({
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
      option && this.myChart4.setOption(option);
    }
  },
  mounted() {
    let main1 = this.$refs.main1;
    this.myChart1 = echarts.init(main1);
    let main2 = this.$refs.main2;
    this.myChart2 = echarts.init(main2);
    let main3 = this.$refs.main3;
    this.myChart3 = echarts.init(main3);
    let main = this.$refs.main;
    this.myChart = echarts.init(main);
    let main4 = this.$refs.main4;
    this.myChart4 = echarts.init(main4);
    // this.show();
    // this.show1();
    // this.show2();
    // this.show3();
    // this.show4();
    this.into();
  },
  created() {
    this.search = this.$store.state.group;
    this.res2.forEach(item => {
      if (this.setOption.indexOf(item.分组) == -1) {
        this.setOption.push(item.分组);
      }
    });
    // this.source = this.$store.state.groupData[1].source_7;
    // console.log(this.source);
    this.date = this.$store.state.date;
  }
};
</script>

<style lang='less' scoped>
.about {
  .input {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    div {
      .active {
        color: aqua;
      }
      span {
        cursor: pointer;
        margin-left: 10px;
      }
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
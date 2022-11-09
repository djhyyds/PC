<template>
  <div class="risk">
    <h3>风险维度</h3>
    <hr />
    <div class="input">
      <div>
        动态时间：
        <span @click="DateTime(86400)" :class="date==86400?'active':''">今天</span>
        <span @click="DateTime(604800)" :class="date==604800?'active':''">近7天</span>
        <span @click="DateTime(2592000)" :class="date==2592000?'active':''">近30天</span>
      </div>
    </div>
    <div class="action">
      <div class="code">
        <div>
          <p>司法风险</p>
          <span>{{result['司法风险']}}</span>
          <div @click="filter('司法风险')">查看详情</div>
        </div>
        <div id="main" style="width:150px;height:150px" ref="main"></div>
      </div>
      <div class="code">
        <div>
          <p>工商风险</p>
          <span>{{result['工商风险']}}</span>
          <div @click="filter('工商风险')">查看详情</div>
        </div>
        <div id="main1" style="width:150px;height:150px" ref="main1"></div>
      </div>
      <div class="code">
        <div>
          <p>经营风险</p>
          <span>{{result['经营风险']}}</span>
          <div @click="filter('经营风险')">查看详情</div>
        </div>
        <div id="main2" style="width:150px;height:150px" ref="main2"></div>
      </div>
      <div class="code">
        <div>
          <p>经营状况</p>
          <span>{{result['经营状况']}}</span>
          <div @click="filter('经营状况')">查看详情</div>
        </div>
        <div id="main3" style="width:150px;height:150px" ref="main3"></div>
      </div>
    </div>
    <div class="code2">
      <div id="main4" style="width:100%;height:500px"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      date: this.$store.state.date,
      myChart: "",
      myChart1: "",
      myChart2: "",
      myChart3: "",
      obj: {
        法院公告: "司法风险",
        失信被执行人: "司法风险",
        被执行人: "司法风险",
        开庭公告: "司法风险",
        司法协助: "司法风险",
        送达公告: "司法风险",
        立案信息: "司法风险",
        限制消费令: "司法风险",
        终本案件: "司法风险",
        涉金融黑名单: "司法风险",
        破产重整: "司法风险",
        询价评估: "司法风险",
        大股东变更: "工商风险",
        主要人员变更: "工商风险",
        任职信息: "工商风险",
        企业状态变更: "工商风险",
        企业类型变更: "工商风险",
        法定代表人变更: "工商风险",
        企业名称变更: "工商风险",
        注册资本变更: "工商风险",
        登记机关变更: "工商风险",
        注册地址变更: "工商风险",
        经营范围变更: "工商风险",
        机构成员: "工商风险",
        监控主体: "工商风险",
        司法拍卖: "经营风险",
        清算信息: "经营风险",
        税收违法: "经营风险",
        简易注销: "经营风险",
        行政处罚: "经营风险",
        环保处罚: "经营风险",
        公示催告: "经营风险",
        土地抵押: "经营风险",
        股权质押: "经营风险",
        股权冻结: "经营风险",
        注销备案: "经营风险",
        管理基金: "经营风险",
        监控主体: "经营风险",
        投融资动态: "经营状况",
        招投标: "经营状况",
        债券信息: "经营状况",
        购地信息: "经营状况",
        税务评级: "经营状况",
        抽查检查: "经营状况",
        产品信息: "经营状况",
        进出口信用: "经营状况",
        知识产权: "经营状况",
        土地转让: "经营状况",
        地块公示: "经营状况",
        行政许可: "经营状况",
        电信许可: "经营状况",
        一般纳税人: "经营状况",
        产品召回: "经营状况",
        上榜榜单: "经营状况",
        食品安全: "经营状况",
        客户: "经营状况",
        供应商: "经营状况",
        信用评级: "经营状况",
        公告研报: "经营状况",
        资产交易: "经营状况"
      },
      res2: this.$store.state.res,
      res: "",
      result: { 司法风险: 0, 工商风险: 0, 经营风险: 0, 经营状况: 0 }
    };
  },
  methods: {
    into() {
      this.res = this.res2.filter(
        item => 1666972800 - item.时间戳 <= this.date
      );
      this.res.forEach(item => {
        if (this.result[item["风险维度"]]) {
          this.result[item["风险维度"]]++;
        } else {
          this.result[item["风险维度"]] = 1;
        }
      });
    },
    DateTime(a) {
      this.result = { 司法风险: 0, 工商风险: 0, 经营风险: 0, 经营状况: 0 };
      this.$store.commit("DateChange", a);
      this.date = this.$store.state.date;
      this.into();
      this.show();
      this.show1();
      this.show2();
      this.show3();
    },
    filter(b) {
      this.$router.push({
        name: "details",
        params: {
          result: "风险维度",
          b
        }
      });
    },
    show() {
      let option;
      const gaugeData = [
        {
          value: ((this.result["司法风险"] / this.res.length) * 100).toFixed(2),
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
      };
      option && this.myChart.setOption(option);
    },
    show1() {
      let option;
      const gaugeData = [
        {
          value: ((this.result["工商风险"] / this.res.length) * 100).toFixed(2),
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
      };
      option && this.myChart1.setOption(option);
    },
    show2() {
      let option;
      const gaugeData = [
        {
          value: ((this.result["经营风险"] / this.res.length) * 100).toFixed(2),
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
      };
      option && this.myChart2.setOption(option);
    },
    show3() {
      let option;
      const gaugeData = [
        {
          value: ((this.result["经营状况"] / this.res.length) * 100).toFixed(2),
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
      };
      option && this.myChart3.setOption(option);
    },
    show4() {
      var chartDom = document.getElementById("main4");
      var myChart = echarts.init(chartDom);
      var option;

      var data = [
        { name: "专利信息", value: 271 },
        { name: "主要人员变更", value: 5 },
        { name: "企业类型变更", value: 3 },
        { name: "作品著作权", value: 4 },
        { name: "商标信息", value: 40 },
        { name: "对外投资", value: 9 },
        { name: "开庭公告", value: 50 },
        { name: "招投标", value: 133 },
        { name: "法定代表人变更", value: 4 },
        { name: "法律诉讼", value: 41 },
        { name: "法院公告", value: 1 },
        { name: "注册地址变更", value: 4 },
        { name: "注册资本变更", value: 2 },
        { name: "电信许可", value: 5 },
        { name: "登记机关变更", value: 2 },
        { name: "经营范围变更", value: 5 },
        { name: "股东变更", value: 8 },
        { name: "股权出质", value: 1 },
        { name: "股权变更", value: 1 },
        { name: "融资动态", value: 2 },
        { name: "软件著作权", value: 21 },
        { name: "送达公告", value: 2 }
      ];
      data = data.sort((a, b) => {
        let value1 = a["value"],
          value2 = b["value"];
        return value2 - value1;
      });
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
            formatter: "{name|{b} {d}%} \n",
            minMargin: 1,
            edgeDistance: 1,
            lineHeight: 1,
            rich: {
              name: {
                fontSize: "15",
                color: "auto"
              }
            }
          },
          data: data
        }
      };
      option && myChart.setOption(option);
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
    this.show();
    this.show1();
    this.show2();
    this.show3();
    this.show4();
  },
  created() {
    this.into();
  }
};
</script>

<style scoped lang='less'>
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
  height: 100%;
  padding: 10px;
  margin-top: 30px;
  border-radius: 10px;
  border: 1px solid #eaeaea;
}
</style>
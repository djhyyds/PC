<template>
  <div id="main" style="width:1100px;height:800px"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  methods: {
    show() {
      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom, "dark");
      var option;
      option = {
        backgroundColor: "#eee",
        title: {
          subtext: "股权穿透图测试版",
          left: "center"
        },
        series: [
          {
            type: "sankey",
            left: 50.0,
            top: 20.0,
            right: 150.0,
            bottom: 25.0,
            data: [
              {
                name: "上海歌斐蔚蕴投资中心",
                itemStyle: {
                  color: "#e1e138",
                  borderColor: "#e1e138"
                }
              },
              {
                name: "上海歌斐资产管理有限公司",
                itemStyle: {
                  color: "#3838",
                  borderColor: "#3838"
                }
              },
              {
                name: "天津歌斐资产管理有限公司",
                itemStyle: {
                  color: "#aaa",
                  borderColor: "#aaa"
                }
              },
              {
                name: "芜湖歌斐资产管理有限公司",
                itemStyle: {
                  color: "#D13438",
                  borderColor: "#D13438"
                }
              },
              {
                name: "歌斐资产-九鼎投资",
                itemStyle: {
                  color: "#567C73",
                  borderColor: "#567C73"
                }
              },
              {
                name: "歌斐资产管理有限公司",
                itemStyle: {
                  color: "rgba(128,155,72,255)",
                  borderColor: "rgba(128,155,72,255)"
                }
              },
              {
                name: "诺亚",
                itemStyle: {
                  color: "rgba(106,82,134,255)",
                  borderColor: "rgba(106,82,134,255)"
                }
              },
              {
                name: "昆山歌斐嘉汇股权投资中心",
                itemStyle: {
                  color: "#886CE4",
                  borderColor: "#886CE4"
                }
              },
              {
                name: "苏州夏启卓兴九鼎医药投资中心",
                itemStyle: {
                  color: "#964305",
                  borderColor: "#964305"
                }
              },
              {
                name: "广州鸿琪光学仪器科技有限公司",
                itemStyle: {
                  color: "#485FB5",
                  borderColor: "#485FB5"
                }
              },
              {
                name: "南海天皇制药有限公司",
                itemStyle: {
                  color: "#87a0c7",
                  borderColor: "#87a0c7"
                }
              },
              {
                name: "湖南九典制药股份有限公司",
                itemStyle: {
                  color: "#FFE2C5",
                  borderColor: "#FFE2C5"
                }
              },
              {
                name: "南京优课生物制药科技股份有限公司",
                itemStyle: {
                  color: "#40699D",
                  borderColor: "#40699D"
                }
              },
              {
                name: "浙江车头制药股份有限公司",
                itemStyle: {
                  color: "#7e7eb2",
                  borderColor: "#7e7eb2"
                }
              },
              {
                name: "歌斐资产-磐晟资产",
                itemStyle: {
                  color: "#587C7D",
                  borderColor: "#587C7D"
                }
              },
              {
                name: "歌斐资产-铁狮门",
                itemStyle: {
                  color: "#F07F09",
                  borderColor: "#F07F09"
                }
              },
              {
                name: "歌斐资产-亚商资本",
                itemStyle: {
                  color: "#E3008C",
                  borderColor: "#E3008C"
                }
              },
              {
                name: "共青城磐晖投资管理合伙企业",
                itemStyle: {
                  color: "#4E8542",
                  borderColor: "#4E8542"
                }
              },
              {
                name: "共青城磐旭投资管理合伙企业",
                itemStyle: {
                  color: "#4E8542",
                  borderColor: "#4E8542"
                }
              },
              {
                name: "上海浦海投资合伙企业",
                itemStyle: {
                  color: "#B58B80",
                  borderColor: "#B58B80"
                }
              },
              {
                name: "上海浦源投资合伙企业",
                itemStyle: {
                  color: "#4dc0a6",
                  borderColor: "#4dc0a6"
                }
              },
              {
                name: "上海浦凯投资有限公司",
                itemStyle: {
                  color: "#6A5286",
                  borderColor: "#6A5286"
                }
              },
              {
                name: "深圳市惠安置业有限公司",
                itemStyle: {
                  color: "#F89746",
                  borderColor: "#F89746"
                }
              },
              {
                name: "深圳市汇泽置业有限公司",
                itemStyle: {
                  color: "#744DA9",
                  borderColor: "#744DA9"
                }
              },
              {
                name: "上海歌斐惟勤股权投资中心",
                itemStyle: {
                  color: "#7B7",
                  borderColor: "#7B7"
                }
              },
              {
                name: "苏州亚商创业投资中心",
                itemStyle: {
                  color: "#F0C42E",
                  borderColor: "#F0C42E"
                }
              },
              {
                name: "北京基恒通信股份有限公司",
                itemStyle: {
                  color: "#881798",
                  borderColor: "#881798"
                }
              },
              {
                name: "北京丽家丽婴婴童用品股份有限公司",
                itemStyle: {
                  color: "#efa835",
                  borderColor: "#efa835"
                }
              },
              {
                name: "北京维格互动科技股份有限公司",
                itemStyle: {
                  color: "#D8B25C",
                  borderColor: "#D8B25C"
                }
              },
              {
                name: "成都风际网络科技股份有限公司",
                itemStyle: {
                  color: "#FEB80A",
                  borderColor: "#FEB80A"
                }
              },
              {
                name: "成都余香科技股份有限公司",
                itemStyle: {
                  color: "#009DD9",
                  borderColor: "#009DD9"
                }
              },
              {
                name: "东莞市中泰模具股份有限公司",
                itemStyle: {
                  color: "#F07F09",
                  borderColor: "#F07F09"
                }
              },
              {
                name: "宁波东力股份有限公司",
                itemStyle: {
                  color: "#D34817",
                  borderColor: "#D34817"
                }
              },
              {
                name: "深圳华丽新材料股份有限公司",
                itemStyle: {
                  color: "#FFA836",
                  borderColor: "#FFA836"
                }
              },
              {
                name: "深圳安健科技股份有限公司",
                itemStyle: {
                  color: "rgba(159,65,62,255)",
                  borderColor: "rgba(159,65,62,255)"
                }
              },
              {
                name: "深圳市华润通光电股份有限公司",
                itemStyle: {
                  color: "#FF6551",
                  borderColor: "#FF6551"
                }
              },
              {
                name: "深圳市慧动创想科技有限公司",
                itemStyle: {
                  color: "#72A376",
                  borderColor: "#72A376"
                }
              },
              {
                name: "许昌恒源发制品股份有限公司",
                itemStyle: {
                  color: "#69797E",
                  borderColor: "#69797E"
                }
              },
              {
                name: "烟台兴洋水产食品有限公司",
                itemStyle: {
                  color: "#e65e20",
                  borderColor: "#e65e20"
                }
              }
            ],
            links: [
              {
                source: "歌斐资产-九鼎投资",
                target: "歌斐资产管理有限公司",
                value: 378
              },
              {
                source: "诺亚",
                target: "歌斐资产-九鼎投资",
                value: 378
              },
              {
                source: "上海歌斐资产管理有限公司",
                target: "上海歌斐蔚蕴投资中心",
                value: 357
              },
              {
                source: "歌斐资产管理有限公司",
                target: "上海歌斐蔚蕴投资中心",
                value: 394
              },
              {
                source: "歌斐资产管理有限公司",
                target: "上海歌斐资产管理有限公司",
                value: 394
              },
              {
                source: "歌斐资产管理有限公司",
                target: "天津歌斐资产管理有限公司",
                value: 394
              },
              {
                source: "歌斐资产管理有限公司",
                target: "芜湖歌斐资产管理有限公司",
                value: 394
              },
              {
                source: "上海歌斐蔚蕴投资中心",
                target: "昆山歌斐嘉汇股权投资中心",
                value: 394
              },
              {
                source: "天津歌斐资产管理有限公司",
                target: "昆山歌斐嘉汇股权投资中心",
                value: 394
              },
              {
                source: "芜湖歌斐资产管理有限公司",
                target: "昆山歌斐嘉汇股权投资中心",
                value: 394
              },
              {
                source: "昆山歌斐嘉汇股权投资中心",
                target: "苏州夏启卓兴九鼎医药投资中心",
                value: 378
              },
              {
                source: "苏州夏启卓兴九鼎医药投资中心",
                target: "广州鸿琪光学仪器科技有限公司",
                value: 378
              },
              {
                source: "苏州夏启卓兴九鼎医药投资中心",
                target: "湖南九典制药股份有限公司",
                value: 378
              },
              {
                source: "苏州夏启卓兴九鼎医药投资中心",
                target: "南海天皇制药有限公司",
                value: 378
              },
              {
                source: "苏州夏启卓兴九鼎医药投资中心",
                target: "南京优课生物制药科技股份有限公司",
                value: 378
              },
              {
                source: "苏州夏启卓兴九鼎医药投资中心",
                target: "浙江车头制药股份有限公司",
                value: 378
              },
              {
                source: "诺亚",
                target: "歌斐资产-磐晟资产",
                value: 378
              },
              {
                source: "诺亚",
                target: "歌斐资产-铁狮门",
                value: 378
              },
              {
                source: "诺亚",
                target: "歌斐资产-亚商资本",
                value: 378
              },
              {
                source: "歌斐资产-磐晟资产",
                target: "歌斐资产管理有限公司",
                value: 378
              },
              {
                source: "歌斐资产-铁狮门",
                target: "歌斐资产管理有限公司",
                value: 378
              },
              {
                source: "歌斐资产-亚商资本",
                target: "歌斐资产管理有限公司",
                value: 378
              },
              {
                source: "芜湖歌斐资产管理有限公司",
                target: "共青城磐晖投资管理合伙企业",
                value: 378
              },
              {
                source: "共青城磐晖投资管理合伙企业",
                target: "共青城磐旭投资管理合伙企业",
                value: 378
              },
              {
                source: "歌斐资产管理有限公司",
                target: "上海浦海投资合伙企业",
                value: 378
              },
              {
                source: "上海浦海投资合伙企业",
                target: "上海浦源投资合伙企业",
                value: 378
              },
              {
                source: "上海浦源投资合伙企业",
                target: "上海浦凯投资有限公司",
                value: 378
              },
              {
                source: "上海浦源投资合伙企业",
                target: "深圳市汇泽置业有限公司",
                value: 378
              },
              {
                source: "上海浦源投资合伙企业",
                target: "深圳市惠安置业有限公司",
                value: 378
              },
              {
                source: "上海歌斐资产管理有限公司",
                target: "上海歌斐惟勤股权投资中心",
                value: 378
              },
              {
                source: "上海歌斐惟勤股权投资中心",
                target: "苏州亚商创业投资中心",
                value: 378
              },
              {
                source: "芜湖歌斐资产管理有限公司",
                target: "上海歌斐惟勤股权投资中心",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "北京基恒通信股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "北京丽家丽婴婴童用品股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "北京维格互动科技股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "成都余香科技股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "成都风际网络科技股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "东莞市中泰模具股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "宁波东力股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "深圳华丽新材料股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "深圳安健科技股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "深圳市华润通光电股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "深圳市慧动创想科技有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "许昌恒源发制品股份有限公司",
                value: 378
              },
              {
                source: "苏州亚商创业投资中心",
                target: "烟台兴洋水产食品有限公司",
                value: 378
              }
            ],
            lineStyle: {
              color: "source",
              curveness: 0.4
            },
            itemStyle: {
              color: "#1f77b4",
              borderColor: "#1f77b4"
            },
            label: {
              color: "rgba(0,0,0,1)",
              fontFamily: "Arial",
              fontSize: 12
            }
          }
        ],
        tooltip: {
          trigger: "item"
        }
      };

      option && myChart.setOption(option);
    }
  },
  mounted() {
    this.show();
  }
};
</script>

<style>
</style>
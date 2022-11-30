<template>
  <div id="main" style="width: 90vw; height: 100vh"></div>
</template>

<script>
import * as echarts from "echarts"
import downList from '../../public/jsonData/pass_20221124/s_pass_down.json'
export default {
  data () {
    return {
      down: [],
      downList,
      Color: ['#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
      ]
    }
  },
  methods: {
    show () {
      var chartDom = document.getElementById("main")
      var myChart = echarts.init(chartDom, "dark")
      var option
      let open = true
      let sum = 10
      var data = {
        nodes: this.down,
        links: this.downList
      }
      const links = data.links
      const nodes = data.nodes

      function tt (links, noods) {
        links.forEach((item) => {
          links.forEach((item2) => {
            if (item.target === item2.source) {
              if (item.next) {
                item.next.push(item2)
              } else {
                item.next = [item2]
              }
            }
          })
          links.forEach((item2) => {
            if (item.source === item2.target) {
              if (item.prev) {
                item.prev.push(item2)
              } else {
                item.prev = [item2]
              }
            }
          })
          let ary = []
          for (let i = 0; i < noods.length && ary.length < 2; i++) {
            if (noods[i].name === item.target || noods[i].name === item.source)
              ary.push(nodes[i])
          }

          item.node = ary
        })
      }
      function deep (obj, i = [0, true]) {
        const [num, bool] = i

        if (obj.depth) {
          return [obj.depth, false]
        }

        if (obj.prev) {
          const [num2, bool2] = deep(obj.prev[0], [num + 1, bool])
          if (bool2) {
            obj.depth = num2 - num
            return [num2, true]
          } else {
            obj.depth = num2 + 1
            return [obj.depth, false]
          }
        }

        obj.depth = 1
        return [num + obj.depth, true]
      }

      tt(links, nodes)

      links.forEach((item) => {
        deep(item)
      })
      const names = []
      const newLinkkkk = []
      const nodessss = []
      links.forEach((item) => {
        if (item.additions && !names.includes(item.source)) {
          const link = {
            source: item.source,
            target: ` ${item.source} `,
            value: item.additions.paths,
            lineStyle: {
              color: '#fbdcd9',
              opacity: 0.5
            }
          }
          const node = {
            name: ` ${item.source} `,
            depth: item.depth,
            label: {
              show: false
            },
            itemStyle: {
              color: '#fbdcd9',
              opacity: 0.5
            }
          }
          newLinkkkk.push(link)
          nodessss.push(node)
          names.push(item.source)
          item.copy = link
          item.node.copy = node
        }
      })


      const ll = JSON.parse(JSON.stringify(newLinkkkk))
      const no = JSON.parse(JSON.stringify(nodessss))

      let opacity = false

      function limkMap (links) {
        return links.map((item) => {
          const obj = {
            source: item.source,
            target: item.target,
            value: item.value,
            additions: item.additions
          }
          if (!item.bool && opacity) {

            obj.lineStyle = {
              opacity: 0
            }

          }

          if (item.copy) {


            if (!item.bool && opacity) {

              item.copy.lineStyle.opacity = 0
              item.node.copy.itemStyle.opacity = 0

            } else {
              item.copy.lineStyle.opacity = 0.5
              item.node.copy.itemStyle.opacity = 1
            }

          }


          delete item.bool
          return obj
        })
      }
      function nodeMap () {
        return nodes.map((item) => {

          const obj = {
            ...item
          }
          if (!item.bool && opacity) {
            obj.itemStyle = {
              opacity: 0
            }
            obj.label = {
              show: false
            }
          }

          delete item.bool
          return obj
        })
      }
      const newLinks = limkMap(links)

      const newNoods = nodeMap()



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
            data: [...newNoods, ...nodessss],
            links: [...newLinks, ...newLinkkkk],
            lineStyle: {
              color: "source",
              curveness: 0.4
            },
            // emphasis: {
            //   focus: "adjacency"
            // },
            itemStyle: {
              color: "#1f77b4",
              borderColor: "#1f77b4"
            },
            label: {
              // align: "center",
              color: "rgba(0,0,0,1)",
              fontFamily: "Arial",
              fontSize: 12
            }
          }
        ],
        tooltip: {
          trigger: "item",
          padding: 15,
          renderMode: 'html',
          formatter (params) {
            console.log(params)
            //自定义模板
            let res
            if (params.dataType == 'node') {
              res = `<div>资产构成</div>
                        <span style="display:inline-block;margin-right:4px;
						border-radius:10px;width:10px;height:10px;
						background-color:#91cc75;"></span>
                        <span style="margin-right:10%;">${params.name} 投资金额:1770万 占比:70%</span>  
                        <br/>     
                         <span style="display:inline-block;margin-right:4px;
						border-radius:10px;width:10px;height:10px;
						background-color:red;"></span>
                        <span style="margin-right:10%;">广东横琴海联科技投资有限公司 投资金额:177万 占比:20%</span>  
                        <br/>   
                         <span style="display:inline-block;margin-right:4px;
						border-radius:10px;width:10px;height:10px;
						background-color:red;"></span>
                        <span style="margin-right:10%;">柳州市海联金汇汽车零部件有限公司 投资金额:77万 占比:10%</span>  
                        <br/>    
                        `
            }
            else {
              let value = +params.value
              value = value.toFixed(2)
              res = `${params.name}        投资占比:${value}% `
            }

            return res
            //返回自定义内容
          }
        }
      }
      option && myChart.setOption(option)
      myChart.on('click', (e) => {
        if (open) {
          open = !open
          const name = e.data.name || e.data.target
          opacity = true
          let obj = links.find((item) => item.source === name)

          // console.log(obj);

          if (!obj) {
            const prev = links.filter((item) => item.target === name)
            obj = {
              prev
            }
          }

          if (!obj.prev) {
            const prev = links.filter((item) => item.source === name)
            obj = {
              root: true,
              prev
            }
          }

          prev(obj.prev)
          next(obj.prev)

          // console.log(links);

          // console.log(links, nodes, 'qqq', obj);
          const newLiks2 = limkMap(links, 1)

          // console.log(newLinkkkk, newLiks2, 'qqq');
          const newNood222s = nodeMap()
          const options = myChart.getOption()
          options.series[0].data = [...newNood222s, ...nodessss]
          options.series[0].links = [...newLinkkkk, ...newLiks2]
          myChart.setOption(options)

        } else {
          open = !open
          const options = myChart.getOption()
          opacity = false
          options.series[0].data = [...newNoods, ...no]
          options.series[0].links = [...newLinks, ...ll]
          myChart.setOption(options)
        }
      })

      function prev (ary) {
        ary &&
          ary.forEach((item) => {
            item.bool = true
            item.node.forEach((item) => {
              item.bool = true
            })
            prev(item.prev)
          })
      }

      function next (ary) {
        ary &&
          ary.forEach((item) => {
            item.bool = true
            item.node.forEach((item) => {
              item.bool = true
            })
            next(item.next)
          })
      }
    }
  },
  mounted () {
    this.show()
  },
  created () {
    this.downList.forEach(item => {
      let obj = {}
      obj.itemStyle = {}
      obj.itemStyle.color = this.Color[item['K02_穿透层级']]
      obj.itemStyle.borderColor = this.Color[item['K02_穿透层级']]
      obj.name = item.source
      this.down.push(obj)
    })
    let formatArr = () => {
      let map = new Map()
      for (let item of this.down) {
        if (!map.has(item.name)) {
          map.set(item.name, item)
        }
      }
      return [...map.values()]
    }

    this.down = formatArr()


  }
};
</script>

<style>
</style>
<!--统计图主体-->
<template>
  <div class="charts" style="min-height: 600px; overflow: hidden">
    <div class="open" ref="tooltop">
      <div class="title">
        <h2>{{ obj.eventName }}</h2>
        <h2>会话数</h2>
        <h2>比例</h2>
      </div>
      <ul>
        <li class="ct">
          <div>
            <span class="round"></span>
            留存
          </div>
          <div>{{ obj.session.paths }}</div>
          <div>{{ parseFloat(obj.session.ratio).toFixed(2) }}%</div>
        </li>
        <li class="ct" v-if="isStart">
          <div>
            <span class="round red"></span>
            流失
          </div>
          <div>{{ obj.additions.paths }}</div>
          <div>{{ parseFloat(obj.additions.ratio).toFixed(2) }}%</div>
        </li>
      </ul>
    </div>
    <div class="open line" ref="line">
      <div class="title">
        <h2>{{ lineInfo.start }} 到 {{ lineInfo.end }}</h2>
        <h2>会话数</h2>
        <h2>比例</h2>
      </div>
      <ul>
        <li class="ct">
          <div>
            <span class="round"></span>
            留存
          </div>
          <div>{{ lineInfo.value }}</div>
          <div>{{ parseFloat(lineInfo.ratio).toFixed(2) }} %</div>
        </li>
      </ul>
    </div>
    <div class="open add" ref="add">
      <div class="title">
        <h2>{{ addInfo.eventName }}</h2>
        <h2>会话数</h2>
        <h2>比例</h2>
      </div>
      <ul>
        <li class="ct">
          <div>
            <span
              class="round"
              :style="{ backgroundColor: isStart ? '#FD6865' : '#36B236' }"
            ></span>
            {{ isStart ? "流失" : "流入" }}
          </div>
          <div>{{ addInfo.paths }}</div>
          <div>{{ parseFloat(addInfo.ratio).toFixed(2) }}%</div>
        </li>
      </ul>
    </div>
    <div class="box" ref="clickTools">
      <div class="but" @click="handleLight">高亮节点路径</div>
      <div class="but" @click="details">查看节点详情</div>
      <div class="but" @click="cancel">取消</div>
      <span class="a"></span>
    </div>
    <symbol id="icon-event-direction" viewBox="0 0 1024 1024"
      ><path
        d="M709.4784 281.6V149.9648L972.8 413.184l-263.3216 263.3216v-131.6352h-91.7504l-171.52-168.704V281.6h263.2704zM314.5216 479.0784V347.4432l263.3216 263.3216-263.3216 263.2704V742.4H51.2V479.0784h263.3216z"
        viewBox="0 0 1024 1024"
      ></path
    ></symbol>
    <!-- todo -->
    <div style="overflow: auto" ref="warp">
      <svg
        :width="svgWidth"
        :height="svgHeight < 600 ? 600 : svgHeight"
        @click="clear"
        class="sssvg"
        id="sssvg"
        style="background: #fff; padding-top: 10px"
      >
        <g
          v-for="(item, index) in list"
          :key="item.length + '_' + index"
          class="template"
          transform="translate(0, 4)"
        >
          <g
            v-for="(item2, index2) in item"
            :key="item2.name"
            :transform="`translate(${index * 420}, ${index2 * 80})`"
            style="cursor: pointer"
            class="rect"
            :class="[
              'css-' + item2.depch + '-' + item2.index,
              'css-bar-' + item2.depch + '-' + item2.index,
            ]"
          >
            <rect
              v-if="
                index === (isStart ? 0 : list.length - 1) &&
                index2 === 0 &&
                item2.additions &&
                item.length === 1
              "
              width="18"
              :height="
                500 -
                (isStart ? item2.children.length * 8 : item2.parent.length * 8)
              "
              stroke-width="1"
              :fill="isStart ? '#FD6865' : '#36B236'"
              :stroke="isStart ? '#FD6865' : '#36B236'"
              stroke-opacity="0.20"
              fill-opacity="0.25"
              :x="isStart ? 180 : -18"
              :y="
                isStart
                  ? item2.children
                    ? item2.children.length * 8
                    : 0
                  : item2.parent
                  ? item2.parent.length * 8
                  : 0
              "
              @mouseover="addMouseover($event, item2)"
              @mousemove="addMousemove"
              @mouseout="addMouseout"
            />
            <rect
              width="18"
              height="8"
              stroke-width="1"
              :fill="isStart ? '#FD6865' : '#36B236'"
              :stroke="isStart ? '#FD6865' : '#36B236'"
              stroke-opacity="0.20"
              fill-opacity="0.25"
              :x="isStart ? 180 : -18"
              :y="item2.children ? item2.children.length * 0.9 : 0"
              v-else-if="item2.additions"
              @mouseover="addMouseover($event, item2)"
              @mousemove="addMousemove"
              @mouseout="addMouseout"
            />
            <g
              class="gg"
              @mouseover="mouseover($event, item2)"
              @mouseout="mouseout"
              @mousemove="mousemove"
              @click="handleClick($event, item2, item)"
            >
              <rect
                width="180"
                class="bar"
                height="500"
                stroke-width="1"
                :stroke="'#' + item2.color"
                :fill="'#' + item2.color"
                fill-opacity="0.05"
                rx="2"
                :data-qwe="index2"
                v-if="
                  index === (isStart ? 0 : list.length - 1) &&
                  index2 === 0 &&
                  item.length === 1
                "
              />

              <rect
                v-else
                width="180"
                class="bar"
                height="8"
                stroke-width="1"
                :stroke="'#' + item2.color"
                :fill="'#' + item2.color"
                fill-opacity="0.05"
                rx="2"
              />

              <foreignObject y="4" width="180" height="80">
                <div
                  class="user-beh_index_overflowText_19klOf"
                  style="text-align: center; line-height: 20px"
                  @mouseover="mouseover($event, item2)"
                >
                  <div style="pointer-events: none">
                    <p
                      style="
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        text-align: center;
                        margin-block-end: 0;
                        margin-block-start: 10px;
                      "
                    >
                      <div>{{ item2.eventName }}</div>
                      <div>
                        {{ item2.name }}
                      </div>
                      <div>{{ item2.value }}</div>
                    </p>

                    <p style="margin-block-end: 0; margin-block-start: 0"></p>
                  </div>
                </div>
              </foreignObject>
              <foreignObject
                y="400"
                width="180"
                height="80"
                style="text-align: center"
                v-if="
                  index === (isStart ? 0 : list.length - 1) &&
                  index2 === 0 &&
                  item2.additions &&
                  item.length === 1
                "
              >
                <text width="180">{{ isStart ? "起始事件" : "结束事件" }}</text>
                <svg
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                  focusable="false"
                  class=""
                  ><use xlink:href="#icon-event-direction"></use
                ></svg>
              </foreignObject>
            </g>
          </g>
        </g>

        <g
          v-for="(item, index) in list"
          :key="index"
          class="template"
          transform="translate(0, 4)"
        >
          <g :key="item2.name" v-for="(item2, index2) in item" class="template">
            <g
              v-if="item2.children && item2.children.length > 0"
              class="template"
            >
              <g
                v-for="(item3, i333) in item2.children"
                :key="i333"
                :transform="
                  index === 0 && item.length === 1
                    ? `translate(${index * 420}, ${
                        item2.index * 80 + i333 * 8
                      })`
                    : `translate(${index * 420}, ${
                        item2.index * 80 + i333 * 0.5
                      })`
                "
                :class="[
                  'css-' + item2.depch + '-' + item2.index,
                  'css-' + item2.depch + '-' + item2.index + '-' + i333,
                ]"
              >
                <path
                  v-if="
                    index === (isStart ? 0 : list.length - 2) &&
                    (isStart
                      ? list[0].length
                      : list[list.length - 1].length) === 1
                  "
                  @mousemove="pathMousemove"
                  @mouseover="pathMouseover($event, item2, i333)"
                  @mouseout="pathMouseout"
                  style="cursor: pointer"
                  :d="`M180,0 L180,0 C280,0 280,${
                    80 * (item3.index - item2.index) -
                    (isStart ? 8 * i333 : -8 * index2) /*高度*/
                  } ${420 * (item3.depch - item2.depch)},${
                    80 * (item3.index - item2.index) -
                    (isStart ? 8 * i333 : -8 * index2) /*高度*/
                  } L${420 * (item3.depch - item2.depch)},${
                    80 * (item3.index - item2.index) -
                    (isStart ? 8 * i333 : -8 * index2) /*高度*/
                  } L${420 * (item3.depch - item2.depch)},${
                    80 * (item3.index - item2.index) -
                    (isStart ? 8 * i333 : -8 * index2) /*高度*/ +
                    8 /* 线粗度 */
                  } L${420 * (item3.depch - item2.depch)},${
                    80 * (item3.index - item2.index) -
                    (isStart ? 8 * i333 : -8 * index2) /*高度*/ +
                    8 /* 线粗度 */
                  } C280,${
                    80 * (item3.index - item2.index) -
                    (isStart ? 8 * i333 : -8 * index2) /*高度*/ +
                    8 /* 线粗度 */
                  } 280,${8 /* 线粗度 */} 180,${8 /* 线粗度 */} L180,${
                    8 /* 线粗度 */
                  } L180,${8}Z`"
                  :fill="'#' + item2.color"
                  fill-opacity="0.25"
                  :stroke="'#' + item2.color"
                  stroke-opacity="0.20"
                ></path>
                <path
                  v-else
                  @mousemove="pathMousemove"
                  @mouseover="pathMouseover($event, item2, i333)"
                  @mouseout="pathMouseout"
                  style="cursor: pointer"
                  :d="`M180,0 L180,0 C280,0 280,${
                    (80 - i333 * 0.04) * (item3.index - item2.index) /*高度*/
                  } ${420 * (item3.depch - item2.depch)},${
                    (80 - i333 * 0.04) * (item3.index - item2.index) /*高度*/
                  } L${420 * (item3.depch - item2.depch)},${
                    (80 - i333 * 0.04) * (item3.index - item2.index) /*高度*/
                  } L${420 * (item3.depch - item2.depch)},${
                    (80 - i333 * 0.04) * (item3.index - item2.index) /*高度*/ +
                    2.4 /* 线粗度 */
                  } L${420 * (item3.depch - item2.depch)},${
                    (80 - i333 * 0.04) * (item3.index - item2.index) /*高度*/ +
                    2.4 /* 线粗度 */
                  } C280,${
                    (80 - i333 * 0.04) * (item3.index - item2.index) /*高度*/ +
                    2.4 /* 线粗度 */
                  } 280,${2.4 /* 线粗度 */} 180,${2.4 /* 线粗度 */} L180,${
                    2.4 /* 线粗度 */
                  } L180,${2.4}Z`"
                  :fill="'#' + item2.color"
                  fill-opacity="0.25"
                  :stroke="'#' + item2.color"
                  stroke-opacity="0.20"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'chart-svg',
  props: {},
  data () {
    return {
      svgWidth: 0,
      svgHeight: 0,
      loading: false,
      total: 0,
      list: [],
      isSelect: true,
      lineInfo: {},
      isNoData: false,
      bool: true,
      tooltop: null,
      obj: {
        session: {},
        additions: {},
      },
      line: null,
      addInfo: {
        session: {},
        additions: {},
      },
      add: null,
      cssList: [],
      clickElement: null,
      colorIndex: 0,
      style: document.createElement('style'),
      style2: document.createElement('style'),
      colorList: [
        '63cbba',
        'f5c377',
        '707ddd',
        'f1a177',
        '91c58b',
        'ac81e5',
        '5989f8',
        'de81b1',
        '9e7f7a',
        'a9c580',
        'de8a80',
        '82cfe5',
      ],
      clickTools: null,
      filter: true
    }
  },
  //
  computed: {

    isStart () {
      return true
    }
  },

  methods: {

    addMouseover (event, data) {
      this.addInfo = {
        eventName: data.eventName,
        paths: data.additions.paths,
        ratio: data.additions.ratio,
      }
      if (this.bool) {
        this.add.style.display = 'block'
      }
    },
    handleClick (ev, data, d3) {
      this.clickElement = data
      console.log(ev)
      this.clickTools.style.transform = `translate(${ev.layerX +
        40}px, ${ev.layerY + 40}px)`

      // this.clickTools.style.left = ev.layerX + 'px'
      // this.clickTools.style.top = ev.layerY + 'px'
      this.clickTools.style.display = 'grid'
      this.bool = false
    },

    handleLight () {
      if (!this.clickElement) return

      this.total++
      this.nextLight(this.clickElement)
      this.prevLight(this.clickElement)
      const ll = Array.from(new Set(this.cssList))

      this.style2.innerHTML = `
	      .sssvg * {
	        opacity: .5;
	      }

        .sssvg .template {
          opacity: 1;
        }
	    `
      ll.forEach(item => {
        this.style2.innerHTML += `
	        .css-${item} *,
	        .css-${item} {
	          opacity: 1;
	        }
	      `
      })
      document.head.append(this.style2)
      this.clickTools.style.display = 'none'
      this.bool = true

    },
    mousemove (ev) {
      this.tooltop.style.transform = `translate(${ev.layerX +
        40}px, ${ev.layerY + 40}px)`
    },
    cancel () {
      this.bool = true
      this.clickTools.style.display = 'none'
    },
    clear (ev) {
      console.log(ev.target)

      if (ev.target instanceof SVGSVGElement) {
        // this.bool = true
        this.style2.innerHTML = ``
        document.head.append(this.style2)
        this.cssList = []
        this.bool = true
        this.clickTools.style.display = 'none'
      }
    },

    details () {
      this.bool = true
      this.clickTools.style.display = 'none'
      this.$emit('openModel', this.clickElement)
    },

    pathMousemove (ev) {
      this.line.style.transform = `translate(${ev.layerX +
        40}px, ${ev.layerY + 40}px)`
    },

    pathMouseover (ev, item, index) {
      const tar = item.children[index]
      this.lineInfo = {
        start: item.eventName,
        end: tar.eventName,
        value: tar.value2,
        ratio: tar.ratio2,
      }
      ev.target.style.fillOpacity = 1
      if (this.bool) {
        this.line.style.display = 'block'
      }
    },
    pathMouseout (ev) {
      this.line.style.display = 'none'
      ev.target.style.fillOpacity = 0.25
    },
    addMousemove (ev) {
      this.add.style.transform = `translate(${ev.layerX + 40}px, ${ev.layerY -
        40}px)`
    },

    addMouseout (ev) {
      this.add.style.display = 'none'
    },

    mouseover (event, data) {
      if (data === null) {
        console.log(data, 'nulllllllllllllll')
      }
      this.obj = data
      event.target.parentElement.style.color = '#' + data.color

      this.style.innerHTML = /* css */ `
	      .css-${data.depch}-${data.index} path {
	        fill-opacity: 1!important;
	      }
	    `
      document.head.append(this.style)
      if (this.bool) {
        this.tooltop.style.display = 'block'
      }
    },

    mouseout (event) {
      this.style.innerHTML = `

	    `
      document.head.append(this.style)
      // document.head.remove(style)
      this.tooltop.style.display = 'none'
      event.target.parentElement.style.color = ''
    },

    prevLight (data) {
      if (data.parent && data.parent.length > 0) {
        data.parent.forEach(item => {
          if (item['light' + this.total]) return
          item['light' + this.total] = true
          const index = item.children.findIndex(item => item.to === data.name)
          this.cssList.push(item.depch + '-' + item.index + '-' + index)
          this.cssList.push('bar-' + item.depch + '-' + item.index)
          // light(item)
          this.prevLight(item)
        })
      }
    },
    nextLight (data) {
      if (data['light' + this.total]) return
      data['light' + this.total] = true
      this.cssList.push(data.depch + '-' + data.index)
      if (data.children && data.children.length > 0) {
        data.children.forEach(item => {
          this.nextLight(item)
        })
      }
    },

    render (_nodes = [
      {
        "groups": [],
        "column": 0,
        "name": "node-0",
        "eventName": "App 浏览页面",
        "border": 1,
        "paths": 1165,
        "session": {
          "paths": 926,
          "ratio": "79.4800%"
        },
        "additions": {
          "paths": 239,
          "ratio": "20.5200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-1",
        "eventName": "App 启动",
        "border": 2,
        "paths": 198,
        "session": {
          "paths": 12,
          "ratio": "6.0600%"
        },
        "additions": {
          "paths": 186,
          "ratio": "93.9400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-2",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 29,
        "session": {
          "paths": 13,
          "ratio": "44.8300%"
        },
        "additions": {
          "paths": 16,
          "ratio": "55.1700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-3",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 1080,
        "session": {
          "paths": 453,
          "ratio": "41.9400%"
        },
        "additions": {
          "paths": 627,
          "ratio": "58.0600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-4",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 16,
        "session": {
          "paths": 5,
          "ratio": "31.2500%"
        },
        "additions": {
          "paths": 11,
          "ratio": "68.7500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-5",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 143,
        "session": {
          "paths": 57,
          "ratio": "39.8600%"
        },
        "additions": {
          "paths": 86,
          "ratio": "60.1400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-6",
        "eventName": "App 启动",
        "border": 2,
        "paths": 11,
        "session": {
          "paths": 4,
          "ratio": "36.3600%"
        },
        "additions": {
          "paths": 7,
          "ratio": "63.6400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-7",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 33,
        "session": {
          "paths": 14,
          "ratio": "42.4200%"
        },
        "additions": {
          "paths": 19,
          "ratio": "57.5800%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-8",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 598,
        "session": {
          "paths": 246,
          "ratio": "41.1400%"
        },
        "additions": {
          "paths": 352,
          "ratio": "58.8600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-9",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 11,
        "session": {
          "paths": 2,
          "ratio": "18.1800%"
        },
        "additions": {
          "paths": 9,
          "ratio": "81.8200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-10",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 240,
        "session": {
          "paths": 87,
          "ratio": "36.2500%"
        },
        "additions": {
          "paths": 153,
          "ratio": "63.7500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-11",
        "eventName": "App 启动",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 3,
          "ratio": "37.5000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "62.5000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-12",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 2,
          "ratio": "33.3300%"
        },
        "additions": {
          "paths": 4,
          "ratio": "66.6700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-13",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 357,
        "session": {
          "paths": 149,
          "ratio": "41.7400%"
        },
        "additions": {
          "paths": 208,
          "ratio": "58.2600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-14",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 28,
        "session": {
          "paths": 12,
          "ratio": "42.8600%"
        },
        "additions": {
          "paths": 16,
          "ratio": "57.1400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-15",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 189,
        "session": {
          "paths": 69,
          "ratio": "36.5100%"
        },
        "additions": {
          "paths": 120,
          "ratio": "63.4900%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-16",
        "eventName": "App 启动",
        "border": 2,
        "paths": 5,
        "session": {
          "paths": 2,
          "ratio": "40.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "60.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-17",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 6,
          "ratio": "42.8600%"
        },
        "additions": {
          "paths": 8,
          "ratio": "57.1400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-18",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 268,
        "session": {
          "paths": 116,
          "ratio": "43.2800%"
        },
        "additions": {
          "paths": 152,
          "ratio": "56.7200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-19",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 19,
        "session": {
          "paths": 9,
          "ratio": "47.3700%"
        },
        "additions": {
          "paths": 10,
          "ratio": "52.6300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-20",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 99,
        "session": {
          "paths": 37,
          "ratio": "37.3700%"
        },
        "additions": {
          "paths": 62,
          "ratio": "62.6300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-21",
        "eventName": "App 启动",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-22",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 9,
        "session": {
          "paths": 4,
          "ratio": "44.4400%"
        },
        "additions": {
          "paths": 5,
          "ratio": "55.5600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-23",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 196,
        "session": {
          "paths": 86,
          "ratio": "43.8800%"
        },
        "additions": {
          "paths": 110,
          "ratio": "56.1200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-24",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 11,
        "session": {
          "paths": 4,
          "ratio": "36.3600%"
        },
        "additions": {
          "paths": 7,
          "ratio": "63.6400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-25",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 80,
        "session": {
          "paths": 35,
          "ratio": "43.7500%"
        },
        "additions": {
          "paths": 45,
          "ratio": "56.2500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-26",
        "eventName": "App 启动",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-27",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 5,
        "session": {
          "paths": 2,
          "ratio": "40.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "60.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-28",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 174,
        "session": {
          "paths": 79,
          "ratio": "45.4000%"
        },
        "additions": {
          "paths": 95,
          "ratio": "54.6000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-29",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-30",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 51,
        "session": {
          "paths": 21,
          "ratio": "41.1800%"
        },
        "additions": {
          "paths": 30,
          "ratio": "58.8200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-31",
        "eventName": "App 启动",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-32",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-33",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 122,
        "session": {
          "paths": 53,
          "ratio": "43.4400%"
        },
        "additions": {
          "paths": 69,
          "ratio": "56.5600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-34",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 5,
        "session": {
          "paths": 2,
          "ratio": "40.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "60.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-35",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 53,
        "session": {
          "paths": 23,
          "ratio": "43.4000%"
        },
        "additions": {
          "paths": 30,
          "ratio": "56.6000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-36",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-37",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 86,
        "session": {
          "paths": 37,
          "ratio": "43.0200%"
        },
        "additions": {
          "paths": 49,
          "ratio": "56.9800%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-38",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-39",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 53,
        "session": {
          "paths": 24,
          "ratio": "45.2800%"
        },
        "additions": {
          "paths": 29,
          "ratio": "54.7200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-40",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-41",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-42",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 79,
        "session": {
          "paths": 35,
          "ratio": "44.3000%"
        },
        "additions": {
          "paths": 44,
          "ratio": "55.7000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-43",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 3,
          "ratio": "37.5000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "62.5000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-44",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 24,
        "session": {
          "paths": 10,
          "ratio": "41.6700%"
        },
        "additions": {
          "paths": 14,
          "ratio": "58.3300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-45",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-46",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 52,
        "session": {
          "paths": 23,
          "ratio": "44.2300%"
        },
        "additions": {
          "paths": 29,
          "ratio": "55.7700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-47",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-48",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 30,
        "session": {
          "paths": 14,
          "ratio": "46.6700%"
        },
        "additions": {
          "paths": 16,
          "ratio": "53.3300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-49",
        "eventName": "App 启动",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-50",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 48,
        "session": {
          "paths": 21,
          "ratio": "43.7500%"
        },
        "additions": {
          "paths": 27,
          "ratio": "56.2500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-51",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-52",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 23,
        "session": {
          "paths": 11,
          "ratio": "47.8300%"
        },
        "additions": {
          "paths": 12,
          "ratio": "52.1700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-53",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 41,
        "session": {
          "paths": 20,
          "ratio": "48.7800%"
        },
        "additions": {
          "paths": 21,
          "ratio": "51.2200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-54",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-55",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 21,
        "session": {
          "paths": 10,
          "ratio": "47.6200%"
        },
        "additions": {
          "paths": 11,
          "ratio": "52.3800%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-56",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-57",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 37,
        "session": {
          "paths": 18,
          "ratio": "48.6500%"
        },
        "additions": {
          "paths": 19,
          "ratio": "51.3500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-58",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 22,
        "session": {
          "paths": 10,
          "ratio": "45.4500%"
        },
        "additions": {
          "paths": 12,
          "ratio": "54.5500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-59",
        "eventName": "App 启动",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-60",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 30,
        "session": {
          "paths": 15,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 15,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-61",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 22,
        "session": {
          "paths": 11,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 11,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-62",
        "eventName": "App 启动",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-63",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-64",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 32,
        "session": {
          "paths": 15,
          "ratio": "46.8800%"
        },
        "additions": {
          "paths": 17,
          "ratio": "53.1300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-65",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 19,
        "session": {
          "paths": 9,
          "ratio": "47.3700%"
        },
        "additions": {
          "paths": 10,
          "ratio": "52.6300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-66",
        "eventName": "App 启动",
        "border": 2,
        "paths": 3,
        "session": {
          "paths": 1,
          "ratio": "33.3300%"
        },
        "additions": {
          "paths": 2,
          "ratio": "66.6700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-67",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 32,
        "session": {
          "paths": 16,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 16,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-68",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-69",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 10,
        "session": {
          "paths": 5,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-70",
        "eventName": "App 启动",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-71",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 26,
        "session": {
          "paths": 12,
          "ratio": "46.1500%"
        },
        "additions": {
          "paths": 14,
          "ratio": "53.8500%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-72",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-73",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-74",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-75",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 24,
        "session": {
          "paths": 12,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 12,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-76",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-77",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-78",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 32,
        "session": {
          "paths": 16,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 16,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-79",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-80",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-81",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 26,
        "session": {
          "paths": 13,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 13,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-82",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 7,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 7,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-83",
        "eventName": "App 启动",
        "border": 2,
        "paths": 3,
        "session": {
          "paths": 1,
          "ratio": "33.3300%"
        },
        "additions": {
          "paths": 2,
          "ratio": "66.6700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-84",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-85",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 29,
        "session": {
          "paths": 14,
          "ratio": "48.2800%"
        },
        "additions": {
          "paths": 15,
          "ratio": "51.7200%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-86",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-87",
        "eventName": "App 启动",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-88",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-89",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 9,
        "session": {
          "paths": 4,
          "ratio": "44.4400%"
        },
        "additions": {
          "paths": 5,
          "ratio": "55.5600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-90",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 20,
        "session": {
          "paths": 10,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 10,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-91",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-92",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 24,
        "session": {
          "paths": 12,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 12,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-93",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-94",
        "eventName": "App 启动",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-95",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-96",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 18,
        "session": {
          "paths": 9,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 9,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-97",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-98",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-99",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-100",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 20,
        "session": {
          "paths": 10,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 10,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-101",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-102",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 10,
        "session": {
          "paths": 5,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-103",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-104",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 24,
        "session": {
          "paths": 12,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 12,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-105",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-106",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-107",
        "eventName": "App 启动",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-108",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-109",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 20,
        "session": {
          "paths": 10,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 10,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-110",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-111",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-112",
        "eventName": "App 启动",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-113",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-114",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 18,
        "session": {
          "paths": 9,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 9,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-115",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-116",
        "eventName": "App 启动",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-117",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-118",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 15,
        "session": {
          "paths": 7,
          "ratio": "46.6700%"
        },
        "additions": {
          "paths": 8,
          "ratio": "53.3300%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-119",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 9,
        "session": {
          "paths": 4,
          "ratio": "44.4400%"
        },
        "additions": {
          "paths": 5,
          "ratio": "55.5600%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-120",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 18,
        "session": {
          "paths": 9,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 9,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-121",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-122",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-123",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 7,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 7,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-124",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 5,
        "session": {
          "paths": 2,
          "ratio": "40.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "60.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-125",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-126",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-127",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 7,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 7,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-128",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-129",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 6,
          "ratio": "42.8600%"
        },
        "additions": {
          "paths": 8,
          "ratio": "57.1400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-130",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 3,
        "session": {
          "paths": 1,
          "ratio": "33.3300%"
        },
        "additions": {
          "paths": 2,
          "ratio": "66.6700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-131",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-132",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 6,
          "ratio": "42.8600%"
        },
        "additions": {
          "paths": 8,
          "ratio": "57.1400%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-133",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-134",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 10,
        "session": {
          "paths": 5,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-135",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-136",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-137",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-138",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-139",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-140",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-141",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-142",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-143",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-144",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-145",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-146",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-147",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-148",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-149",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-150",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-151",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-152",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-153",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-154",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 14,
        "session": {
          "paths": 7,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 7,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-155",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-156",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-157",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 10,
        "session": {
          "paths": 5,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-158",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-159",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-160",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-161",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-162",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-163",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-164",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-165",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-166",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-167",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 12,
        "session": {
          "paths": 6,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 6,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-168",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-169",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 10,
        "session": {
          "paths": 5,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-170",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 3,
        "session": {
          "paths": 1,
          "ratio": "33.3300%"
        },
        "additions": {
          "paths": 2,
          "ratio": "66.6700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-171",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-172",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-173",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-174",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-175",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-176",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-177",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 3,
        "session": {
          "paths": 1,
          "ratio": "33.3300%"
        },
        "additions": {
          "paths": 2,
          "ratio": "66.6700%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-178",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-179",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-180",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-181",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-182",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-183",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-184",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-185",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-186",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-187",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-188",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-189",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-190",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-191",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-192",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-193",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-194",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-195",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-196",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-197",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-198",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-199",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-200",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-201",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-202",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-203",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-204",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-205",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 10,
        "session": {
          "paths": 5,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 5,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-206",
        "eventName": "AlertPopup",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-207",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 8,
        "session": {
          "paths": 4,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 4,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-208",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 5,
        "session": {
          "paths": 2,
          "ratio": "40.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "60.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-209",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-210",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-211",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-212",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-213",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-214",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-215",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-216",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 6,
        "session": {
          "paths": 3,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-217",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-218",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 5,
        "session": {
          "paths": 2,
          "ratio": "40.0000%"
        },
        "additions": {
          "paths": 3,
          "ratio": "60.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-219",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-220",
        "eventName": "App 启动",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-221",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-222",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-223",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-224",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-225",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-226",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-227",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-228",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-229",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 4,
        "session": {
          "paths": 2,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 2,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-230",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-231",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-232",
        "eventName": "Api 请求失败",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-233",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-234",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-235",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-236",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-237",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-238",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-239",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-240",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-241",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-242",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-243",
        "eventName": "App 元素点击",
        "border": 2,
        "paths": 2,
        "session": {
          "paths": 1,
          "ratio": "50.0000%"
        },
        "additions": {
          "paths": 1,
          "ratio": "50.0000%"
        }
      },
      {
        "groups": [],
        "column": 0,
        "name": "node-244",
        "eventName": "App 浏览页面",
        "border": 2,
        "paths": 1,
        "session": null,
        "additions": {
          "paths": 1,
          "ratio": "100.0000%"
        }
      }
    ], _links = [
      {
        "from": "node-1",
        "to": "node-8",
        "paths": 12,
        "ratio": "6.0600%"
      },
      {
        "from": "node-45",
        "to": "node-52",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-49",
        "to": "node-53",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-49",
        "to": "node-55",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-56",
        "to": "node-61",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-59",
        "to": "node-62",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-59",
        "to": "node-64",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-59",
        "to": "node-65",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-66",
        "to": "node-71",
        "paths": 1,
        "ratio": "33.3300%"
      },
      {
        "from": "node-70",
        "to": "node-75",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-74",
        "to": "node-78",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-6",
        "to": "node-11",
        "paths": 1,
        "ratio": "9.0900%"
      },
      {
        "from": "node-6",
        "to": "node-13",
        "paths": 2,
        "ratio": "18.1800%"
      },
      {
        "from": "node-6",
        "to": "node-15",
        "paths": 1,
        "ratio": "9.0900%"
      },
      {
        "from": "node-83",
        "to": "node-90",
        "paths": 1,
        "ratio": "33.3300%"
      },
      {
        "from": "node-87",
        "to": "node-92",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-94",
        "to": "node-100",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-94",
        "to": "node-102",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-107",
        "to": "node-112",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-107",
        "to": "node-114",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-116",
        "to": "node-120",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-11",
        "to": "node-18",
        "paths": 2,
        "ratio": "25.0000%"
      },
      {
        "from": "node-11",
        "to": "node-20",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-136",
        "to": "node-140",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-16",
        "to": "node-21",
        "paths": 1,
        "ratio": "20.0000%"
      },
      {
        "from": "node-16",
        "to": "node-23",
        "paths": 1,
        "ratio": "20.0000%"
      },
      {
        "from": "node-160",
        "to": "node-166",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-21",
        "to": "node-26",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-21",
        "to": "node-30",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-174",
        "to": "node-179",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-178",
        "to": "node-181",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-193",
        "to": "node-198",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-26",
        "to": "node-33",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-202",
        "to": "node-205",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-31",
        "to": "node-36",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-31",
        "to": "node-39",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-220",
        "to": "node-222",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-36",
        "to": "node-44",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-40",
        "to": "node-46",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-2",
        "to": "node-8",
        "paths": 1,
        "ratio": "3.4500%"
      },
      {
        "from": "node-2",
        "to": "node-9",
        "paths": 1,
        "ratio": "3.4500%"
      },
      {
        "from": "node-2",
        "to": "node-10",
        "paths": 11,
        "ratio": "37.9300%"
      },
      {
        "from": "node-7",
        "to": "node-14",
        "paths": 1,
        "ratio": "3.0300%"
      },
      {
        "from": "node-7",
        "to": "node-15",
        "paths": 13,
        "ratio": "39.3900%"
      },
      {
        "from": "node-84",
        "to": "node-88",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-88",
        "to": "node-91",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-91",
        "to": "node-95",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-95",
        "to": "node-99",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-99",
        "to": "node-103",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-103",
        "to": "node-108",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-108",
        "to": "node-113",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-113",
        "to": "node-117",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-12",
        "to": "node-19",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-12",
        "to": "node-20",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-126",
        "to": "node-130",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-17",
        "to": "node-23",
        "paths": 1,
        "ratio": "7.1400%"
      },
      {
        "from": "node-17",
        "to": "node-25",
        "paths": 5,
        "ratio": "35.7100%"
      },
      {
        "from": "node-22",
        "to": "node-27",
        "paths": 1,
        "ratio": "11.1100%"
      },
      {
        "from": "node-22",
        "to": "node-28",
        "paths": 1,
        "ratio": "11.1100%"
      },
      {
        "from": "node-22",
        "to": "node-30",
        "paths": 2,
        "ratio": "22.2200%"
      },
      {
        "from": "node-27",
        "to": "node-33",
        "paths": 1,
        "ratio": "20.0000%"
      },
      {
        "from": "node-27",
        "to": "node-35",
        "paths": 1,
        "ratio": "20.0000%"
      },
      {
        "from": "node-206",
        "to": "node-209",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-32",
        "to": "node-39",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-41",
        "to": "node-48",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-0",
        "to": "node-1",
        "paths": 186,
        "ratio": "15.9700%"
      },
      {
        "from": "node-0",
        "to": "node-2",
        "paths": 16,
        "ratio": "1.3700%"
      },
      {
        "from": "node-0",
        "to": "node-3",
        "paths": 627,
        "ratio": "53.8200%"
      },
      {
        "from": "node-0",
        "to": "node-4",
        "paths": 11,
        "ratio": "0.9400%"
      },
      {
        "from": "node-0",
        "to": "node-5",
        "paths": 86,
        "ratio": "7.3800%"
      },
      {
        "from": "node-3",
        "to": "node-6",
        "paths": 5,
        "ratio": "0.4600%"
      },
      {
        "from": "node-3",
        "to": "node-7",
        "paths": 17,
        "ratio": "1.5700%"
      },
      {
        "from": "node-3",
        "to": "node-8",
        "paths": 307,
        "ratio": "28.4300%"
      },
      {
        "from": "node-3",
        "to": "node-9",
        "paths": 4,
        "ratio": "0.3700%"
      },
      {
        "from": "node-3",
        "to": "node-10",
        "paths": 120,
        "ratio": "11.1100%"
      },
      {
        "from": "node-46",
        "to": "node-50",
        "paths": 19,
        "ratio": "36.5400%"
      },
      {
        "from": "node-46",
        "to": "node-52",
        "paths": 4,
        "ratio": "7.6900%"
      },
      {
        "from": "node-50",
        "to": "node-53",
        "paths": 14,
        "ratio": "29.1700%"
      },
      {
        "from": "node-50",
        "to": "node-55",
        "paths": 7,
        "ratio": "14.5800%"
      },
      {
        "from": "node-53",
        "to": "node-57",
        "paths": 13,
        "ratio": "31.7100%"
      },
      {
        "from": "node-53",
        "to": "node-58",
        "paths": 7,
        "ratio": "17.0700%"
      },
      {
        "from": "node-57",
        "to": "node-60",
        "paths": 10,
        "ratio": "27.0300%"
      },
      {
        "from": "node-57",
        "to": "node-61",
        "paths": 8,
        "ratio": "21.6200%"
      },
      {
        "from": "node-60",
        "to": "node-64",
        "paths": 11,
        "ratio": "36.6700%"
      },
      {
        "from": "node-60",
        "to": "node-65",
        "paths": 4,
        "ratio": "13.3300%"
      },
      {
        "from": "node-64",
        "to": "node-66",
        "paths": 2,
        "ratio": "6.2500%"
      },
      {
        "from": "node-64",
        "to": "node-67",
        "paths": 9,
        "ratio": "28.1300%"
      },
      {
        "from": "node-64",
        "to": "node-69",
        "paths": 4,
        "ratio": "12.5000%"
      },
      {
        "from": "node-67",
        "to": "node-70",
        "paths": 3,
        "ratio": "9.3800%"
      },
      {
        "from": "node-67",
        "to": "node-71",
        "paths": 9,
        "ratio": "28.1300%"
      },
      {
        "from": "node-67",
        "to": "node-73",
        "paths": 4,
        "ratio": "12.5000%"
      },
      {
        "from": "node-71",
        "to": "node-75",
        "paths": 7,
        "ratio": "26.9200%"
      },
      {
        "from": "node-71",
        "to": "node-77",
        "paths": 5,
        "ratio": "19.2300%"
      },
      {
        "from": "node-75",
        "to": "node-78",
        "paths": 9,
        "ratio": "37.5000%"
      },
      {
        "from": "node-75",
        "to": "node-79",
        "paths": 1,
        "ratio": "4.1700%"
      },
      {
        "from": "node-75",
        "to": "node-80",
        "paths": 2,
        "ratio": "8.3300%"
      },
      {
        "from": "node-78",
        "to": "node-81",
        "paths": 9,
        "ratio": "28.1300%"
      },
      {
        "from": "node-78",
        "to": "node-82",
        "paths": 7,
        "ratio": "21.8800%"
      },
      {
        "from": "node-8",
        "to": "node-11",
        "paths": 3,
        "ratio": "0.5000%"
      },
      {
        "from": "node-8",
        "to": "node-12",
        "paths": 2,
        "ratio": "0.3300%"
      },
      {
        "from": "node-8",
        "to": "node-13",
        "paths": 182,
        "ratio": "30.4300%"
      },
      {
        "from": "node-8",
        "to": "node-14",
        "paths": 8,
        "ratio": "1.3400%"
      },
      {
        "from": "node-8",
        "to": "node-15",
        "paths": 51,
        "ratio": "8.5300%"
      },
      {
        "from": "node-81",
        "to": "node-83",
        "paths": 2,
        "ratio": "7.6900%"
      },
      {
        "from": "node-81",
        "to": "node-85",
        "paths": 11,
        "ratio": "42.3100%"
      },
      {
        "from": "node-85",
        "to": "node-87",
        "paths": 2,
        "ratio": "6.9000%"
      },
      {
        "from": "node-85",
        "to": "node-89",
        "paths": 4,
        "ratio": "13.7900%"
      },
      {
        "from": "node-85",
        "to": "node-90",
        "paths": 8,
        "ratio": "27.5900%"
      },
      {
        "from": "node-89",
        "to": "node-92",
        "paths": 3,
        "ratio": "33.3300%"
      },
      {
        "from": "node-89",
        "to": "node-93",
        "paths": 1,
        "ratio": "11.1100%"
      },
      {
        "from": "node-92",
        "to": "node-94",
        "paths": 2,
        "ratio": "8.3300%"
      },
      {
        "from": "node-92",
        "to": "node-96",
        "paths": 7,
        "ratio": "29.1700%"
      },
      {
        "from": "node-92",
        "to": "node-98",
        "paths": 3,
        "ratio": "12.5000%"
      },
      {
        "from": "node-96",
        "to": "node-100",
        "paths": 5,
        "ratio": "27.7800%"
      },
      {
        "from": "node-96",
        "to": "node-101",
        "paths": 1,
        "ratio": "5.5600%"
      },
      {
        "from": "node-96",
        "to": "node-102",
        "paths": 3,
        "ratio": "16.6700%"
      },
      {
        "from": "node-100",
        "to": "node-104",
        "paths": 7,
        "ratio": "35.0000%"
      },
      {
        "from": "node-100",
        "to": "node-106",
        "paths": 3,
        "ratio": "15.0000%"
      },
      {
        "from": "node-104",
        "to": "node-107",
        "paths": 2,
        "ratio": "8.3300%"
      },
      {
        "from": "node-104",
        "to": "node-109",
        "paths": 6,
        "ratio": "25.0000%"
      },
      {
        "from": "node-104",
        "to": "node-110",
        "paths": 1,
        "ratio": "4.1700%"
      },
      {
        "from": "node-104",
        "to": "node-111",
        "paths": 3,
        "ratio": "12.5000%"
      },
      {
        "from": "node-109",
        "to": "node-114",
        "paths": 4,
        "ratio": "20.0000%"
      },
      {
        "from": "node-109",
        "to": "node-115",
        "paths": 6,
        "ratio": "30.0000%"
      },
      {
        "from": "node-114",
        "to": "node-116",
        "paths": 2,
        "ratio": "11.1100%"
      },
      {
        "from": "node-114",
        "to": "node-118",
        "paths": 5,
        "ratio": "27.7800%"
      },
      {
        "from": "node-114",
        "to": "node-119",
        "paths": 2,
        "ratio": "11.1100%"
      },
      {
        "from": "node-118",
        "to": "node-120",
        "paths": 6,
        "ratio": "40.0000%"
      },
      {
        "from": "node-118",
        "to": "node-121",
        "paths": 1,
        "ratio": "6.6700%"
      },
      {
        "from": "node-13",
        "to": "node-16",
        "paths": 1,
        "ratio": "0.2800%"
      },
      {
        "from": "node-13",
        "to": "node-17",
        "paths": 3,
        "ratio": "0.8400%"
      },
      {
        "from": "node-13",
        "to": "node-18",
        "paths": 117,
        "ratio": "32.7700%"
      },
      {
        "from": "node-13",
        "to": "node-19",
        "paths": 1,
        "ratio": "0.2800%"
      },
      {
        "from": "node-13",
        "to": "node-20",
        "paths": 27,
        "ratio": "7.5600%"
      },
      {
        "from": "node-120",
        "to": "node-123",
        "paths": 6,
        "ratio": "33.3300%"
      },
      {
        "from": "node-120",
        "to": "node-125",
        "paths": 3,
        "ratio": "16.6700%"
      },
      {
        "from": "node-123",
        "to": "node-126",
        "paths": 1,
        "ratio": "7.1400%"
      },
      {
        "from": "node-123",
        "to": "node-127",
        "paths": 2,
        "ratio": "14.2900%"
      },
      {
        "from": "node-123",
        "to": "node-128",
        "paths": 4,
        "ratio": "28.5700%"
      },
      {
        "from": "node-127",
        "to": "node-129",
        "paths": 5,
        "ratio": "35.7100%"
      },
      {
        "from": "node-127",
        "to": "node-131",
        "paths": 2,
        "ratio": "14.2900%"
      },
      {
        "from": "node-129",
        "to": "node-132",
        "paths": 6,
        "ratio": "42.8600%"
      },
      {
        "from": "node-132",
        "to": "node-134",
        "paths": 4,
        "ratio": "28.5700%"
      },
      {
        "from": "node-132",
        "to": "node-135",
        "paths": 2,
        "ratio": "14.2900%"
      },
      {
        "from": "node-134",
        "to": "node-136",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-134",
        "to": "node-137",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-134",
        "to": "node-138",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-134",
        "to": "node-139",
        "paths": 2,
        "ratio": "20.0000%"
      },
      {
        "from": "node-137",
        "to": "node-140",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-140",
        "to": "node-142",
        "paths": 3,
        "ratio": "25.0000%"
      },
      {
        "from": "node-140",
        "to": "node-143",
        "paths": 1,
        "ratio": "8.3300%"
      },
      {
        "from": "node-140",
        "to": "node-144",
        "paths": 2,
        "ratio": "16.6700%"
      },
      {
        "from": "node-142",
        "to": "node-145",
        "paths": 2,
        "ratio": "25.0000%"
      },
      {
        "from": "node-142",
        "to": "node-146",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-142",
        "to": "node-147",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-145",
        "to": "node-148",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-18",
        "to": "node-21",
        "paths": 1,
        "ratio": "0.3700%"
      },
      {
        "from": "node-18",
        "to": "node-22",
        "paths": 1,
        "ratio": "0.3700%"
      },
      {
        "from": "node-18",
        "to": "node-23",
        "paths": 91,
        "ratio": "33.9600%"
      },
      {
        "from": "node-18",
        "to": "node-24",
        "paths": 1,
        "ratio": "0.3700%"
      },
      {
        "from": "node-18",
        "to": "node-25",
        "paths": 22,
        "ratio": "8.2100%"
      },
      {
        "from": "node-148",
        "to": "node-150",
        "paths": 3,
        "ratio": "25.0000%"
      },
      {
        "from": "node-148",
        "to": "node-151",
        "paths": 3,
        "ratio": "25.0000%"
      },
      {
        "from": "node-150",
        "to": "node-152",
        "paths": 3,
        "ratio": "37.5000%"
      },
      {
        "from": "node-150",
        "to": "node-153",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-152",
        "to": "node-154",
        "paths": 6,
        "ratio": "50.0000%"
      },
      {
        "from": "node-154",
        "to": "node-155",
        "paths": 6,
        "ratio": "42.8600%"
      },
      {
        "from": "node-154",
        "to": "node-156",
        "paths": 1,
        "ratio": "7.1400%"
      },
      {
        "from": "node-155",
        "to": "node-157",
        "paths": 4,
        "ratio": "33.3300%"
      },
      {
        "from": "node-155",
        "to": "node-158",
        "paths": 1,
        "ratio": "8.3300%"
      },
      {
        "from": "node-155",
        "to": "node-159",
        "paths": 1,
        "ratio": "8.3300%"
      },
      {
        "from": "node-157",
        "to": "node-161",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-157",
        "to": "node-162",
        "paths": 2,
        "ratio": "20.0000%"
      },
      {
        "from": "node-157",
        "to": "node-163",
        "paths": 2,
        "ratio": "20.0000%"
      },
      {
        "from": "node-161",
        "to": "node-164",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-164",
        "to": "node-167",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-167",
        "to": "node-169",
        "paths": 5,
        "ratio": "41.6700%"
      },
      {
        "from": "node-167",
        "to": "node-170",
        "paths": 1,
        "ratio": "8.3300%"
      },
      {
        "from": "node-169",
        "to": "node-171",
        "paths": 2,
        "ratio": "20.0000%"
      },
      {
        "from": "node-169",
        "to": "node-172",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-169",
        "to": "node-173",
        "paths": 2,
        "ratio": "20.0000%"
      },
      {
        "from": "node-23",
        "to": "node-26",
        "paths": 1,
        "ratio": "0.5100%"
      },
      {
        "from": "node-23",
        "to": "node-28",
        "paths": 75,
        "ratio": "38.2700%"
      },
      {
        "from": "node-23",
        "to": "node-30",
        "paths": 10,
        "ratio": "5.1000%"
      },
      {
        "from": "node-171",
        "to": "node-174",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-171",
        "to": "node-175",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-175",
        "to": "node-179",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-175",
        "to": "node-180",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-179",
        "to": "node-181",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-179",
        "to": "node-182",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-181",
        "to": "node-183",
        "paths": 3,
        "ratio": "37.5000%"
      },
      {
        "from": "node-181",
        "to": "node-184",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-183",
        "to": "node-185",
        "paths": 2,
        "ratio": "25.0000%"
      },
      {
        "from": "node-183",
        "to": "node-186",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-183",
        "to": "node-187",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-185",
        "to": "node-188",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-188",
        "to": "node-190",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-188",
        "to": "node-191",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-188",
        "to": "node-192",
        "paths": 2,
        "ratio": "25.0000%"
      },
      {
        "from": "node-190",
        "to": "node-195",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-194",
        "to": "node-196",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-196",
        "to": "node-199",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-196",
        "to": "node-201",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-28",
        "to": "node-31",
        "paths": 2,
        "ratio": "1.1500%"
      },
      {
        "from": "node-28",
        "to": "node-32",
        "paths": 1,
        "ratio": "0.5700%"
      },
      {
        "from": "node-28",
        "to": "node-33",
        "paths": 55,
        "ratio": "31.6100%"
      },
      {
        "from": "node-28",
        "to": "node-34",
        "paths": 2,
        "ratio": "1.1500%"
      },
      {
        "from": "node-28",
        "to": "node-35",
        "paths": 19,
        "ratio": "10.9200%"
      },
      {
        "from": "node-199",
        "to": "node-203",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-203",
        "to": "node-205",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-207",
        "to": "node-208",
        "paths": 3,
        "ratio": "37.5000%"
      },
      {
        "from": "node-207",
        "to": "node-209",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-208",
        "to": "node-210",
        "paths": 2,
        "ratio": "40.0000%"
      },
      {
        "from": "node-210",
        "to": "node-212",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-210",
        "to": "node-213",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-212",
        "to": "node-214",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-212",
        "to": "node-215",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-214",
        "to": "node-216",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-216",
        "to": "node-218",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-218",
        "to": "node-220",
        "paths": 1,
        "ratio": "20.0000%"
      },
      {
        "from": "node-218",
        "to": "node-221",
        "paths": 1,
        "ratio": "20.0000%"
      },
      {
        "from": "node-33",
        "to": "node-37",
        "paths": 38,
        "ratio": "31.1500%"
      },
      {
        "from": "node-33",
        "to": "node-39",
        "paths": 15,
        "ratio": "12.3000%"
      },
      {
        "from": "node-221",
        "to": "node-223",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-221",
        "to": "node-224",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-222",
        "to": "node-225",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-225",
        "to": "node-227",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-225",
        "to": "node-228",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-227",
        "to": "node-229",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-229",
        "to": "node-232",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-229",
        "to": "node-233",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-231",
        "to": "node-234",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-235",
        "to": "node-236",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-236",
        "to": "node-237",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-37",
        "to": "node-40",
        "paths": 1,
        "ratio": "1.1600%"
      },
      {
        "from": "node-37",
        "to": "node-42",
        "paths": 30,
        "ratio": "34.8800%"
      },
      {
        "from": "node-37",
        "to": "node-43",
        "paths": 1,
        "ratio": "1.1600%"
      },
      {
        "from": "node-37",
        "to": "node-44",
        "paths": 5,
        "ratio": "5.8100%"
      },
      {
        "from": "node-238",
        "to": "node-239",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-242",
        "to": "node-243",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-42",
        "to": "node-45",
        "paths": 1,
        "ratio": "1.2700%"
      },
      {
        "from": "node-42",
        "to": "node-46",
        "paths": 23,
        "ratio": "29.1100%"
      },
      {
        "from": "node-42",
        "to": "node-47",
        "paths": 2,
        "ratio": "2.5300%"
      },
      {
        "from": "node-42",
        "to": "node-48",
        "paths": 9,
        "ratio": "11.3900%"
      },
      {
        "from": "node-4",
        "to": "node-8",
        "paths": 3,
        "ratio": "18.7500%"
      },
      {
        "from": "node-4",
        "to": "node-9",
        "paths": 2,
        "ratio": "12.5000%"
      },
      {
        "from": "node-47",
        "to": "node-51",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-47",
        "to": "node-52",
        "paths": 3,
        "ratio": "37.5000%"
      },
      {
        "from": "node-54",
        "to": "node-57",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-54",
        "to": "node-58",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-72",
        "to": "node-75",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-76",
        "to": "node-78",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-79",
        "to": "node-81",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-9",
        "to": "node-14",
        "paths": 1,
        "ratio": "9.0900%"
      },
      {
        "from": "node-9",
        "to": "node-15",
        "paths": 1,
        "ratio": "9.0900%"
      },
      {
        "from": "node-97",
        "to": "node-100",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-101",
        "to": "node-104",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-105",
        "to": "node-109",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-110",
        "to": "node-114",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-14",
        "to": "node-17",
        "paths": 1,
        "ratio": "3.5700%"
      },
      {
        "from": "node-14",
        "to": "node-18",
        "paths": 4,
        "ratio": "14.2900%"
      },
      {
        "from": "node-14",
        "to": "node-19",
        "paths": 5,
        "ratio": "17.8600%"
      },
      {
        "from": "node-14",
        "to": "node-20",
        "paths": 2,
        "ratio": "7.1400%"
      },
      {
        "from": "node-121",
        "to": "node-124",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-124",
        "to": "node-127",
        "paths": 2,
        "ratio": "40.0000%"
      },
      {
        "from": "node-130",
        "to": "node-133",
        "paths": 1,
        "ratio": "33.3300%"
      },
      {
        "from": "node-138",
        "to": "node-140",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-143",
        "to": "node-146",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-146",
        "to": "node-148",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-146",
        "to": "node-149",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-19",
        "to": "node-23",
        "paths": 4,
        "ratio": "21.0500%"
      },
      {
        "from": "node-19",
        "to": "node-24",
        "paths": 3,
        "ratio": "15.7900%"
      },
      {
        "from": "node-19",
        "to": "node-25",
        "paths": 2,
        "ratio": "10.5300%"
      },
      {
        "from": "node-153",
        "to": "node-154",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-158",
        "to": "node-160",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-162",
        "to": "node-164",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-162",
        "to": "node-165",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-165",
        "to": "node-167",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-165",
        "to": "node-168",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-24",
        "to": "node-28",
        "paths": 1,
        "ratio": "9.0900%"
      },
      {
        "from": "node-24",
        "to": "node-29",
        "paths": 2,
        "ratio": "18.1800%"
      },
      {
        "from": "node-24",
        "to": "node-30",
        "paths": 1,
        "ratio": "9.0900%"
      },
      {
        "from": "node-172",
        "to": "node-176",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-176",
        "to": "node-178",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-180",
        "to": "node-181",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-186",
        "to": "node-188",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-191",
        "to": "node-193",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-197",
        "to": "node-200",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-29",
        "to": "node-35",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-200",
        "to": "node-202",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-34",
        "to": "node-38",
        "paths": 2,
        "ratio": "40.0000%"
      },
      {
        "from": "node-223",
        "to": "node-226",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-226",
        "to": "node-227",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-38",
        "to": "node-42",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-38",
        "to": "node-43",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-43",
        "to": "node-46",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-43",
        "to": "node-47",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-43",
        "to": "node-48",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-5",
        "to": "node-6",
        "paths": 2,
        "ratio": "1.4000%"
      },
      {
        "from": "node-5",
        "to": "node-7",
        "paths": 2,
        "ratio": "1.4000%"
      },
      {
        "from": "node-5",
        "to": "node-8",
        "paths": 29,
        "ratio": "20.2800%"
      },
      {
        "from": "node-5",
        "to": "node-9",
        "paths": 2,
        "ratio": "1.4000%"
      },
      {
        "from": "node-5",
        "to": "node-10",
        "paths": 22,
        "ratio": "15.3800%"
      },
      {
        "from": "node-48",
        "to": "node-49",
        "paths": 2,
        "ratio": "6.6700%"
      },
      {
        "from": "node-48",
        "to": "node-50",
        "paths": 8,
        "ratio": "26.6700%"
      },
      {
        "from": "node-48",
        "to": "node-52",
        "paths": 4,
        "ratio": "13.3300%"
      },
      {
        "from": "node-52",
        "to": "node-53",
        "paths": 6,
        "ratio": "26.0900%"
      },
      {
        "from": "node-52",
        "to": "node-54",
        "paths": 2,
        "ratio": "8.7000%"
      },
      {
        "from": "node-52",
        "to": "node-55",
        "paths": 3,
        "ratio": "13.0400%"
      },
      {
        "from": "node-55",
        "to": "node-56",
        "paths": 1,
        "ratio": "4.7600%"
      },
      {
        "from": "node-55",
        "to": "node-57",
        "paths": 5,
        "ratio": "23.8100%"
      },
      {
        "from": "node-55",
        "to": "node-58",
        "paths": 4,
        "ratio": "19.0500%"
      },
      {
        "from": "node-58",
        "to": "node-59",
        "paths": 3,
        "ratio": "13.6400%"
      },
      {
        "from": "node-58",
        "to": "node-60",
        "paths": 5,
        "ratio": "22.7300%"
      },
      {
        "from": "node-58",
        "to": "node-61",
        "paths": 2,
        "ratio": "9.0900%"
      },
      {
        "from": "node-61",
        "to": "node-63",
        "paths": 1,
        "ratio": "4.5500%"
      },
      {
        "from": "node-61",
        "to": "node-64",
        "paths": 5,
        "ratio": "22.7300%"
      },
      {
        "from": "node-61",
        "to": "node-65",
        "paths": 5,
        "ratio": "22.7300%"
      },
      {
        "from": "node-65",
        "to": "node-67",
        "paths": 7,
        "ratio": "36.8400%"
      },
      {
        "from": "node-65",
        "to": "node-68",
        "paths": 1,
        "ratio": "5.2600%"
      },
      {
        "from": "node-65",
        "to": "node-69",
        "paths": 1,
        "ratio": "5.2600%"
      },
      {
        "from": "node-69",
        "to": "node-71",
        "paths": 4,
        "ratio": "40.0000%"
      },
      {
        "from": "node-69",
        "to": "node-72",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-73",
        "to": "node-74",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-73",
        "to": "node-75",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-73",
        "to": "node-76",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-73",
        "to": "node-77",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-77",
        "to": "node-78",
        "paths": 5,
        "ratio": "41.6700%"
      },
      {
        "from": "node-77",
        "to": "node-80",
        "paths": 1,
        "ratio": "8.3300%"
      },
      {
        "from": "node-80",
        "to": "node-81",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-10",
        "to": "node-11",
        "paths": 1,
        "ratio": "0.4200%"
      },
      {
        "from": "node-10",
        "to": "node-12",
        "paths": 2,
        "ratio": "0.8300%"
      },
      {
        "from": "node-10",
        "to": "node-13",
        "paths": 24,
        "ratio": "10.0000%"
      },
      {
        "from": "node-10",
        "to": "node-14",
        "paths": 6,
        "ratio": "2.5000%"
      },
      {
        "from": "node-10",
        "to": "node-15",
        "paths": 54,
        "ratio": "22.5000%"
      },
      {
        "from": "node-82",
        "to": "node-84",
        "paths": 1,
        "ratio": "7.1400%"
      },
      {
        "from": "node-82",
        "to": "node-85",
        "paths": 4,
        "ratio": "28.5700%"
      },
      {
        "from": "node-82",
        "to": "node-86",
        "paths": 2,
        "ratio": "14.2900%"
      },
      {
        "from": "node-86",
        "to": "node-89",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-86",
        "to": "node-90",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-90",
        "to": "node-92",
        "paths": 7,
        "ratio": "35.0000%"
      },
      {
        "from": "node-90",
        "to": "node-93",
        "paths": 3,
        "ratio": "15.0000%"
      },
      {
        "from": "node-93",
        "to": "node-94",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-93",
        "to": "node-96",
        "paths": 2,
        "ratio": "25.0000%"
      },
      {
        "from": "node-93",
        "to": "node-97",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-98",
        "to": "node-100",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-98",
        "to": "node-102",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-102",
        "to": "node-104",
        "paths": 4,
        "ratio": "40.0000%"
      },
      {
        "from": "node-102",
        "to": "node-105",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-106",
        "to": "node-109",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-111",
        "to": "node-114",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-115",
        "to": "node-118",
        "paths": 3,
        "ratio": "25.0000%"
      },
      {
        "from": "node-115",
        "to": "node-119",
        "paths": 3,
        "ratio": "25.0000%"
      },
      {
        "from": "node-119",
        "to": "node-120",
        "paths": 1,
        "ratio": "11.1100%"
      },
      {
        "from": "node-119",
        "to": "node-122",
        "paths": 3,
        "ratio": "33.3300%"
      },
      {
        "from": "node-15",
        "to": "node-16",
        "paths": 2,
        "ratio": "1.0600%"
      },
      {
        "from": "node-15",
        "to": "node-17",
        "paths": 4,
        "ratio": "2.1200%"
      },
      {
        "from": "node-15",
        "to": "node-18",
        "paths": 29,
        "ratio": "15.3400%"
      },
      {
        "from": "node-15",
        "to": "node-19",
        "paths": 3,
        "ratio": "1.5900%"
      },
      {
        "from": "node-15",
        "to": "node-20",
        "paths": 31,
        "ratio": "16.4000%"
      },
      {
        "from": "node-122",
        "to": "node-123",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-122",
        "to": "node-124",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-125",
        "to": "node-127",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-128",
        "to": "node-129",
        "paths": 3,
        "ratio": "37.5000%"
      },
      {
        "from": "node-128",
        "to": "node-130",
        "paths": 1,
        "ratio": "12.5000%"
      },
      {
        "from": "node-131",
        "to": "node-132",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-133",
        "to": "node-134",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-135",
        "to": "node-137",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-135",
        "to": "node-139",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-139",
        "to": "node-140",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-139",
        "to": "node-141",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-141",
        "to": "node-142",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-144",
        "to": "node-145",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-144",
        "to": "node-147",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-147",
        "to": "node-148",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-20",
        "to": "node-21",
        "paths": 1,
        "ratio": "1.0100%"
      },
      {
        "from": "node-20",
        "to": "node-22",
        "paths": 4,
        "ratio": "4.0400%"
      },
      {
        "from": "node-20",
        "to": "node-23",
        "paths": 13,
        "ratio": "13.1300%"
      },
      {
        "from": "node-20",
        "to": "node-24",
        "paths": 3,
        "ratio": "3.0300%"
      },
      {
        "from": "node-20",
        "to": "node-25",
        "paths": 16,
        "ratio": "16.1600%"
      },
      {
        "from": "node-149",
        "to": "node-150",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-151",
        "to": "node-152",
        "paths": 3,
        "ratio": "50.0000%"
      },
      {
        "from": "node-156",
        "to": "node-157",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-159",
        "to": "node-163",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-163",
        "to": "node-164",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-163",
        "to": "node-165",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-163",
        "to": "node-166",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-166",
        "to": "node-167",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-168",
        "to": "node-170",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-170",
        "to": "node-173",
        "paths": 1,
        "ratio": "33.3300%"
      },
      {
        "from": "node-25",
        "to": "node-27",
        "paths": 2,
        "ratio": "2.5000%"
      },
      {
        "from": "node-25",
        "to": "node-28",
        "paths": 18,
        "ratio": "22.5000%"
      },
      {
        "from": "node-25",
        "to": "node-30",
        "paths": 15,
        "ratio": "18.7500%"
      },
      {
        "from": "node-173",
        "to": "node-175",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-173",
        "to": "node-177",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-177",
        "to": "node-179",
        "paths": 1,
        "ratio": "33.3300%"
      },
      {
        "from": "node-182",
        "to": "node-183",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-184",
        "to": "node-187",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-187",
        "to": "node-188",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-187",
        "to": "node-189",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-189",
        "to": "node-190",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-192",
        "to": "node-194",
        "paths": 2,
        "ratio": "50.0000%"
      },
      {
        "from": "node-195",
        "to": "node-196",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-195",
        "to": "node-197",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-198",
        "to": "node-199",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-30",
        "to": "node-32",
        "paths": 1,
        "ratio": "1.9600%"
      },
      {
        "from": "node-30",
        "to": "node-33",
        "paths": 11,
        "ratio": "21.5700%"
      },
      {
        "from": "node-30",
        "to": "node-34",
        "paths": 1,
        "ratio": "1.9600%"
      },
      {
        "from": "node-30",
        "to": "node-35",
        "paths": 8,
        "ratio": "15.6900%"
      },
      {
        "from": "node-201",
        "to": "node-204",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-204",
        "to": "node-205",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-205",
        "to": "node-206",
        "paths": 1,
        "ratio": "10.0000%"
      },
      {
        "from": "node-205",
        "to": "node-207",
        "paths": 4,
        "ratio": "40.0000%"
      },
      {
        "from": "node-209",
        "to": "node-210",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-209",
        "to": "node-211",
        "paths": 1,
        "ratio": "25.0000%"
      },
      {
        "from": "node-211",
        "to": "node-212",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-213",
        "to": "node-215",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-215",
        "to": "node-216",
        "paths": 2,
        "ratio": "33.3300%"
      },
      {
        "from": "node-215",
        "to": "node-217",
        "paths": 1,
        "ratio": "16.6700%"
      },
      {
        "from": "node-217",
        "to": "node-219",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-219",
        "to": "node-221",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-35",
        "to": "node-37",
        "paths": 11,
        "ratio": "20.7500%"
      },
      {
        "from": "node-35",
        "to": "node-38",
        "paths": 1,
        "ratio": "1.8900%"
      },
      {
        "from": "node-35",
        "to": "node-39",
        "paths": 11,
        "ratio": "20.7500%"
      },
      {
        "from": "node-224",
        "to": "node-225",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-228",
        "to": "node-230",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-230",
        "to": "node-231",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-234",
        "to": "node-235",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-237",
        "to": "node-238",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-39",
        "to": "node-41",
        "paths": 1,
        "ratio": "1.8900%"
      },
      {
        "from": "node-39",
        "to": "node-42",
        "paths": 12,
        "ratio": "22.6400%"
      },
      {
        "from": "node-39",
        "to": "node-43",
        "paths": 3,
        "ratio": "5.6600%"
      },
      {
        "from": "node-39",
        "to": "node-44",
        "paths": 8,
        "ratio": "15.0900%"
      },
      {
        "from": "node-239",
        "to": "node-240",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-240",
        "to": "node-241",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-241",
        "to": "node-242",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-243",
        "to": "node-244",
        "paths": 1,
        "ratio": "50.0000%"
      },
      {
        "from": "node-44",
        "to": "node-46",
        "paths": 4,
        "ratio": "16.6700%"
      },
      {
        "from": "node-44",
        "to": "node-47",
        "paths": 1,
        "ratio": "4.1700%"
      },
      {
        "from": "node-44",
        "to": "node-48",
        "paths": 5,
        "ratio": "20.8300%"
      }
    ]) {
      this.tooltop = this.$refs.tooltop

      this.clickTools = this.$refs.clickTools

      this.add = this.$refs.add

      this.line = this.$refs.line
      let nodes = _nodes.map((item, index) => {
        if (this.colorIndex++ >= this.colorList.length - 1) {
          this.colorIndex = 0
        }
        return {
          ...item,
          value: item.paths,
          color: this.colorList[this.colorIndex],
        }
      })
      // .filter((item, index) => index < 30)

      let links = _links
        .map(item => ({
          ...item,
          source: item.from,
          target: item.to,
          value2: item.paths,
          ratio2: item.ratio,
        }))
      // .filter((item, index) => index < 30)

      links.forEach(item => {
        nodes.forEach(item2 => {
          if (item.target === item2.name) {
            item.node = item2
          }
        })
      })

      nodes.forEach(item => {
        links.forEach(item2 => {
          if (item.name === item2.source) {
            if (item.children) {
              item.children.push(item2)
            } else {
              item.children = [item2]
            }
            if (item2.node.parent) {
              item2.node.parent.push(item)
            } else {
              item2.node.parent = [item]
            }
          }
        })
      })

      // nodes = nodes.filter(item => item.name === 'node-0')
      // console.log(nodes, 'nodes__')

      function depchs (nodes, depch = -1) {
        nodes.forEach(item => {
          if (depch === -1) {
            if (item.depch === undefined) {
              item.depch = 0
            }

            if (item.children) {
              depchs(item.children, item.depch)
            }
            return
          }

          if (item.node.depch === undefined) {
            item.node.depch = depch + 1
            item.depch = depch + 1
            // if (item.node.children && item.node.children.length > 0) {
            // depchs(item.node.children, item.node.depch)
            // }
          } else if (depch >= item.node.depch) {
            item.node.depch = depch + 1
            // if (item.node.children && item.node.children.length > 0) {
            // depchs(item.node.children, item.node.depch)
            // }
          }
          // item.node.depch = depch + 1
          if (item.node.children) {
            depchs(item.node.children, item.depch)
            item.depch = depch + 1
          }
        })
      }

      nodes.sort((a, b) => {
        return parseInt(a.name.split('-')[1]) - parseInt(b.name.split('-')[1])
      })

      // console.log(nodes, 'nodes_-')
      console.log(nodes, 'node_s')
      depchs(this.isStart ? [nodes[0]] : [nodes.at(-1)])


      nodes.forEach(item => {
        if (this.isStart) {
          if (item.border === 1) {
            item.depch = 0
          }
        } else if (item.border === 3) {
          item.depch = node.length - 1
        }
      })

      const list = nodes.reduce((prev, cur) => {
        if (prev[cur.depch]) {
          cur.index = prev[cur.depch].push(cur) - 1
        } else {
          prev[cur.depch] = [cur]
          cur.index = 0
        }

        return prev
      }, [])

      nodes.forEach(item => {
        for (let key in item.node) {
          item[key] = item.node[key]
        }
        delete item.node
      })
      links.forEach(item => {
        for (let key in item.node) {
          item[key] = item.node[key]
        }
        delete item.node
      })

      this.list = list
      console.log(list, 'list__')

      this.svgWidth = list.length * 420
      const max = list.reduce((prev, cur) => {
        if (cur.length > prev) {
          return cur.length
        }
        return prev
      }, 0)

      this.svgHeight = max * 80
      console.log(this.svgHeight, 'this.svgHeight')


      setTimeout(() => {
        if (this.isStart) {
          this.$refs.warp.scrollLeft = 0
        } else {
          this.$refs.warp.scrollLeft = this.svgWidth
        }
      })
    },

  },
  created () {
    /* window.high = this.high
      window.node = this.node
      window.cli = this.cli */
  },

  mounted () {
    // this.wrapWidth = this.$refs.wrap.clientWidth
    this.render()

  },

  beforeDestroy () {
    // 实例销毁之前对点击事件进行解绑
    // window.removeEventListener('click', this.clickOther)
  },
}
</script>

<style scoped>
.loading {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 30;
  font-size: 20px;
}
.charts {
  margin: 25px;
}
.witeSelect {
  width: 280px;
  height: 130px;
  background-color: #eff0f8;
  border: 1px solid #c5c7e5;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.test p:nth-child(1) {
  font-size: 14px;
  word-wrap: break-word;
}
.test p:nth-child(2),
.test1 {
  font-size: 13px;
  color: #848989;
  margin: 0 0 10px;
}
.selectResule {
  width: 280px;
  height: 130px;
  background-color: #eff0f8;
  border: 1px solid #c5c7e5;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.open {
  display: none;
  position: absolute;
  width: 300px;
  background-color: rgba(0, 0, 0, 0.9);
  padding: 20px;
  border-radius: 10px;
  color: #fff;
}

svg * {
  /* opacity: .5; */
}

.line {
  width: 400px;
}

.title {
  display: flex;
  margin-bottom: 20px;
}

.title h2 {
  flex: 1;
  text-align: center;
  font-size: 14px;
}

.ct {
  display: flex;
  text-align: center;
  margin-bottom: 20px;
}
.ct:last-child {
  margin-bottom: 0;
}
.ct div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.round.red {
  background-color: #ed7f79;
}

.round {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #6995f8;
  margin-right: 10px;
}

.gg:hover * {
  stroke-width: 3;
}

.box {
  display: none;
  width: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  flex-direction: column;
  position: relative;
  row-gap: 15px;
  position: absolute;
}

.box > .but {
  padding: 5px 0;
  border: 1px solid #eee;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}

.a {
  position: absolute;
  top: -20px;
  display: block;
  left: 20px;
  width: 0;
  height: 0;
  border: 10px solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
}
</style>

<template>
  <div>
    <div
      style="
        margin-top: 10px;
        border-bottom: #efefef solid 1px;
        padding-left: 20px;
      "
    >
      <el-tabs
        v-model="activeTabName"
        type="card"
        @tab-click="onTabAciveChange"
      >
        <el-tab-pane label="通过水平/垂直距离范围来设置" name="case1">
          <div style="width: 700px">
            <div style="padding-bottom: 10px; color: #333333">
              图谱默认会根据当前可见范围自动调整水平方向与垂直方向的距离，<b>图谱会尽量让图谱显得舒展且不超出可见范围</b>。当图谱计算出的距离小于设置的最小值时
              设置的最小值会生效；当图谱计算出的最大值大于设置的最大值时
              设置的最大值会生效;你可以多次尝试设置以下两组最大值和最小值，感受一下取舍关系。
            </div>
            <span class="c-label">节点间最小横向距离:</span>
            <el-slider
              v-model="range_horizontal"
              range
              :max="500"
              @change="onChangeOptionByCase1"
            >
            </el-slider>
          </div>
          <div style="width: 700px">
            <span class="c-label">节点间最小纵向距离:</span>
            <el-slider
              v-model="range_vertical"
              range
              :max="500"
              @change="onChangeOptionByCase1"
            >
            </el-slider>
          </div>
        </el-tab-pane>
        <el-tab-pane label="通过固定的层级距离来设置" name="case2">
          <div style="width: 700px">
            <div style="padding-bottom: 10px; color: #333333">
              你可以设置每一层的距离，比如：400,200,300,500
              表示根节点与第1次距离为400、第1层与第2次距离为200、第2层与第3层距离为300、第3层与第4层距离为500。如果此选项有值，则优先级高于水平/垂直距离的设置。
            </div>
            <span class="c-label">节点间最小横向距离:</span>
            <el-input
              v-model="levelDistance"
              placeholder="请输入内容"
              @change="onChangeOptionByCase2"
            ></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      v-loading="g_loading"
      style="width: calc(100% - 10px); height: calc(100vh - 190px)"
    >
      <SeeksRelationGraph
        ref="seeksRelationGraph"
        :options="graphOptions"
        :on-node-expand="onNodeExpand"
      >
      </SeeksRelationGraph>
    </div>
    <el-button type="success" class="c-show-code-button">
      <el-link
        href="https://github.com/seeksdream/relation-graph/blob/master/doc/demo/Demo4TreeDistance.vue"
        target="_blank"
        style="color: #ffffff"
        >查看代码
      </el-link>
    </el-button>
  </div>
</template>

<script>
import SeeksRelationGraph from 'relation-graph'
export default {
  name: 'SeeksRelationGraphDemo',
  components: { SeeksRelationGraph },
  data () {
    return {
      g_loading: true,
      demoname: '---',
      activeTabName: 'case1',
      range_horizontal: [100, 300],
      range_vertical: [20, 100],
      levelDistance: '400,200,300,500',
      graphOptions: {
        debug: true,
        'backgrounImage': 'http://ai-mark.cn/images/ai-mark-desc.png',
        'backgrounImageNoRepeat': true,
        'layouts': [
          {
            'label': '树',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            // 通过这4个属性来调整 tree-层级距离&节点距离
            'min_per_width': undefined,
            'max_per_width': '300',
            'min_per_height': '40',
            'max_per_height': undefined,
            'levelDistance': '' // 如果此选项有值，则优先级高于上面那4个选项
          }
        ],
        'defaultLineMarker': {
          'markerWidth': 12,
          'markerHeight': 12,
          'refX': 6,
          'refY': 6,
          'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
        },
        "defaultExpandHolderPosition": "right",
        'defaultNodeShape': 1,
        'defaultNodeWidth': '100',
        'defaultLineShape': 4,
        'defaultJunctionPoint': 'lr',
        'defaultNodeBorderWidth': 0,
        'defaultLineColor': 'rgba(0, 186, 189, 1)',
        'defaultNodeColor': 'rgba(0, 206, 209, 1)'
      }
    }
  },
  created () {
  },
  mounted () {
    this.demoname = this.$route.params.demoname
    this.setGraphData()
  },
  methods: {
    setGraphData () {
      // 使用要点：通过节点属性expandHolderPosition: 'right' 和 expanded: false 可以让节点在没有子节点的情况下展示一个"展开"按钮
      //         通过onNodeExpand事件监听节点，在被展开的时候有选择的去从后台获取数据，如果已经从后台加载过数据，则让当前图谱根据当前的节点重新布局
      var __graph_json_data ={
  "rootId": "银联商务股份有限公司",
  "nodes": [
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "银联商务股份有限公司",
        "text": "银联商务股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "广州银联网络支付有限公司",
        "text": "广州银联网络支付有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "深圳市银联金融网络有限公司",
        "text": "深圳市银联金融网络有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "宁波银联商务有限公司",
        "text": "宁波银联商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "厦门鑫融联电子商务有限公司",
        "text": "厦门鑫融联电子商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "银视通信息科技有限公司",
        "text": "银视通信息科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "上海银商资讯有限公司",
        "text": "上海银商资讯有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "海联金汇科技股份有限公司",
        "text": "海联金汇科技股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "厦门易通卡运营有限责任公司",
        "text": "厦门易通卡运营有限责任公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "上海付费通信息服务有限公司",
        "text": "上海付费通信息服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "网联清算有限公司",
        "text": "网联清算有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "联动优势科技有限公司",
        "text": "联动优势科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "苏州通卡联城投资管理有限公司",
        "text": "苏州通卡联城投资管理有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "上海银商电子商务有限公司",
        "text": "上海银商电子商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛海立美达模具有限公司",
        "text": "青岛海立美达模具有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "上海海联金汇汽车零部件有限公司",
        "text": "上海海联金汇汽车零部件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛高创澳海股权投资管理有限公司",
        "text": "青岛高创澳海股权投资管理有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "中金金融认证中心有限公司",
        "text": "中金金融认证中心有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛高创澳海创业投资企业（有限合伙）",
        "text": "青岛高创澳海创业投资企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "湖北海立美达汽车有限公司",
        "text": "湖北海立美达汽车有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "厦门市鑫融联合科技有限公司",
        "text": "厦门市鑫融联合科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "网联科技有限公司",
        "text": "网联科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "新余智科碳中和股权投资合伙企业（有限合伙）",
        "text": "新余智科碳中和股权投资合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "卡友支付服务有限公司",
        "text": "卡友支付服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "嘉兴砺行壹号股权投资合伙企业（有限合伙）",
        "text": "嘉兴砺行壹号股权投资合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "广东横琴海联科技投资有限公司",
        "text": "广东横琴海联科技投资有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛海联金汇汽车零部件有限公司",
        "text": "青岛海联金汇汽车零部件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "上海和达汽车配件有限公司",
        "text": "上海和达汽车配件有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "重庆中金同盛小额贷款有限公司",
        "text": "重庆中金同盛小额贷款有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "中金同盛商业保理有限公司",
        "text": "中金同盛商业保理有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "上海银联电子支付服务有限公司",
        "text": "上海银联电子支付服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "中金同盛数字科技有限公司",
        "text": "中金同盛数字科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "上海银联商务有限公司",
        "text": "上海银联商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "北京银联商务有限公司",
        "text": "北京银联商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "北京数字王府井科技有限公司",
        "text": "北京数字王府井科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "大连银安金融服务有限公司",
        "text": "大连银安金融服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "河北中瑞金融服务有限责任公司",
        "text": "河北中瑞金融服务有限责任公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "重庆银瑞昌益服务外包有限公司",
        "text": "重庆银瑞昌益服务外包有限公司"
    },
    {
        "itemStyle": {
            "color": "#91cc75",
            "borderColor": "#91cc75"
        },
        "id": "广东银联商务有限公司",
        "text": "广东银联商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "深圳市深银联易办事金融服务有限公司",
        "text": "深圳市深银联易办事金融服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "宁波银邦金融服务有限公司",
        "text": "宁波银邦金融服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "上海视通智融信息技术有限公司",
        "text": "上海视通智融信息技术有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "联动优势数字科技控股有限公司",
        "text": "联动优势数字科技控股有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "青岛海联金汇电机有限公司",
        "text": "青岛海联金汇电机有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "联动云通信科技（北京）有限公司",
        "text": "联动云通信科技（北京）有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "湖南海立美达钢板加工配送有限公司",
        "text": "湖南海立美达钢板加工配送有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "江苏盛世通钢铁供应链管理有限公司",
        "text": "江苏盛世通钢铁供应链管理有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "广东海联鑫汇供应链管理有限公司",
        "text": "广东海联鑫汇供应链管理有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "江西顺驰供应链管理有限公司",
        "text": "江西顺驰供应链管理有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "青岛海联金汇精密机械制造有限公司",
        "text": "青岛海联金汇精密机械制造有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "湖北海立田汽车部件有限公司",
        "text": "湖北海立田汽车部件有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "海联金汇新材料（长春）有限公司",
        "text": "海联金汇新材料（长春）有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "河北智维股权投资基金合伙企业（有限合伙）",
        "text": "河北智维股权投资基金合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "北京同润网络科技有限公司",
        "text": "北京同润网络科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "青岛泽优一期产业投资基金合伙企业（有限合伙）",
        "text": "青岛泽优一期产业投资基金合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "上海付费通电子商务有限公司",
        "text": "上海付费通电子商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#fac858",
            "borderColor": "#fac858"
        },
        "id": "上海付费通网络科技有限公司",
        "text": "上海付费通网络科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "联动优势电子商务有限公司",
        "text": "联动优势电子商务有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "海联金汇（北京）金融科技有限公司",
        "text": "海联金汇（北京）金融科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛联动优势信息服务有限公司",
        "text": "青岛联动优势信息服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "联动优势洲际（北京）科技有限公司",
        "text": "联动优势洲际（北京）科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "蜜小蜂智慧（北京）科技有限公司",
        "text": "蜜小蜂智慧（北京）科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "通卡联城网络科技有限公司",
        "text": "通卡联城网络科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "海南银商电子商务服务有限公司",
        "text": "海南银商电子商务服务有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "枣庄海联金汇汽车装备有限公司",
        "text": "枣庄海联金汇汽车装备有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "江西省通瑞电池制造有限公司",
        "text": "江西省通瑞电池制造有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛高创壹号产业投资基金合伙企业（有限合伙）",
        "text": "青岛高创壹号产业投资基金合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛瀛创科技投资中心（有限合伙）",
        "text": "青岛瀛创科技投资中心（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛高创产研科技成果转化投资基金合伙企业（有限合伙）",
        "text": "青岛高创产研科技成果转化投资基金合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛高创贰号产业投资基金合伙企业（有限合伙）",
        "text": "青岛高创贰号产业投资基金合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "中金支付有限公司",
        "text": "中金支付有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "北京中金国信科技有限公司",
        "text": "北京中金国信科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "中金金融科技（长沙）有限公司",
        "text": "中金金融科技（长沙）有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "重庆百行智能数据科技研究院有限公司",
        "text": "重庆百行智能数据科技研究院有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "鸿鑫数据服务股份有限公司",
        "text": "鸿鑫数据服务股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "天津国科量子科技有限公司",
        "text": "天津国科量子科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛海成慧车智能科技有限公司",
        "text": "青岛海成慧车智能科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛澳西智能科技有限公司",
        "text": "青岛澳西智能科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛科捷机器人有限公司",
        "text": "青岛科捷机器人有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛朗夫科技股份有限公司",
        "text": "青岛朗夫科技股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛丰光精密机械股份有限公司",
        "text": "青岛丰光精密机械股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "山东盛华新材料科技股份有限公司",
        "text": "山东盛华新材料科技股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "青岛智腾科技有限公司",
        "text": "青岛智腾科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "山东宝港国际港务股份有限公司",
        "text": "山东宝港国际港务股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "江苏芯长征微电子集团股份有限公司",
        "text": "江苏芯长征微电子集团股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "北京东方惠尔图像技术有限公司",
        "text": "北京东方惠尔图像技术有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "枣阳市海美房地产开发有限公司",
        "text": "枣阳市海美房地产开发有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "厦门市民数据服务股份有限公司",
        "text": "厦门市民数据服务股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "万事网联信息技术（北京）有限公司",
        "text": "万事网联信息技术（北京）有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "中鼎恒盛气体设备（芜湖）有限公司",
        "text": "中鼎恒盛气体设备（芜湖）有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "北京智行者科技股份有限公司",
        "text": "北京智行者科技股份有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "未势能源科技有限公司",
        "text": "未势能源科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "卡友金融服务（上海）有限公司",
        "text": "卡友金融服务（上海）有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "信付通（上海）投资有限公司",
        "text": "信付通（上海）投资有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "徕乾商业保理（上海）有限公司",
        "text": "徕乾商业保理（上海）有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "卡友商业保理（上海）有限公司",
        "text": "卡友商业保理（上海）有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "深圳华胜保理有限公司",
        "text": "深圳华胜保理有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "无锡砺行新动能股权投资合伙企业（有限合伙）",
        "text": "无锡砺行新动能股权投资合伙企业（有限合伙）"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "海立美达（珠海横琴）科技有限公司",
        "text": "海立美达（珠海横琴）科技有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "柳州市海联金汇汽车零部件有限公司",
        "text": "柳州市海联金汇汽车零部件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "保定海联金汇汽车零部件有限公司",
        "text": "保定海联金汇汽车零部件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "宁德和达汽车配件有限公司",
        "text": "宁德和达汽车配件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "梅州和达汽车配件有限公司",
        "text": "梅州和达汽车配件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "天津和达汽车配件有限公司",
        "text": "天津和达汽车配件有限公司"
    },
    {
        "itemStyle": {
            "color": "#ee6666",
            "borderColor": "#ee6666"
        },
        "id": "襄阳海联金汇永喆热冲压汽车零部件有限公司",
        "text": "襄阳海联金汇永喆热冲压汽车零部件有限公司"
    }
],
  "links":[
    {
        "from": "银联商务股份有限公司",
        "to": "重庆中金同盛小额贷款有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "广州银联网络支付有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "中金同盛商业保理有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "上海银联电子支付服务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "深圳市银联金融网络有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "中金同盛数字科技有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "上海银联商务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "北京银联商务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "北京数字王府井科技有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "宁波银联商务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "大连银安金融服务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "河北中瑞金融服务有限责任公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "厦门鑫融联电子商务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "重庆银瑞昌益服务外包有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "广东银联商务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "银视通信息科技有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "上海银商资讯有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "海联金汇科技股份有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "厦门易通卡运营有限责任公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "上海付费通信息服务有限公司",
        "value": 10
    },
    {
        "from": "银联商务股份有限公司",
        "to": "网联清算有限公司",
        "value": 10
    },
    {
        "from": "广州银联网络支付有限公司",
        "to": "深圳市深银联易办事金融服务有限公司",
        "value": 10
    },
    {
        "from": "广州银联网络支付有限公司",
        "to": "广东银联商务有限公司",
        "value": 10
    },
    {
        "from": "广州银联网络支付有限公司",
        "to": "中金金融认证中心有限公司",
        "value": 10
    },
    {
        "from": "广州银联网络支付有限公司",
        "to": "卡友支付服务有限公司",
        "value": 10
    },
    {
        "from": "深圳市银联金融网络有限公司",
        "to": "上海银商资讯有限公司",
        "value": 10
    },
    {
        "from": "宁波银联商务有限公司",
        "to": "宁波银邦金融服务有限公司",
        "value": 10
    },
    {
        "from": "厦门鑫融联电子商务有限公司",
        "to": "厦门市鑫融联合科技有限公司",
        "value": 10
    },
    {
        "from": "银视通信息科技有限公司",
        "to": "上海视通智融信息技术有限公司",
        "value": 10
    },
    {
        "from": "上海银商资讯有限公司",
        "to": "上海银商电子商务有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "联动优势科技有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "联动优势数字科技控股有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛海联金汇汽车零部件有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛海联金汇电机有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "联动云通信科技（北京）有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "上海和达汽车配件有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "湖南海立美达钢板加工配送有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "江苏盛世通钢铁供应链管理有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "广东海联鑫汇供应链管理有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "江西顺驰供应链管理有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛海立美达模具有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "广东横琴海联科技投资有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "上海海联金汇汽车零部件有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛海联金汇精密机械制造有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "湖北海立美达汽车有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "湖北海立田汽车部件有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "海联金汇新材料（长春）有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "河北智维股权投资基金合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "北京同润网络科技有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "新余智科碳中和股权投资合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛泽优一期产业投资基金合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛高创澳海股权投资管理有限公司",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "青岛高创澳海创业投资企业（有限合伙）",
        "value": 10
    },
    {
        "from": "海联金汇科技股份有限公司",
        "to": "嘉兴砺行壹号股权投资合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "厦门易通卡运营有限责任公司",
        "to": "苏州通卡联城投资管理有限公司",
        "value": 10
    },
    {
        "from": "上海付费通信息服务有限公司",
        "to": "上海付费通电子商务有限公司",
        "value": 10
    },
    {
        "from": "上海付费通信息服务有限公司",
        "to": "上海付费通网络科技有限公司",
        "value": 10
    },
    {
        "from": "上海付费通信息服务有限公司",
        "to": "网联清算有限公司",
        "value": 10
    },
    {
        "from": "网联清算有限公司",
        "to": "网联科技有限公司",
        "value": 10
    },
    {
        "from": "上海银商资讯有限公司",
        "to": "上海银商电子商务有限公司",
        "value": 10
    },
    {
        "from": "联动优势科技有限公司",
        "to": "联动优势电子商务有限公司",
        "value": 10
    },
    {
        "from": "联动优势科技有限公司",
        "to": "海联金汇（北京）金融科技有限公司",
        "value": 10
    },
    {
        "from": "联动优势科技有限公司",
        "to": "青岛联动优势信息服务有限公司",
        "value": 10
    },
    {
        "from": "联动优势科技有限公司",
        "to": "联动优势洲际（北京）科技有限公司",
        "value": 10
    },
    {
        "from": "联动优势科技有限公司",
        "to": "蜜小蜂智慧（北京）科技有限公司",
        "value": 10
    },
    {
        "from": "苏州通卡联城投资管理有限公司",
        "to": "通卡联城网络科技有限公司",
        "value": 10
    },
    {
        "from": "上海银商电子商务有限公司",
        "to": "海南银商电子商务服务有限公司",
        "value": 10
    },
    {
        "from": "青岛海立美达模具有限公司",
        "to": "枣庄海联金汇汽车装备有限公司",
        "value": 10
    },
    {
        "from": "上海海联金汇汽车零部件有限公司",
        "to": "江西省通瑞电池制造有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海股权投资管理有限公司",
        "to": "青岛高创壹号产业投资基金合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "青岛高创澳海股权投资管理有限公司",
        "to": "青岛泽优一期产业投资基金合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "青岛高创澳海股权投资管理有限公司",
        "to": "青岛高创澳海创业投资企业（有限合伙）",
        "value": 10
    },
    {
        "from": "青岛高创澳海股权投资管理有限公司",
        "to": "青岛瀛创科技投资中心（有限合伙）",
        "value": 10
    },
    {
        "from": "青岛高创澳海股权投资管理有限公司",
        "to": "青岛高创产研科技成果转化投资基金合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "青岛高创澳海股权投资管理有限公司",
        "to": "青岛高创贰号产业投资基金合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "中金金融认证中心有限公司",
        "to": "中金支付有限公司",
        "value": 10
    },
    {
        "from": "中金金融认证中心有限公司",
        "to": "北京中金国信科技有限公司",
        "value": 10
    },
    {
        "from": "中金金融认证中心有限公司",
        "to": "中金金融科技（长沙）有限公司",
        "value": 10
    },
    {
        "from": "中金金融认证中心有限公司",
        "to": "重庆百行智能数据科技研究院有限公司",
        "value": 10
    },
    {
        "from": "中金金融认证中心有限公司",
        "to": "鸿鑫数据服务股份有限公司",
        "value": 10
    },
    {
        "from": "中金金融认证中心有限公司",
        "to": "天津国科量子科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛海成慧车智能科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛澳西智能科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛科捷机器人有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛朗夫科技股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛丰光精密机械股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "山东盛华新材料科技股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛智腾科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "山东宝港国际港务股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "江苏芯长征微电子集团股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "北京东方惠尔图像技术有限公司",
        "value": 10
    },
    {
        "from": "网联清算有限公司",
        "to": "网联科技有限公司",
        "value": 10
    },
    {
        "from": "湖北海立美达汽车有限公司",
        "to": "枣阳市海美房地产开发有限公司",
        "value": 10
    },
    {
        "from": "厦门市鑫融联合科技有限公司",
        "to": "厦门市民数据服务股份有限公司",
        "value": 10
    },
    {
        "from": "网联科技有限公司",
        "to": "万事网联信息技术（北京）有限公司",
        "value": 10
    },
    {
        "from": "新余智科碳中和股权投资合伙企业（有限合伙）",
        "to": "中鼎恒盛气体设备（芜湖）有限公司",
        "value": 10
    },
    {
        "from": "新余智科碳中和股权投资合伙企业（有限合伙）",
        "to": "北京智行者科技股份有限公司",
        "value": 10
    },
    {
        "from": "新余智科碳中和股权投资合伙企业（有限合伙）",
        "to": "未势能源科技有限公司",
        "value": 10
    },
    {
        "from": "卡友支付服务有限公司",
        "to": "卡友金融服务（上海）有限公司",
        "value": 10
    },
    {
        "from": "卡友支付服务有限公司",
        "to": "信付通（上海）投资有限公司",
        "value": 10
    },
    {
        "from": "卡友支付服务有限公司",
        "to": "徕乾商业保理（上海）有限公司",
        "value": 10
    },
    {
        "from": "卡友支付服务有限公司",
        "to": "卡友商业保理（上海）有限公司",
        "value": 10
    },
    {
        "from": "卡友支付服务有限公司",
        "to": "深圳华胜保理有限公司",
        "value": 10
    },
    {
        "from": "嘉兴砺行壹号股权投资合伙企业（有限合伙）",
        "to": "无锡砺行新动能股权投资合伙企业（有限合伙）",
        "value": 10
    },
    {
        "from": "广东横琴海联科技投资有限公司",
        "to": "海立美达（珠海横琴）科技有限公司",
        "value": 10
    },
    {
        "from": "青岛海联金汇汽车零部件有限公司",
        "to": "柳州市海联金汇汽车零部件有限公司",
        "value": 10
    },
    {
        "from": "青岛海联金汇汽车零部件有限公司",
        "to": "保定海联金汇汽车零部件有限公司",
        "value": 10
    },
    {
        "from": "上海和达汽车配件有限公司",
        "to": "宁德和达汽车配件有限公司",
        "value": 10
    },
    {
        "from": "上海和达汽车配件有限公司",
        "to": "梅州和达汽车配件有限公司",
        "value": 10
    },
    {
        "from": "上海和达汽车配件有限公司",
        "to": "天津和达汽车配件有限公司",
        "value": 10
    },
    {
        "from": "上海和达汽车配件有限公司",
        "to": "襄阳海联金汇永喆热冲压汽车零部件有限公司",
        "value": 10
    },
    {
        "from": "中鼎恒盛气体设备（芜湖）有限公司",
        "to": "北京中鼎恒盛气体设备有限公司",
        "value": 10
    },
    {
        "from": "中鼎恒盛气体设备（芜湖）有限公司",
        "to": "中鼎恒盛能源装备（天津）有限公司",
        "value": 10
    },
    {
        "from": "中鼎恒盛气体设备（芜湖）有限公司",
        "to": "成都厚鼎氢能源装备有限公司",
        "value": 10
    },
    {
        "from": "徕乾商业保理（上海）有限公司",
        "to": "达乾金融信息服务（上海）有限公司",
        "value": 10
    },
    {
        "from": "徕乾商业保理（上海）有限公司",
        "to": "雅辉供应链科技（上海）有限公司",
        "value": 10
    },
    {
        "from": "徕乾商业保理（上海）有限公司",
        "to": "徕乾资产管理（上海）有限公司",
        "value": 10
    },
    {
        "from": "卡友金融服务（上海）有限公司",
        "to": "徕乾商业保理（上海）有限公司",
        "value": 10
    },
    {
        "from": "卡友金融服务（上海）有限公司",
        "to": "卡友商业保理（上海）有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "广东纵行科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "河北智行者科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "重庆兰德适普信息科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "湘潭智行者科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "武汉智行者科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "合肥智行者科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "禹州市智行者科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "广州智行者科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "中科大路（青岛）科技有限公司",
        "value": 10
    },
    {
        "from": "北京智行者科技股份有限公司",
        "to": "国汽朴津智能科技（安庆）有限公司",
        "value": 10
    },
    {
        "from": "上海银商电子商务有限公司",
        "to": "海南银商电子商务服务有限公司",
        "value": 10
    },
    {
        "from": "青岛科捷机器人有限公司",
        "to": "苏州科立捷智能装备有限公司",
        "value": 10
    },
    {
        "from": "青岛科捷机器人有限公司",
        "to": "青岛科捷智能服务机器人有限公司",
        "value": 10
    },
    {
        "from": "青岛科捷机器人有限公司",
        "to": "青岛科捷木业智能装备有限公司",
        "value": 10
    },
    {
        "from": "青岛科捷机器人有限公司",
        "to": "北京乾坤魔马智能科技有限公司",
        "value": 10
    },
    {
        "from": "山东盛华新材料科技股份有限公司",
        "to": "山东盛华科技创业园有限公司",
        "value": 10
    },
    {
        "from": "山东盛华新材料科技股份有限公司",
        "to": "烟台盛华液晶材料有限公司",
        "value": 10
    },
    {
        "from": "山东盛华新材料科技股份有限公司",
        "to": "山东华霖药业有限公司",
        "value": 10
    },
    {
        "from": "山东盛华新材料科技股份有限公司",
        "to": "山东盛华电子新材料有限公司",
        "value": 10
    },
    {
        "from": "山东盛华新材料科技股份有限公司",
        "to": "上海道客特新材料研究有限公司",
        "value": 10
    },
    {
        "from": "山东盛华新材料科技股份有限公司",
        "to": "莱阳市盛华电子材料有限公司",
        "value": 10
    },
    {
        "from": "山东宝港国际港务股份有限公司",
        "to": "山东金港港务有限公司",
        "value": 10
    },
    {
        "from": "山东宝港国际港务股份有限公司",
        "to": "山东中燃宝港能源发展有限公司",
        "value": 10
    },
    {
        "from": "联动优势电子商务有限公司",
        "to": "青岛中金卓越商业保理有限公司",
        "value": 10
    },
    {
        "from": "联动优势电子商务有限公司",
        "to": "上海联付信息科技有限公司",
        "value": 10
    },
    {
        "from": "联动优势电子商务有限公司",
        "to": "大川车城数字科技（杭州）有限公司",
        "value": 10
    },
    {
        "from": "联动优势电子商务有限公司",
        "to": "网联清算有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛海成慧车智能科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛澳西智能科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛科捷机器人有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛朗夫科技股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛丰光精密机械股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "山东盛华新材料科技股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "青岛智腾科技有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "山东宝港国际港务股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "江苏芯长征微电子集团股份有限公司",
        "value": 10
    },
    {
        "from": "青岛高创澳海创业投资企业（有限合伙）",
        "to": "北京东方惠尔图像技术有限公司",
        "value": 10
    },
    {
        "from": "江苏芯长征微电子集团股份有限公司",
        "to": "南京芯长征科技有限公司",
        "value": 10
    },
    {
        "from": "江苏芯长征微电子集团股份有限公司",
        "to": "江阴远征科技有限公司",
        "value": 10
    },
    {
        "from": "江苏芯长征微电子集团股份有限公司",
        "to": "芯长征微电子制造（山东）有限公司",
        "value": 10
    },
    {
        "from": "江苏芯长征微电子集团股份有限公司",
        "to": "深圳芯原力科技有限公司",
        "value": 10
    },
    {
        "from": "江苏芯长征微电子集团股份有限公司",
        "to": "山东阅芯电子科技有限公司",
        "value": 10
    },
    {
        "from": "江苏芯长征微电子集团股份有限公司",
        "to": "北京芯长征科技有限公司",
        "value": 10
    },
    {
        "from": "青岛智腾科技有限公司",
        "to": "青岛智腾微电子有限公司",
        "value": 10
    },
    {
        "from": "青岛智腾科技有限公司",
        "to": "厦门烽行光电科技有限公司",
        "value": 10
    },
    {
        "from": "重庆百行智能数据科技研究院有限公司",
        "to": "吉林省中吉金财科技研究院有限公司",
        "value": 10
    },
    {
        "from": "网联科技有限公司",
        "to": "万事网联信息技术（北京）有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "上燃能源科技江苏有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "上海燃料电池汽车动力系统有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "未势能源科技河北有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "上燃能源科技（天津）有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "上燃新能源科技唐山有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "未势能源科技（郑州）有限公司",
        "value": 10
    },
    {
        "from": "未势能源科技有限公司",
        "to": "天津立本能源科技有限公司",
        "value": 10
    },
    {
        "from": "青岛朗夫科技股份有限公司",
        "to": "青岛朗夫物流有限公司",
        "value": 10
    },
    {
        "from": "青岛朗夫科技股份有限公司",
        "to": "上海锦商天合投资有限公司",
        "value": 10
    },
    {
        "from": "青岛朗夫科技股份有限公司",
        "to": "青岛海丰朗夫供应链管理有限公司",
        "value": 10
    },
    {
        "from": "青岛朗夫科技股份有限公司",
        "to": "新疆新铁朗夫供应链有限公司",
        "value": 10
    },
    {
        "from": "青岛朗夫科技股份有限公司",
        "to": "青岛柏泰科技有限公司",
        "value": 10
    },
    {
        "from": "青岛瀛创科技投资中心（有限合伙）",
        "to": "浙江中科玖源新材料有限公司",
        "value": 10
    },
    {
        "from": "青岛瀛创科技投资中心（有限合伙）",
        "to": "垣矽技术（青岛）有限公司",
        "value": 10
    },
    {
        "from": "青岛瀛创科技投资中心（有限合伙）",
        "to": "青岛本原微电子有限公司",
        "value": 10
    },
    {
        "from": "青岛瀛创科技投资中心（有限合伙）",
        "to": "杭州云镓半导体科技有限公司",
        "value": 10
    },
    {
        "from": "信付通（上海）投资有限公司",
        "to": "上海宜数信息技术有限公司",
        "value": 10
    },
    {
        "from": "青岛高创产研科技成果转化投资基金合伙企业（有限合伙）",
        "to": "青岛中微创芯电子有限公司",
        "value": 10
    },
    {
        "from": "青岛高创产研科技成果转化投资基金合伙企业（有限合伙）",
        "to": "青岛本原微电子有限公司",
        "value": 10
    },
    {
        "from": "北京东方惠尔图像技术有限公司",
        "to": "青岛惠尔医疗科技有限公司",
        "value": 10
    },
    {
        "from": "北京东方惠尔图像技术有限公司",
        "to": "北京东方惠尔医疗科技有限公司",
        "value": 10
    }
]
}
      console.log(JSON.stringify(__graph_json_data))
      this.g_loading = false
      this.$refs.seeksRelationGraph.setJsonData(__graph_json_data, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
      })
    },
    onNodeExpand (node, e) {
      // 当有一些节点被显示或隐藏起来时，会让图谱看着很难看，需要布局器重新为节点分配位置，所以这里需要调用refresh方法来重新布局
      console.log('onNodeExpand:', node)
      this.$refs.seeksRelationGraph.refresh()
    },
    onChangeOptionByCase1 () {
      this.graphOptions.layouts[0].levelDistance = '' // 因为levelDistance的优先级高，所以想要让下面四个选项有效，则需要将levelDistance置空
      this.graphOptions.layouts[0].min_per_width = this.range_horizontal[0]
      this.graphOptions.layouts[0].max_per_width = this.range_horizontal[1]
      this.graphOptions.layouts[0].min_per_height = this.range_vertical[0]
      this.graphOptions.layouts[0].max_per_height = this.range_vertical[1]
      this.$refs.seeksRelationGraph.setOptions(this.graphOptions, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        console.log('setOptions:callback:', seeksRGGraph)
        // seeksRGGraph.refresh()
      })
    },
    onChangeOptionByCase2 () {
      this.graphOptions.layouts[0].levelDistance = this.levelDistance
      this.$refs.seeksRelationGraph.setOptions(this.graphOptions, (seeksRGGraph) => {
        // 这些写上当图谱初始化完成后需要执行的代码
        console.log('setOptions:callback:', seeksRGGraph)
        // seeksRGGraph.refresh()
      })
    },
    onTabAciveChange () {
      console.log('this.activeTabName:', this.activeTabName)
      if (this.activeTabName === 'case2') {
        this.onChangeOptionByCase2()
      } else {
        this.onChangeOptionByCase1()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.c-label {
  color: #666666;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
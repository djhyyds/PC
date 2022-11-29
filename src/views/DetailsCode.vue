<template>
  <div class="details">
    <h2>监测动态</h2>
    <hr />
    <div class="input">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
          <el-select
            style="width: 130px"
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
              <div @click="() => onItemClick(node, data)">
                <span>{{ data.label }}</span>
                <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
              </div>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="search"
            filterable
            clearable
            @change="onSearch"
            placeholder="请输入公司名称"
          >
            <el-option
              v-for="item in setOption"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="this.$store.state.show">
          <el-select
            v-model="search2"
            filterable
            clearable
            multiple
            style="width: 260px"
            collapse-tags
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
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="timestamp"
            :default-time="['00:00:00', '23:59:59']"
            @change="DateTime()"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <!-- 动态时间： -->
      <!-- <span @click="DateTime(86400)" :class="date == 86400 ? 'active' : ''"
          >今天</span
        > -->
      <!-- <span @click="DateTime(604800)" :class="date == 604800 ? 'active' : ''"
          >近7天</span
        >
        <span
          @click="DateTime(2592000)"
          :class="date == 2592000 ? 'active' : ''"
          >近30天</span
        > -->
    </div>
    <div class="content">
      <span>
        为你找到
        <span class="active">{{ tableCopeTableList.length }}</span> 条监测动态
      </span>
      &nbsp;
      <span>
        共涉及
        <span class="active">{{ setOption.length - 1 }}</span> 家企业
      </span>
      <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px"
        height="590px"
      >
        <el-table-column
          prop="日期"
          label="更新时间"
          width="150"
          align="center"
        ></el-table-column>
        <el-table-column label="监测主体" min-width="200" header-align="center">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false">{{
              scope.row["公司"]
            }}</el-link
            ><br />
            <!-- <el-link type="warning" :underline="false">历史监测动态</el-link> -->
          </template>
        </el-table-column>
        <el-table-column label="风险级别" min-width="80" align="center">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row['等级'] == '警示'"
              type="warning"
              :underline="false"
              >{{ scope.row["等级"] + "信息" }}</el-link
            >
            <el-link
              v-else-if="scope.row['等级'] == '利好'"
              type="success"
              :underline="false"
              >{{ scope.row["等级"] + "信息" }}</el-link
            >
            <el-link
              v-else-if="scope.row['等级'] == '高风险'"
              type="danger"
              :underline="false"
              >{{ scope.row["等级"] + "信息" }}</el-link
            >
            <span style="color: #aa77cc" v-else>{{
              scope.row["等级"] + "信息"
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="类型"
          label="动态类型"
          width="120"
        ></el-table-column>
        <el-table-column label="动态内容" min-width="200" header-align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.详情 }}</span>
            <!-- <el-link @click="open(scope.row.备注)" type="primary">详情</el-link> -->
          </template>
        </el-table-column>
        <el-table-column label="动态详情" min-width="200" header-align="center">
          <template slot-scope="scope">
            <span ref="bei">{{ bei(scope.row.备注) }}</span>
            <el-link
              v-if="scope.row.备注.length > 70"
              @click="open(scope.row.备注)"
              type="primary"
              >详情</el-link
            >
          </template>
        </el-table-column>

        <el-table-column
          prop="分组"
          label="监测分组"
          width="120"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="tableCopeTableList.length"
    ></el-pagination>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>{{ diaText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
function findAllParent (node) {
  if (node.parent) {
    const arr = findAllParent(node.parent)
    arr.push(node.data.value)
    return arr
  } else {
    return [node.value]
  }
}
const filter = (a, b, c, d, e, f, data) => {
  return data.filter(item => {
    let bool = true
    let bool2 = true
    let bool3 = true
    let bool4 = true
    let bool5 = true
    let bool6 = true
    let bool7 = true
    if (a) {
      bool = item.等级 === a
    }
    if (b) {
      bool2 = item.类型 === b
    }
    if (c) {
      bool3 = item.风险维度 === c
    }
    if (d && d != '全部') {
      bool4 = item.公司 === d
    }
    if (e) {
      bool5 = item.时间戳 * 1000 >= e[0] && item.时间戳 * 1000 <= e[1]
    }
    console.log(e, 'eeeeeeeeee')
    if (f.length != 0 && f.indexOf('全部') == -1) {

      bool6 = f.find(a => a == item.分组)

    }
    return bool && bool2 && bool3 && bool4 && bool5 && bool6 && bool7
  })
}
export default {
  data () {
    return {

      value2: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(1669629600000 - 3600 * 1000 * 24 * 7)

            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(1669629600000 - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      diaText: '', dialogVisible: false,
      date: this.$store.state.date,
      setOption: ['全部'],
      setOption2: this.$store.state.setOption,
      search2: this.$store.state.search,
      search: "",
      input: "",
      formInline: {
        region: ""
      },
      value: "",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "司法风险",
          label: "司法风险",
          children: [
            // { label: "全部", value: "司法风险" },
            { label: "法律诉讼", value: "法律诉讼" },
            { label: "法院公告", value: "法院公告" },
            { label: "失信被执行人", value: "失信被执行人" },
            { label: "被执行人", value: "被执行人" },
            { label: "开庭公告", value: "开庭公告" },
            { label: "司法协助", value: "司法协助" },
            { label: "送达公告", value: "送达公告" },
            { label: "立案信息", value: "立案信息" },
            { label: "限制消费令", value: "限制消费令" },
            { label: "终本案件", value: "终本案件" },
            { label: "涉金融黑名单", value: "涉金融黑名单" },
            { label: "破产重整", value: "破产重整" },
            { label: "询价评估", value: "询价评估" }
          ]
        },
        {
          label: "工商风险",
          value: "工商风险",
          children: [
            // { label: " 全部", value: "工商风险" },
            { label: "股权变更", value: "股权变更" },
            { label: "股权信息", value: "股权信息" },
            { label: "股东变更", value: "股东变更" },
            { label: "大股东变更", value: "大股东变更" },
            { label: "主要人员变更", value: "主要人员变更" },
            { label: "任职信息", value: "任职信息" },
            { label: "企业状态变更", value: "企业状态变更" },
            { label: "企业类型变更", value: "企业类型变更" },
            { label: "法定代表人变更", value: "法定代表人变更" },
            { label: "企业名称变更", value: "企业名称变更" },
            { label: "注册资本变更", value: "注册资本变更" },
            { label: "登记机关变更", value: "登记机关变更" },
            { label: "注册地址变更", value: "注册地址变更" },
            { label: "经营范围变更", value: "经营范围变更" },
            { label: "机构成员", value: "机构成员" }
          ]
        },
        {
          label: "经营风险",
          value: "经营风险",
          children: [
            // { label: "全部", value: "经营风险" },
            { label: "经营异常", value: "经营异常" },
            { label: "严重违法", value: "严重违法" },
            { label: "股权出质", value: "股权出质" },
            { label: "动产抵押", value: "动产抵押" },
            { label: "欠税公告", value: "欠税公告" },
            { label: "司法拍卖", value: "司法拍卖" },
            { label: "清算信息", value: "清算信息" },
            { label: "税收违法", value: "税收违法" },
            { label: "简易注销", value: "简易注销" },
            { label: "行政处罚", value: "行政处罚" },
            { label: "环保处罚", value: "环保处罚" },
            { label: "公示催告", value: "公示催告" },
            { label: "土地抵押", value: "土地抵押" },
            { label: "股权质押", value: "股权质押" },
            { label: "股权冻结", value: "股权冻结" },
            { label: "注销备案", value: "注销备案" },
            { label: "管理基金", value: "管理基金" }
          ]
        },
        {
          label: "经营状况",
          value: "经营状况",
          children: [
            // { label: "全部", value: "经营状况" },
            { label: "投融资动态", value: "投融资动态" },
            { label: "招投标", value: "招投标" },
            { label: "债券信息", value: "债券信息" },
            { label: "商标信息", value: "商标信息" },
            { label: "专利信息", value: "专利信息" },
            { label: "软件著作权", value: "软件著作权" },
            { label: "购地信息", value: "购地信息" },
            { label: "税务评级", value: "税务评级" },
            { label: "抽查检查", value: "抽查检查" },
            { label: "产品信息", value: "产品信息" },
            { label: "进出口信用", value: "进出口信用" },
            { label: "知识产权", value: "知识产权" },
            { label: "土地转让", value: "土地转让" },
            { label: "地块公示", value: "地块公示" },
            { label: "行政许可", value: "行政许可" },
            { label: "电信许可", value: "电信许可" },
            { label: "一般纳税人", value: "一般纳税人" },
            { label: "产品召回", value: "产品召回" },
            { label: "上榜榜单", value: "上榜榜单" },
            { label: "食品安全", value: "食品安全" },
            { label: "客户供应商", value: "客户供应商" },
            { label: "信用评级", value: "信用评级" },
            { label: "公告研报", value: "公告研报" },
            { label: "资产交易", value: "资产交易" }
          ]
        }
      ],
      tableData: [],
      tableCopeTableList: [],
      pageSize: 10,
      currentPage: 1,
      risk: "",
      res: "",
      result: "",
      showBei: false
    }
  },
  methods: {
    bei (a) {
      if (a.length > 70) {
        this.showBei = true
        return a.substr(0, 70) + '...'
      } return a
    },
    handleClose () {
      this.dialogVisible = false
    },
    open (a) {
      this.dialogVisible = true
      this.diaText = a
    },
    DateTime () {

      // this.$store.commit("DateChange", a)
      // this.date = this.$store.state.date
      this.into()
    },
    onItemClick (node) {

      this.$refs.myCascadeRef.dropDownVisible = false
      // 级联组件选中之后，默认的选中值为数组，这里我们也和组件保持一致，不然，选中值就可能出现两种情况，一种是自己的设置的非数组值，一种是组件自行设置的数组值
      this.value = findAllParent(node)


      this.into()
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.tableData = this.currentChangePage(pageSize, this.currentPage)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.tableData = this.currentChangePage(this.pageSize, currentPage)
    },
    //分页方法
    currentChangePage (size, current) {
      const tablePush = []
      this.tableCopeTableList.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item)
        }
      })
      return tablePush
    },
    onSubmit () {
      this.currentPage = 1
      this.into()
    },
    into () {

      this.currentPage = 1
      this.setOption = ['全部']
      // this.setOption2 = ['全部']
      this.risk = this.formInline.region
      let b, c


      if (Array.isArray(this.value)) {
        if (this.value.length == 1) {
          c = this.value[0]
        } else {
          b = this.value[1]
        }
      } else {
        c = this.value
      }

      this.tableCopeTableList = filter(
        this.risk,
        b,
        c,
        this.search,
        this.value2,
        this.search2,
        this.res
      )
      this.tableData = this.currentChangePage(this.pageSize, this.currentPage)
      this.tableCopeTableList.forEach(item => {
        if (this.setOption.indexOf(item.公司) == -1) {
          this.setOption.push(item.公司)
        }
        // if (this.setOption2.indexOf(item.分组) == -1) {
        //   this.setOption2.push(item.分组)
        // }
      })

    },

    onSearch () {
      if (this.search2[this.search2.length - 1] == '全部' || this.search2.length == 0) {
        this.search2 = ['全部']
      } else {
        this.search2 = this.search2.filter(item => item != '全部')
      }
      this.$store.commit("SearchChange", this.search2)
      this.into()
    }
  },
  created () {

    this.res = this.$store.state.res
    this.formInline.region = this.$route.params.a
    if (this.$route.params.GSname) {
      this.search = this.$route.params.GSname
    }
    if (this.$route.params.type) {
      this.search2 = [this.$route.params.type]
    }
    if (this.$route.params.name) {
      this.value = [0, this.$route.params.name]
    } else if (this.$route.params.b) {
      this.value = this.$route.params.b
    }
    if (this.date == 2592000) {
      this.value2 = [this.$store.state.nowDate - 30 * 86400000, this.$store.state.nowDate]
    } else {
      this.value2 = [this.$store.state.nowDate - 7 * 86400000, this.$store.state.nowDate]
    }
    this.into()


  },
  beforeMount () {

    this.tableData = this.currentChangePage(this.pageSize, this.currentPage)
  },
  mounted () {

  }
};
</script>
<style  lang='less'>
.el-radio {
  display: none !important;
}
.details {
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
  .content {
    span {
      font-size: 14px;
      .active {
        color: red;
      }
    }
  }
  .el-pagination {
    margin-top: 20px;
    float: right;
  }
}
</style>
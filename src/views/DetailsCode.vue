<template>
  <div class="details">
    <h3>监控动态</h3>
    <hr />
    <div class="input">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item>
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
            clearable
            :show-all-levels="false"
            :props="{ checkStrictly: true, expandTrigger: 'hover' }"
            popper-class="myCascade"
            filterable
            ref="myCascadeRef"
          >
            <template slot-scope="{ node, data }">
              <div @click="()=>onItemClick(node,data)">
                <span>{{ data.label }}</span>
                <!-- <span v-if="!node.isLeaf">({{ data.children.length }})</span> -->
              </div>
            </template>
          </el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入公司名称" v-model="input" @change="onSearch" clearable></el-input>
        </el-form-item>
      </el-form>
      <div>
        动态时间：
        <span>今天</span>
        <span>近7天</span>
        <span>近30天</span>
      </div>
    </div>
    <div class="content">
      <span>
        为你找到
        <span class="active">{{tableCopeTableList.length}}</span> 条监控动态
      </span>
      <el-table :data="tableData" border style="width: 100%;margin-top:20px" height="590px">
        <el-table-column fixed label="监控主体" min-width="200" header-align="center">
          <template slot-scope="scope">
            <el-link type="primary" :underline="false">{{ scope.row['公司']}}</el-link>
            <el-link type="warning" :underline="false">历史监控动态</el-link>
          </template>
        </el-table-column>
        <el-table-column label="风险级别" min-width="80" align="center">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row['等级']=='警示'"
              type="warning"
              :underline="false"
            >{{ scope.row['等级']+'信息'}}</el-link>
            <el-link
              v-else-if="scope.row['等级']=='利好'"
              type="success"
              :underline="false"
            >{{ scope.row['等级']+'信息'}}</el-link>
            <el-link
              v-else-if="scope.row['等级']=='高风险'"
              type="danger"
              :underline="false"
            >{{ scope.row['等级']+'信息'}}</el-link>
            <span style="color:#AA77CC;" v-else>{{ scope.row['等级']+'信息'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="类型" label="动态类型" width="120"></el-table-column>
        <el-table-column label="动态内容" prop="详情" min-width="400" header-align="center">
          <!-- <template slot-scope="scope">
            <el-popover
              placement="top-start"
              title="标题"
              width="200"
              trigger="hover"
              :content="scope.row.详情"
            >
              <span slot="reference">{{scope.row.详情}}</span>
            </el-popover>
          </template>-->
        </el-table-column>
        <el-table-column prop="日期" label="更新时间" width="150" align="center"></el-table-column>
        <el-table-column prop="分组" label="监控分组" width="120" align="center"></el-table-column>
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
  </div>
</template>

<script>
function findAllParent(node) {
  if (node.parent) {
    const arr = findAllParent(node.parent);
    arr.push(node.data.value);
    return arr;
  } else {
    return [node.data.value];
  }
}
function filter(a, b, c, data) {
  console.log(data, a);
  return data.filter(item => {
    let bool = true;
    let bool2 = true;
    let bool3 = true;
    if (a) {
      bool = item.等级 === a;
    }
    if (b) {
      bool2 = item.类型 === b;
    }
    if (c) {
      bool3 = item.风险维度 === c;
    }
    return bool && bool2 && bool3;
  });
}
export default {
  data() {
    return {
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
      pageSize: 8,
      currentPage: 1,
      risk: "",
      res: "",
      result: ""
    };
  },
  methods: {
    onItemClick(node, data) {
      console.log(node, data);
      this.$refs.myCascadeRef.dropDownVisible = false;
      // 级联组件选中之后，默认的选中值为数组，这里我们也和组件保持一致，不然，选中值就可能出现两种情况，一种是自己的设置的非数组值，一种是组件自行设置的数组值
      this.value = findAllParent(node);
      console.log(this.value);
      // let res2 = this.res;
      // if (node.level == 1) {
      //   if (this.value[0] == "total") {
      //     this.tableCopeTableList = this.res2;
      //   } else {
      //     this.tableCopeTableList = res2.filter(
      //       item => item["风险维度"] == node.value
      //     );
      //   }
      // } else {
      //   this.tableCopeTableList = res2.filter(
      //     item => item["类型"] == node.value
      //   );
      // }
      this.into();
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.tableData = this.currentChangePage(pageSize, this.currentPage);
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.tableData = this.currentChangePage(this.pageSize, currentPage);
    },
    //分页方法
    currentChangePage(size, current) {
      const tablePush = [];
      this.tableCopeTableList.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      });
      return tablePush;
    },
    onSubmit() {
      this.into();
    },
    into() {
      // if (this.value.length == 1) {
      //   this.res = this.res.filter(item => item["风险维度"] == this.value[0]);
      // } else if (this.value.length == 2) {
      //   this.res = this.res.filter(item => item["类型"] == this.value[1]);
      // }
      // if (this.risk == "total") {
      //   this.tableCopeTableList = this.res;
      // } else {
      //   if (this.result == "等级") this.formInline.region = this.risk;
      //   this.tableCopeTableList = this.res.filter(
      //     item => item[this.result] == this.risk
      //   );
      // }
      this.risk = this.formInline.region;
      let b, c;
      if (Array.isArray(this.value)) {
        if (this.value.length == 1) {
          c = this.value[0];
        } else {
          b = this.value[1];
        }
      } else {
        c = this.value;
      }

      this.tableCopeTableList = filter(this.risk, b, c, this.res);
      this.tableData = this.currentChangePage(this.pageSize, this.currentPage);
      console.log(this.tableCopeTableList);
    },
    fuzzySearch(list, search) {
      let data = [];
      if (list.length != 0 && search) {
        let str = `\S*${search}\S*`;
        let reg = new RegExp(str);
        list.map(item => {
          if (reg.test(item["公司"])) {
            data.push(item);
          }
        });
      }
      this.tableCopeTableList = data;
      this.tableData = this.currentChangePage(this.pageSize, this.currentPage);
    },
    onSearch(val) {
      if (!val) {
        this.tableCopeTableList = this.res;
        this.tableData = this.currentChangePage(
          this.pageSize,
          this.currentPage
        );
        return;
      }
      this.fuzzySearch(this.res, val);
    }
  },
  created() {
    this.res = this.$store.state.res;
    this.formInline.region = this.$route.params.a;
    this.value = this.$route.params.b;
    console.log(this.value, "value");
    // this.result = this.$route.params.result;
    this.into();
  },
  beforeMount() {
    // if(this.risk=='')
    // this.tableCopeTableList = this.$store.state.res;
    this.tableData = this.currentChangePage(this.pageSize, this.currentPage);
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
      span {
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
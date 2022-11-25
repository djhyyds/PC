<template>
  <div class="Monitoring-list">
    <h2>监测列表</h2>
    <hr />
    <div class="input">
      <!-- <el-select
        v-model="search2"
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
      </el-select> -->
      <div class="btn">
        <button
          :class="setOption2.find((a) => a == item[0]) ? 'active' : ''"
          @click="btnClick(item)"
          size="mini"
          v-for="(item, index) in sum"
          :key="index"
        >
          {{ item[0] + "(" + item[1] + ")" }}
        </button>
      </div>
      <el-select
        style="width: 300px; margin-top: 10px"
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
    </div>
    <div class="content">
      <div class="title">
        已监测
        <span class="active">{{ tableData.length }}</span> 家企业
      </div>
      <el-table
        :data="tableList"
        border
        style="width: 100%; margin-top: 20px"
        height="700px"
      >
        <el-table-column label="企业名称" min-width="150" header-align="center">
          <template slot-scope="scope">
            <div class="name">
              <el-link type="primary" :underline="false">{{
                scope.row["企业名称"]
              }}</el-link>
              <el-link
                type="warning"
                :underline="false"
                @click="jump(scope.row['企业名称'], scope.row['监测分组'])"
                >查看历史监测动态></el-link
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="监测时间"
          label="监测时间"
          min-width="50"
          align="center"
        ></el-table-column>
        <el-table-column label="监测分组" min-width="70" align="center"
          ><template slot-scope="scope">
            <span class="type" @click="jump('', scope.row['监测分组'])">{{
              scope.row["监测分组"]
            }}</span>
          </template></el-table-column
        >
      </el-table>
    </div>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="tableData.length"
    ></el-pagination>
  </div>
</template>

<script>


export default {
  data () {
    return {
      tableData: [],
      tableList: [],
      pageSize: 14,
      currentPage: 1,
      search2: '',
      search: '',
      res: this.$store.state.sumList,
      setOption2: [],
      setOption: ['全部'],
      sum: this.$store.state.sum
    }
  },
  methods: {
    jump (a, b) {
      this.$router.push({
        name: 'details', params: {
          GSname: a,
          type: b
        }
      })


    },
    btnClick (a) {
      if (a[0] == 'ALL') {
        this.setOption2 = ['ALL']
      } else {
        this.setOption2 = this.setOption2.filter(item => item != 'ALL')
        if (this.setOption2.indexOf(a[0]) != -1) { this.setOption2 = this.setOption2.filter(item => item != a[0]) } else {
          this.setOption2.push(a[0])
        }
      }
      this.onSearch()
    },
    onSearch () {
      this.setOption = ['全部']
      this.tableData = this.res
      this.tableData = this.tableData.filter(item => {
        let a = true, b = true
        if (this.setOption2.length != 0 && this.setOption2.indexOf('ALL') == -1) {
          b = this.setOption2.find(a => a == item.监测分组)
        }
        if (this.search && this.search != '全部') {
          a = item.企业名称 == this.search
        }

        return a && b
      })
      console.log(this.tableData, this.setOption2)
      this.tableData.forEach(item => {
        if (this.setOption.indexOf(item.企业名称) == -1) {
          this.setOption.push(item.企业名称)
        }
      })
      this.currentPage = 1
      this.tableList = this.currentChangePage(this.pageSize, this.currentPage)
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.tableList = this.currentChangePage(pageSize, this.currentPage)
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.tableList = this.currentChangePage(this.pageSize, currentPage)
    },
    //分页方法
    currentChangePage (size, current) {
      const tablePush = []
      this.tableData.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item)
        }
      })
      return tablePush
    },
  },
  created () {
    this.sum = this.sum.sort((a, b) => b[1] - a[1])
    // this.res = res.filter(item => {
    //   return this.$store.state.ECres.some(a => a.group === item.监测分组)
    // })


    this.tableData = this.res
    this.tableList = this.currentChangePage(this.pageSize, this.currentPage)
    this.tableData.forEach(item => {
      if (this.setOption.indexOf(item.企业名称) == -1) {
        this.setOption.push(item.企业名称)
      }
    })
  }
}
</script>

<style lang='less' scoped>
.type {
  cursor: pointer;
  color: rgb(0, 123, 255);
}
.input {
  .btn {
    display: flex;
    flex-wrap: wrap;
    width: 900px;
    .active {
      color: #409eff;
      border-color: #c6e2ff;
      background-color: #ecf5ff;
    }
    button {
      font-size: 12px;
      border-radius: 3px;
      padding: 7px 15px;
      margin: 5px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      transition: 0.1s;
      font-weight: 500;
    }
  }
  display: flex;
  flex-direction: column;
  margin: 20px;
  .el-select {
    margin-right: 10px;
  }
}
.name {
  padding: 0 10px;
  display: flex;
  align-content: center;
  justify-content: space-between;
}
.content {
  .title {
    margin-top: 20px;
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
</style>
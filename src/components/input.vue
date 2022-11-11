<template>
  <div class="input">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
      <el-form-item>
        <el-select v-model="search2" filterable clearable @change="onSearch" placeholder="请选择分组">
          <el-option v-for="item in setOption2" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div>
      动态时间：
      <span @click="DateTime(691200)" :class="date==691200?'active':''">近7天</span>
      <span @click="DateTime(2592000)" :class="date==2592000?'active':''">近30天</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
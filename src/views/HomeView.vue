<template>
  <div class="home">
    <el-container style="border: 1px solid #eee;height:100%">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1">
          <el-submenu index="0">
            <template slot="title">
              <span>风险监测</span>
            </template>
            <el-menu-item index="1" @click="$router.push({path:'/about'})">风险级别</el-menu-item>
            <el-menu-item index="2" @click="$router.push({path:'/risk'})">风险维度</el-menu-item>
            <el-menu-item index="3" @click="$router.push({name:'details',params:{a:''}})">监控动态</el-menu-item>
          </el-submenu>
          <el-menu-item index="4" @click="$router.push({path:'/gu'})">股权穿透</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style>
.home {
  width: 70%;
  height: 900px;
  margin: 0 auto;
}
</style>
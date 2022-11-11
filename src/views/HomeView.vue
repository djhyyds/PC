<template>
  <div class="home" style="padding:20px">
    <h1>风险情报系统</h1>
    <el-button class="stop" @click="stop">退出</el-button>
    <el-container style="border: 1px solid #eee;height:100%">
      <el-aside width="12%" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="1">
          <el-submenu index="0">
            <template slot="title">
              <span>风险监测</span>
            </template>
            <el-menu-item index="1" @click="$router.push({path:'/about'})">风险级别</el-menu-item>
            <el-menu-item index="2" @click="$router.push({path:'/risk'})">风险维度</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" @click="$router.push({name:'details',params:{a:''}})">监控动态</el-menu-item>
          <!-- <el-menu-item index="4" @click="$router.push({path:'/gu'})">股权穿透</el-menu-item> -->
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
export default {
  methods: {
    stop() {
      this.$router.replace({ name: "login" });
    }
  }
};
</script>
<style lang='less'>
.home {
 
  .stop {
    position: absolute;
    top: 30px;
    right: 120px;
  }
  width: 90%;
  height: 900px;
  margin: 0 auto;
}
</style>
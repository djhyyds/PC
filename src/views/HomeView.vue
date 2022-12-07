<template>
  <div class="home">
    <el-container style="border: 1px solid #eee; height: 100%">
      <el-aside width="10%" style="background-color: rgb(238, 241, 246); overflow: hidden">
        <el-menu :default-active="$route.name">
          <el-submenu index="0">
            <template slot="title">
              <span>风险监测</span>
            </template>
            <el-menu-item index="about" @click="$router.push({ name: 'about' })">风险级别</el-menu-item>
            <el-menu-item index="risk" @click="$router.push({ name: 'risk' })">风险维度</el-menu-item>
            <el-menu-item
              index="details"
              @click="$router.push({ name: 'details', params: { a: '' } })"
            >监测动态</el-menu-item>
            <el-menu-item index="list" @click="$router.push({ name: 'list' })">监测列表</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="gu" @click="$router.push({ path: 'gu' })">股权穿透</el-menu-item>
          <el-menu-item index="big" @click="$router.push({ path: '/big' })">数字化大屏</el-menu-item>
          <el-menu-item index="gu2" @click="$router.push({ path: 'gu2' })">股权穿透2</el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-container>
        <el-main style="height:100%" class="backtop">
          <el-backtop target=".backtop" :visibility-height="100" :bottom="100">
            <div
              style="{             
       height:100px;
       width:100px;
        background-color: #f2f2f2;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 15px;
        color: #1989fa;
        padding-bottom:5px;
      }"
            >
              <i class="el-icon-caret-top" style="font-size:30px;"></i>
              <div style="font-size:8px;">顶部</div>
            </div>
          </el-backtop>
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
  overflow: hidden;
  width: 100vw;
  height: 900px;
  margin: 0 auto;
}
</style>
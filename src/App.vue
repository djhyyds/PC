<template>
  <div
    id="app"
    style="background-color: #03050c"
    v-if="this.$route.name == 'big'"
  >
    <router-view></router-view>
  </div>
  <div id="app" v-else>
    <router-view></router-view>
  </div>
  <!-- <div>
    <chart-svg></chart-svg>
  </div> -->
</template>

<script>
import ChartSvg from './views/chart-svg.vue'
export default {
  name: "app",
  components: {
    ChartSvg
  },

};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  width: 100vw;
  height: 100vh;
}
</style>

<template>
  <div v-if="show">
    <div id="app" style="background-color: #03050c" v-if="this.$route.name == 'big'">
      <router-view></router-view>
    </div>
    <div id="app" v-else>
      <router-view></router-view>
    </div>
  </div>
  <!-- <div>
    <chart-svg></chart-svg>
  </div>-->
</template>

<script>
import ChartSvg from "./views/chart-svg.vue";
import axios from "axios";

export default {
  data() {
    return {
      show: true
    };
  },
  name: "app",
  components: {
    ChartSvg
  },

  // async created() {
  //   let name = "ALL";
  //   let type = "all";
  //   this.$store.commit("showChange");

  //   // let name = "采购-ALL";
  //   // let type = "cg";

  //   // let name = "供应链管理";
  //   // let type = "gyl";
  //   // let env = "/gyl";

  //   // let name = "人法动态";
  //   //  let type ='rf'

  //   // let name = "数科-教育场景";
  //   // let type = "sk";

  //   // let name = "投后-ALL";
  //   // let type = "th";
  //   let env = process.env.NODE_ENV == "productionDwp" ? "/" + type : "";
  //   const res = await axios.get(
  //     env + "/jsonData/" + type + "Data/web_info_" + name + ".json"
  //   );
  //   const ECres = await axios.get(
  //     env + "/jsonData/" + type + "Data/web_data_" + name + ".json"
  //   );
  //   const sum = await axios.get(
  //     env + "/jsonData/" + type + "Data/list_" + name + "_add.json"
  //   );
  //   const sumList = await axios.get(
  //     env + "/jsonData/" + type + "Data/list_" + name + "_one_add.json"
  //   );
  //   this.$store.commit("resChange", {
  //     res: res.data,
  //     ECres: ECres.data,
  //     sum: sum.data,
  //     sumList: sumList.data
  //   });
  //   this.show = true;
  // }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>

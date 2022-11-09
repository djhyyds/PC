<template>
  <div :id="uuid" :style="style"></div>
</template>
<script>
const idGen = () => {
  return new Date().getTime();
};
import * as echarts from "echarts";
export default {
  props: {
    width: {
      type: String,
      default: "600px"
    },
    height: {
      type: String,
      default: "400px"
    },
    options: {
      type: Object,
      default: null
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      };
    }
  },
  data() {
    return {
      uuid: null,
      myChart: null
    };
  },
  created() {
    this.uuid = idGen();
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById(this.uuid));
    this.myChart.setOption(this.options);
  },
  watch: {
    width() {
      if (this.myChart) {
        this.myChart.resize({
          animation: {
            duration: 300
          }
        });
      }
    },
    options() {
      if (this.myChart) {
        this.myChart.setOption(this.options, {
          notMerge: true
        });
      }
    }
  }
};
</script>

<style>
</style>
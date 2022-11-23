<template>
  <div

    class="left_boottom_wrap beautify-scroll-def"
    :class="{ 'overflow-y-auto': !sbtxSwiperFlag }"
  >
    <component :is="components" :data="list" :class-option="defaultOption">
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in list" :key="i">
          <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">公司名称：</span>
                <span class="contents zhuyao doudong wangguan">
                  {{ item.公司 }}</span
                >
              </div>
              <div class="info">
                <span class="labels">时间：</span>
                <span class="contents" style="font-size: 12px">
                  {{ item.日期 }}</span
                >
              </div>
            </div>

            <span class="types doudong typeRed">{{ item.风险等级 }}</span>

            <div class="info addresswrap">
              <span class="labels">详情：</span>
              <span class="contents ciyao" style="font-size: 12px">
                {{ item.详情 }}</span
              >
            </div>
          </div>
        </li>
      </ul>
    </component>
  </div>

  <!-- <Reacquire v-else @onclick="getData" style="line-height: 200px" /> -->
</template>

<script>

import vueSeamlessScroll from "vue-seamless-scroll" // vue2引入方式
import Kong from "../components/kong.vue"
export default {
  components: { vueSeamlessScroll, Kong },
  data () {
    return {
      list: [],
      pageflag: true,
      components: vueSeamlessScroll,
      defaultOption: {
        ...this.$store.state.settings.defaultOption,
        singleHeight: 240,
        limitMoveNum: 5,
        step: 0,
      },
    }
  },
  computed: {
    sbtxSwiperFlag () {
      let sbtxSwiper = this.$store.state.settings.sbtxSwiper
      if (sbtxSwiper) {
        this.components = vueSeamlessScroll
      } else {
        this.components = Kong
      }
      return sbtxSwiper
    },
  },
  created () {
    this.getData()
  },

  mounted () { },
  methods: {
    // addressHandle (item) {
    //   let name = item.provinceName
    //   if (item.cityName) {
    //     name += "/" + item.cityName
    //     if (item.countyName) {
    //       name += "/" + item.countyName
    //     }
    //   }
    //   return name
    // },
    getData () {
          this.list = [{ 公司: '丁氏集团', 日期: "2022.11.15", 风险等级: '高风险', 详情: '破产重组' }, { 公司: '丁氏集团', 日期: "2022.11.15", 风险等级: '高风险', 详情: '破产重组' }, { 公司: '丁氏集团', 日期: "2022.11.15", 风险等级: '高风险', 详情: '破产重组' }, { 公司: '丁氏集团', 日期: "2022.11.15", 风险等级: '高风险', 详情: '破产重组' }, { 公司: '丁氏集团', 日期: "2022.11.15", 风险等级: '高风险', 详情: '破产重组' }, { 公司: '丁氏集团', 日期: "2022.11.15", 风险等级: '高风险', 详情: '破产重组' }]
          let timer = setTimeout(() => {
            clearTimeout(timer)
            this.defaultOption.step =
              this.$store.state.settings.defaultOption.step
          }, this.$store.state.settings.defaultOption.waitTime)
        } 
      
    },
  
};
</script>
<style lang='scss' scoped>
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.doudong {
  //  vertical-align:middle;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    font-size: 14px;
    margin: 10px 0;
    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #fff;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        // color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 380px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("../../../assets/bigScreen/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }
      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 50px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
</style>
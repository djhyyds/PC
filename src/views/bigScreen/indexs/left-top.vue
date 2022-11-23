<template>
  <ul class="user_Overview flex" >
    <li class="user_Overview-item" style="color: #00fdfa">
      <div class="user_Overview_nums allnum ">
        <dv-digital-flop :config="config" style="width:100%;height:100%;" />
      </div>
      <p>提示信息</p>
    </li>
    <li class="user_Overview-item" style="color: #07f7a8">
      <div class="user_Overview_nums online">
        <dv-digital-flop :config="onlineconfig" style="width:100%;height:100%;" />
      </div>
      <p>利好信息</p>
    </li>
    <li class="user_Overview-item" style="color: #e3b337">
      <div class="user_Overview_nums offline">
        <dv-digital-flop :config="offlineconfig" style="width:100%;height:100%;" />

      </div>
      <p>警示信息</p>
    </li>
    <li class="user_Overview-item" style="color: #f5023d">
      <div class="user_Overview_nums laramnum">
        <dv-digital-flop :config="laramnumconfig" style="width:100%;height:100%;" />
      </div>
      <p>高风险信息</p>
    </li>
  </ul>

</template>

<script>

  let style = {
    fontSize: 24
  }
  export default {
    data() {
      return {
        // 设备列表
        deviceList: [],
        // 设备统计信息
        deviceStatistic: {},
        // 设备总数
        deviceCount: 10,
        options: {},
        userOverview: {
          alarmNum: 0,
          offlineNum: 0,
          onlineNum: 0,
          totalNum: 0,
        },
        pageflag: true,
        timer: null,
        //提示信息
        config: {
          number: [131],
          content: '{nt}',
          style: {
            ...style,
            // stroke: "#00fdfa",
            fill: "#00fdfa",
          },
        },
        //利好
        onlineconfig: {
          number: [338],
          content: '{nt}',
          style: {
            ...style,
            // stroke: "#07f7a8",
            fill: "#07f7a8",
          },
        },
        //警示信息
        offlineconfig: {
          number: [95],
          content: '{nt}',
          style: {
            ...style,
            // stroke: "#e3b337",
            fill: "#e3b337",
          },
        },
        //高风险信息
        laramnumconfig: {
          number: [2],
          content: '{nt}',
          style: {
            ...style,
            // stroke: "#f5023d",
            fill: "#f5023d",
          },
        }

      };
    },
    filters: {
      numsFilter(msg) {
        return msg || 0;
      },
    },
    created() {

    },
    mounted() {},
    beforeDestroy() {
      this.clearData()

    },
    methods: {
      clearData() {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      },
      getData() {
         
     
      },
      //轮询
      switper() {
        
      },
 
    },
  };

</script>
<style lang='scss' scoped>
  .user_Overview {
    li {
      flex: 1;

      p {
        text-align: center;
        height: 16px;
        font-size: 16px;
      }

      .user_Overview_nums {
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        font-size: 22px;
        margin: 50px auto 30px;
        background-size: cover;
        background-position: center center;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        &.bgdonghua::before {
          animation: rotating 14s linear infinite;
        }
      }

      .allnum {

        // background-image: url("../../assets/img/left_top_lan.png");
        &::before {
          background-image: url("../../../assets/bigScreen/img/left_top_lan.png");

        }
      }

      .online {
        &::before {
          background-image: url("../../../assets/bigScreen/img/left_top_lv.png");

        }
      }

      .offline {
        &::before {
          background-image: url("../../../assets/bigScreen/img/left_top_huang.png");

        }
      }

      .laramnum {
        &::before {
          background-image: url("../../../assets/bigScreen/img/left_top_hong.png");

        }
      }
    }
  }

</style>

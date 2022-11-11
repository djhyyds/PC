<template>
  <div class="login">
    <div class="loginData">
      <div class="loginText">
        <h2>风险情报系统</h2>
      </div>
      <div class="formData">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              @keydown.enter.native="login"
              clearable
              placeholder="请输入密码"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="tool">
        <div>
          <el-checkbox v-model="checked" @click.native.prevent="remember">记住密码</el-checkbox>
        </div>
      </div>
      <div class="butt">
        <el-button type="primary" @click.native="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  data() {
    return {
      form: {
        password: "",
        username: ""
      },
      checked: false,
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  mounted() {
    if (localStorage.getItem("news")) {
      this.form = JSON.parse(localStorage.getItem("news"));
      this.checked = true;
    }
  },
  methods: {
    login() {
      //   console.log(this.form);
      //   console.log(this.form.username.trim);
     
      if (
        this.form.username != "数科" &&
        this.form.username != "投后" &&
        this.form.username != "人法"
      ) {
        this.$message.warning("此用户不存在");
        return;
      }
      if (md5(this.form.password) != md5('123456')) {
        this.$message.warning("密码错误");
        return;
      }
      this.$store.commit("groupChange", this.form.username);
      this.$router.replace({ name: "about" });
    },
    remember() {
      this.checked = !this.checked;
      //   console.log(this.checked);
      if (this.checked) {
        localStorage.setItem("news", JSON.stringify(this.form));
      } else {
        localStorage.removeItem("news");
      }
    }
  }
};
</script>

<style scoped>
.login {
  background-image: url("http://mms.hengchang6.com/static/bg.883a3ec4.png");
  /* background-repeat: no-repeat; */
  /* background-size: cover; */
  width: 100%;
  height: 100%;
  min-width: 1000px;
  overflow: auto;
  position: fixed;
  line-height: 100%;
  padding-top: 150px;
}
.loginText {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000;
}
.loginData {
  width: 300px;
  height: 300px;
  transform: translate(-50%, 40%);
  margin-left: 50%;
}
.tool {
  display: flex;
  justify-content: space-between;
  color: #606266;
}
.butt {
  margin-top: 10px;
  text-align: center;
}
</style>
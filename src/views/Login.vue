<template>
  <navi :current="nav_path"></navi>
  <div class="container">
    <el-form label-width="80px" id="loginForm">
      <el-form-item label="用户名">
        <el-input v-model="user.name" name="username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="user.pass"
          name="password"
          type="password"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import navi from "../parts/nav.vue";
import { ElMessage } from "element-plus";
export default {
  components: { navi },
  data() {
    return {
      nav_path: "/login",
      user: {},
    };
  },
  methods: {
    async login() {
      let loginForm = document.querySelector<HTMLFormElement>("#loginForm")!;
      let postData = new FormData(loginForm);
      let res = await fetch("/api/User/Login", {
        method: "POST",
        body: postData,
      });
      if (res.status == 200) {
        ElMessage({
          message: "登录成功",
          type: "success",
          duration: 2000,
          onClose: () => this.$router.back(),
        });
      } else {
        ElMessage.error(await res.text());
      }
    },
  },
};
</script>


<style>
</style>
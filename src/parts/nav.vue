<template>
  <header>
    <el-menu :default-active="current" mode="horizontal" router class="d-flex">
      <el-menu-item index="/"> CUGOJ </el-menu-item>
      <el-menu-item index="/problemlist">题目列表 </el-menu-item>
      <div id="placeholder"></div>
      <el-menu-item index="/login"> {{ user_display }} </el-menu-item>
    </el-menu>
  </header>
</template>

<script>
import { currentUser } from "../views/user";
export default {
  props: ["current"],
  data() {
    return {
      user_display: null,
    };
  },
  async created() {
    this.user_display = (await currentUser()) ?? "登录";
  },
};
</script>

<style>
header {
  padding-bottom: 2em;
}
#placeholder {
  flex: 1;
  visibility: hidden;
}
</style>
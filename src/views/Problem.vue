<template>
  <navi></navi>
  <div v-loading.fullscreen.lock="!ready"></div>
  <div class="container" v-if="ready">
    <div class="text-center">
      <h2 v-html="`${problem.problem_id}: ${problem.title}`"></h2>
      <span>时间限制：{{ problem.time_limit }}s</span>
      <el-divider direction="vertical"></el-divider>
      <span>内存限制：{{ problem.memory_limit }}MB</span>
      <el-divider direction="vertical"></el-divider>
      <span>通过：{{ problem.accepted }}/{{ problem.submit }}</span>
      <br />
      <router-link
        custom
        :to="`/submit/${problem.problem_id}`"
        v-slot="{ href }"
      >
        <el-link icon="el-icon-edit" type="primary" :href="href">
          提交
        </el-link>
      </router-link>
      <el-divider direction="vertical"></el-divider>
      <el-link
        icon="el-icon-view"
        type="primary"
        :href="`http://acm.cug.edu.cn/status.php?problem_id=${pid}`"
      >
        状态
      </el-link>
      <el-divider></el-divider>
    </div>
    <el-card class="my-3">
      <template #header>
        <h5>题目描述</h5>
      </template>
      <div v-html="problem.description"></div>
    </el-card>
    <el-card class="my-3">
      <template #header>
        <h5>输入</h5>
      </template>
      <div v-html="problem.input"></div>
    </el-card>
    <el-card class="my-3">
      <template #header>
        <h5>输出</h5>
      </template>
      <div v-html="problem.output"></div>
    </el-card>
    <el-card class="my-3">
      <template #header>
        <h5>样例</h5>
      </template>
      <div class="position-relative">
        <span class="border-caption">样例输入</span>
        <pre v-html="problem.sample_input"></pre>
      </div>
      <div style="height: 1rem"></div>
      <div class="position-relative">
        <span class="border-caption">样例输出</span>
        <pre v-html="problem.sample_output"></pre>
      </div>
    </el-card>
    <el-card class="my-3">
      <template #header>
        <h5>提示</h5>
      </template>
      <div v-html="problem.hint"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import navi from "../parts/nav.vue";
import { ElMessage } from "element-plus";
import { mathjax_typeset, mathjax_load } from "../utils/mathjax";
export default {
  components: { navi },
  data() {
    return {
      ready: false,
      problem: {} as any,
    };
  },
  created() {
    mathjax_load();
  },
  updated() {
    mathjax_typeset();
  },
  computed: {
    pid() {
      return this.$route.params.pid;
    },
  },
  watch: {
    "$route.params": {
      handler({ pid }) {
        pid && this.fetchProblem(pid);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchProblem(pid: number) {
      this.ready = false;
      let res = await fetch(`/api/Problem/${pid}`);
      if (res.status == 200) {
        this.problem = await res.json();
        document.title = this.problem.title;
      } else {
        ElMessage({
          message: "题目不存在",
          type: "error",
          duration: 2000,
          onClose: () => this.$router.back(),
        });
      }
      this.ready = true;
    },
  },
};
</script>

<style>
.border-caption {
  font-size: 0.8rem;
  position: absolute;
  left: 1rem;
  top: -0.5rem;
  background: white;
  padding: 0 0.2rem;
}
pre {
  border: 1px solid lightgrey;
  border-radius: 0.3rem;
  padding: 1rem;
  margin: 0 0.1rem;
}
#affix-submit {
  right: 3rem;
  bottom: 3rem;
}
</style>
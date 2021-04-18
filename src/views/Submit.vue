<template>
  <navi></navi>
  <div class="container">
    <el-row>
      <el-col :md="12" class="d-flex px-3" style="align-items: center">
        <b>Problem {{ pid }}</b>
      </el-col>
      <el-col
        :md="12"
        class="d-flex px-3"
        style="align-items: center; justify-content: flex-end"
      >
        <el-space wrap>
          <span>语言：</span>
          <el-select v-model="lang" placeholder="请选择">
            <el-option v-for="l in langs" :key="l" :value="l"> </el-option>
          </el-select>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-space>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div id="codeblock" style="height: 80vh"></div>
    <el-divider></el-divider>
  </div>
</template>

<script lang="ts">
import * as monaco from "monaco-editor";
import navi from "../parts/nav.vue";
import { ElNotification } from "element-plus";
let editor = {} as monaco.editor.IStandaloneCodeEditor;
export default {
  components: { navi },
  data() {
    return {
      langs: ["C", "CPP", "Java", "Python"],
      lang: localStorage.getItem("preferedLang") ?? "CPP",
    };
  },
  computed: {
    pid() {
      return this.$route.params.pid;
    },
  },
  watch: {
    lang() {
      localStorage.setItem("preferedLang", this.lang);
      monaco.editor.setModelLanguage(
        editor.getModel()!,
        this.lang.toLowerCase()
      );
    },
  },
  mounted() {
    editor = monaco.editor.create(document.querySelector("#codeblock")!, {
      language: this.lang.toLowerCase(),
      automaticLayout: true,
    });
  },
  methods: {
    async submit() {
      let form = new FormData();
      form.append("lang", this.lang);
      form.append("code", editor.getValue());
      let req = await fetch(`/api/Problem/Submit/${this.pid}`, {
        method: "POST",
        body: form,
      });
      if (req.status == 200) {
        ElNotification({
          type: "success",
          message: `提交成功，提交id: ${await req.text()}`,
          duration: 3000,
          onClose: () => {
            window.open(
              `http://acm.cug.edu.cn/status.php?problem_id=${this.pid}`
            );
          },
        });
      } else {
        ElNotification({
          type: "error",
          message: await req.text(),
        });
      }
    },
  },
};
</script>

<style>
</style>
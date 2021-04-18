<template>
  <navi :current="nav_path"></navi>
  <div class="container">
    <el-pagination
      class="d-flex justify-content-center"
      layout="prev, pager, next"
      :page-count="totalPages"
      :current-page="curPage"
      @current-change="changePage"
    >
    </el-pagination>
    <el-table :data="problemList" stripe>
      <el-table-column
        prop="problem_id"
        label="题目编号"
        width="80"
        align="right"
      >
      </el-table-column>
      <el-table-column label="标题">
        <template #default="scope">
          <router-link
            custom
            :to="`/problem/${scope.row.problem_id}`"
            v-slot="{ href }"
          >
            <el-link type="primary" target="_blank" :href="href">
              {{ scope.row.title }}
            </el-link>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="submit" label="提交" width="60"> </el-table-column>
      <el-table-column prop="accepted" label="通过" width="60">
      </el-table-column>
    </el-table>
    <div class="m-4"></div>
    <el-pagination
      class="d-flex justify-content-center"
      layout="prev, pager, next"
      :page-count="totalPages"
      :current-page="curPage"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import navi from "../parts/nav.vue";
export default {
  components: { navi },
  data() {
    return {
      nav_path: "/problemlist",
      ready: false,
      problemList: [],
      totalPages: null,
    };
  },
  computed: {
    curPage() {
      return parseInt(this.$route.params.page as string);
    },
  },
  async created() {
    document.title = "CUGOJ - ProblemList";
  },
  watch: {
    "$route.params": {
      handler({ page }) {
        page && this.fetchProblemList(parseInt(page));
      },
      immediate: true,
    },
  },
  methods: {
    async fetchProblemList(page: number) {
      this.ready = false;
      let problemListRequest = fetch(`/api/Problem/List/${page}`);
      let res = await problemListRequest.then((x) => x.json());
      this.problemList = res.problemList;
      this.totalPages = res.totalPages;
      this.ready = true;
    },
    changePage(newPage: number) {
      this.$router.push({ params: { page: newPage } });
    },
  },
};
</script>

<style>
</style>
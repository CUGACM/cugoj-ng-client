<template>
  <el-container direction="vertical">
    <navi :current="nav_path"></navi>
    <div class="container">
      <el-skeleton :rows="15" animated v-if="!ready" />
      <el-main v-else>
        <div v-if="loggedin">
          <h1>{{ user }}</h1>
        </div>
        <div v-else>
          <h1>You are not logged in</h1>
        </div>
        <div>
          <el-card
            v-for="(news, idx) in news_list"
            :key="idx"
            style="margin-bottom: 2rem"
          >
            <template #header>
              <div class="card-header">
                {{ news.title }}
                <span style="font-size: 50%; margin-left: 1rem">
                  - [{{ news.author }}]
                </span>
              </div>
            </template>
            <div v-html="news.content"></div>
          </el-card>
        </div>
      </el-main>
    </div>
  </el-container>
</template>

<script lang="ts">
import navi from "../parts/nav.vue";
export default {
  components: { navi },
  data() {
    return {
      nav_path: "/",
      ready: false,
      loggedin: false,
      user: null,
      news_list: [],
    };
  },
  async created() {
    document.title = "CUGOJ - Home";
    let news = fetch("/api/News/List");
    let res = await fetch("/api/User/WhoAmI").then((x) => x.json());
    if (res.user) {
      this.user = res.user;
      this.loggedin = true;
    }
    this.news_list = await news.then((x) => x.json());

    this.ready = true;
  },
};
</script>

<style>
#lst {
  width: fit-content;
}
</style>
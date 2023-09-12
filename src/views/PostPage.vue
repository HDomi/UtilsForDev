<template>
  <div class="page-wrap">
    <div v-if="isLoading" class="loading-container">
      <div class="loading">
        <FadeLoader />
      </div>
    </div>
    <div class="page-wrap-inner">
      <div class="posting-title">
        <h1>{{ mdTitle }}</h1>
      </div>
      <div class="cutBar"></div>
      <div class="posting-info-wrap">
        <div class="posting-golist" @click="goList">목록으로</div>
        <div class="posting-date">작성일 : {{ mdDate }}</div>
      </div>
      <div class="posting-wrap">
        <div
          v-html="contents"
          class="article"
          style="padding-bottom: 100px"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import axios from "axios";
import htmlConverter from "@/utils/htmlConverter";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";

export default {
  components: { FadeLoader },
  mixins: [],
  props: {},
  data() {
    return {
      isLoading: false,
      mdTitle: "",
      mdDate: "",
      contents: "",
    };
  },
  async created() {
    this.isLoading = true;
    const path = this.$route.query.mdPath;
    await axios
      .get(`https://hdomi.github.io/util-posts/${path}`)
      .then((res: any) => {
        this.contents = htmlConverter(res.data);
        this.isLoading = false;
      })
      .catch((e: any) => {
        console.log(`ERROR🙄 ${e.response.status} : ${e.request.responseURL}`);
        this.isLoading = false;
      });
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {
    const mdTitle: any = this.$route.query.mdPath;
    const makeTitleDate = mdTitle.split("-");
    this.mdTitle = makeTitleDate[0];
    this.mdDate = makeTitleDate[1];
  },
  methods: {
    goList() {
      this.$router.push({
        path: `/utils`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.page-wrap {
  min-height: min-content !important;
}
.cutBar {
  margin-bottom: 0px;
}
.posting-info-wrap {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.posting-golist {
  cursor: pointer;
  text-decoration: underline;
}
.posting-date {
  text-align: right;
}
.posting-wrap {
  word-break: keep-all;
}
pre code {
  font-size: 17px;
  font-weight: 300;
}
@media (max-width: 900px) {
  pre code {
    font-size: 14px;
  }
}
@media (max-width: 700px) {
}
</style>

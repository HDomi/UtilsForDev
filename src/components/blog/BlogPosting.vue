<template>
  <div class="page-wrap">
    <div v-if="isLoading" class="loading-container">
      <div class="loading">
        <FadeLoader />
      </div>
    </div>
    <div class="page-wrap-inner">
      <OutLiner :outlines="outlines" />
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
import axios from "axios";
import htmlConverter from "@/utils/htmlConverter";
import OutLiner from "@/components/OutLiner.vue";
import FadeLoader from "vue-spinner/src/FadeLoader.vue";

export default {
  components: {
    OutLiner,
    FadeLoader,
  },
  mixins: [],
  props: {},
  data() {
    return {
      mdTitle: "",
      mdDate: "",
      contents: "",
      baseUrl: process.env.VITE_APP_BASE_URL,
      outlines: new Array(),
      isLoading: false,
    };
  },
  async created() {
    this.isLoading = true;
    const param = this.$route.query.mdId;
    const path = this.$route.query.mdPath;
    await axios
      .get(`https://hdomi.github.io/posts/${path}/${param}`)
      .then((res: any) => (this.contents = htmlConverter(res.data)))
      .catch((e: any) =>
        console.log(`ERROR🙄 ${e.response.status} : ${e.request.responseURL}`)
      );

    this.readyOutLiner();
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {
    const mdTitle: any = this.$route.query.mdId;
    const makeTitleDate = mdTitle.split("-");
    this.mdTitle = makeTitleDate[0];
    this.mdDate = makeTitleDate[1];
  },
  methods: {
    readyOutLiner() {
      const titleEls = document.querySelectorAll("h3, h4");
      let index = 0;
      let subIndex = 0;
      titleEls.forEach((tit: any) => {
        const title = tit;
        const isMainTitle = tit.tagName === "H3";
        const text = tit.innerText;
        const id = text.replace(/ /gi, "-");

        isMainTitle && index++;
        subIndex = isMainTitle ? 0 : subIndex + 1;
        const numbering = isMainTitle ? `${index}` : `${index}-${subIndex}`;
        const isSubIndex = !isMainTitle;

        this.outlines.push({ text, id, numbering, isSubIndex });
        title.id = id;
        this.isLoading = false;
      });
    },
    goList() {
      this.$router.push({
        path: `/list`,
      });
    },
  },
};
</script>

<style scoped>
.cutBar {
  margin-bottom: 0px;
}
.posting-info-wrap {
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 10px 30px 10px;
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
</style>
<style></style>

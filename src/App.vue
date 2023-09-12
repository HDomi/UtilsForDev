<template>
  <div class="App-wrap" ref="main">
    <SideBar />
    <div class="sec-wrap blueScrollBar">
      <MainHeader @searchUtil="searchUtil" />
      <router-view :utilSearchText="utilSearchText" />
      <Footer />
    </div>
  </div>
</template>
<script lang="ts">
import MainHeader from "@/components/layout/MainHeader.vue";
import SideBar from "@/components/layout/SideBar.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  components: {
    MainHeader,
    Footer,
    SideBar,
  },
  mixins: [],
  props: {},
  data() {
    return {
      utilSearchText: "",
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    searchUtil(text: string) {
      this.utilSearchText = text;
    },
  },
};
</script>
<style lang="scss" scoped></style>
<style lang="scss">
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css");
body {
  background: #f7f6fb;
  color: #333;
  margin: 0 auto;
  padding: 0;
  font-family: "Pretendard", -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR",
    "Malgun Gothic", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
div {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: #333;
}
li {
  list-style: none;
}
p {
  margin: 0 auto;
  padding: 0;
}
input[type="text"] {
  outline: none;
  border: none;
}
textarea {
  outline: none;
  border: none;
}
.hiddenScroll {
  overflow: hidden !important;
}
.flexRow {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flexColumn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.normal-desc {
  display: block;
  font-size: 17px;
  color: #333;
  font-weight: normal;
}
.main-tit {
  color: #333;
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 10px;
  display: inline-block;
  margin: 0 0 15px 0;
  padding: 0;
}
.sub-tit {
  color: #6c6c6c;
  font-size: 14px;
  font-weight: bolder;
  margin-bottom: 10px;
  display: inline-block;
  margin: 0 0 15px 0;
  padding: 0;
}
.shadowBox {
  box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  transition: box-shadow 0.1s;
}
.blue-btn {
  border-radius: 14px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: #0056b3;
  }
}
.tryAngle {
  font-size: 13px;
  margin-left: 7px;
  transition: 0.3s;
  display: inline-block;
  vertical-align: 2px;
}
.revert {
  transform: scaleY(-1) !important;
}
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 998;
}
.loading {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
}
.v-fade {
  background-color: rgb(107, 176, 255) !important;
}
.relative {
  position: relative;
}
.page-wrap {
  height: 100%;
  width: 100%;
  padding: 30px 40px 30px 40px;
  text-align: center;
  align-items: center;
  display: flex;
  flex-direction: column;
}
.page-tit-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.blueScrollBar::-webkit-scrollbar {
  width: 8px;
}
.blueScrollBar::-webkit-scrollbar-thumb {
  height: 30%;
  background: rgb(107, 176, 255);
  border-radius: 10px;
}
.blueScrollBar::-webkit-scrollbar-track {
  background: rgb(234, 249, 255);
}
.page-wrap-inner {
  width: 100%;
  height: 100%;
}
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 9999999;
  .loading {
    z-index: 999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 0 9999px;
  }
}
.App-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}
.sec-wrap {
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.overHidden {
  overflow: hidden;
}
@media (max-width: 1300px) {
}
@media (max-width: 1200px) {
}
@media (max-width: 900px) {
}
@media (max-width: 470px) {
}
</style>

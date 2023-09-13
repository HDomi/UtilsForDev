<template>
  <div class="page-wrap overHidden">
    <p class="main-tit">About</p>
    <div class="about-box shadowBox">
      <p class="sub-tit">출처링크</p>

      <a
        href="https://kr.freepik.com/free-vector/round-background-with-person-filling-out-a-form_1078424.htm#query=%EC%8B%9C%ED%97%98&position=40&from_view=search&track=sph"
        >Freepik</a
      >
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  min-height: min-content !important;
  .about-box {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 14px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    a {
      color: blue;
    }
  }
}
</style>

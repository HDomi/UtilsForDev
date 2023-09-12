<template>
  <div class="footer-wrap">
    <div class="footer-title">Utils For Developer</div>
    <div class="footer-title">Copyrightⓒ2023.Domi.All rights reserved.</div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  mixins: [],
  props: {
    dummy: Boolean,
  },
  data() {
    return {};
  },
  computed: {},
  presets: {},
  watch: {
    $route(to: any, from: any) {},
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.footer-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 5px 15px 5px 15px;
  z-index: 997;
  background: #f7f6fb;
}
.footer-title {
  color: rgb(197, 197, 197);
}
@media (max-width: 510px) {
  .footer-wrap {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .footer-title {
    font-size: 13px;
    text-align: left;
  }
}
</style>

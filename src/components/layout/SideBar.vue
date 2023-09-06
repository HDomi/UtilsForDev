<template>
  <div class="sidebar-wrap" :class="{ active: panelState }">
    <router-link to="/utils">
      <img src="../../assets/domi_logo_color.svg" />
    </router-link>
    <div class="side-item-wrap">
      <!-- <router-link to="/utils">
        <div class="item-title">홈으로</div>
      </router-link> -->
      <router-link to="/about">
        <div class="item-title">About</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  components: {},
  mixins: [],
  props: {
    panelState: Boolean,
  },
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
.wait {
  font-size: 12px;
}
.active {
  transition: 0.3s;
  right: 0 !important;
}
.sidebar-wrap {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  width: 350px;
  height: 100%;
  background: #0977ea;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow-y: hidden;
  align-items: center;
  img {
    width: 150px;
    margin: 40px 0 50px 0;
  }
  .side-item-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    a {
      width: 100%;
      box-sizing: border-box;
      display: block;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 0 20px;
      &:hover {
        background: #0765c5;
      }
      .item-title {
        width: 100%;
        font-size: 18px;
        font-weight: bold;
        color: #fff;
        height: 50px;
        line-height: 50px;
        text-align: left;
        padding: 0 10px;
      }
    }
  }
}
</style>

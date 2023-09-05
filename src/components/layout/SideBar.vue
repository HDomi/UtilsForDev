<template>
  <div class="sidebar-wrap scrollBar" :class="{ active: panelState }">
    <div class="side-item-wrap">
      <router-link to="/">
        <div class="item-title">홈으로</div>
      </router-link>
      <router-link to="/about">
        <div class="item-title">About</div>
      </router-link>
      <!-- <div
          v-for="(items, i) in labItems"
          :key="`labCard${i}`"
          class="lab-card-container"
          @click="$router.push(`/${items.value}`)"
        >
          <div class="card-box">
            {{ items.label }}
          </div>
        </div> -->
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
    return {
      labItems: [
        {
          label: "시험 문제 풀기",
          value: "DumpTester",
        },
      ],
    };
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
  padding: 15px 5px 15px 5px;
  transition: 0.3s;
  display: flex;
  flex-direction: column;
  z-index: 999;
  overflow-y: scroll;
  .side-item-wrap {
    .item-title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>

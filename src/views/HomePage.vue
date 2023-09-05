<template>
  <div class="page-wrap overHidden">
    <div v-if="utilList" class="util-list-wrap">
      <router-link
        v-for="(item, idx) in utilList"
        :key="`item-${idx}`"
        :to="item.route"
        class="util-item"
      >
        <img src="../assets/util-icons/dumpTester.svg" />
        <div>
          <div class="item-name">
            {{ item.name }}
          </div>
          <div class="item-desc">
            {{ item.desc }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
//Icons
// import IconDumpTester from "../assets/util-icons/dumpTester.svg";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      utilList: [
        {
          name: "Dump Tester",
          desc: "시험문제 덤프를 풀어보세요",
          route: "/dumpTester",
        },
      ],
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    // getIcon(route: string) {
    //   switch (route) {
    //     case "/dumpTester":
    //       return IconDumpTester;
    //     default:
    //       return "";
    //   }
    // },
  },
};
</script>
<style scoped lang="scss">
.util-list-wrap {
  width: 100%;
  .util-item {
    background: #fff;
    width: 170px;
    height: 170px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    box-shadow: 7px 7px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    transition: box-shadow 0.1s;
    &:hover {
      outline: 1px solid rgba(9, 119, 234, 0.5); /* outline 효과 추가 (투명한 가상의 테두리) */
    }
    img {
      width: 70px;
      height: 70px;
    }
    .item-name {
      font-size: 16px;
      font-weight: bold;
    }
    .item-desc {
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>

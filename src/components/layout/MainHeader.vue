<template>
  <div class="header-wrap">
    <router-link to="/utils">
      <div class="header-title">
        <img src="../../assets/domi_logo_color.svg" />{{ headerTitle }}
      </div>
    </router-link>
    <div class="search-bar" v-if="isHome">
      <input
        type="text"
        @input="onChangeSearch"
        placeholder="원하는 Util을 검색하세요."
      />
      <img src="../../assets/ic_search.svg" />
    </div>
  </div>
</template>

<script lang="ts">
import Burger from "@/components/layout/Burger.vue";
export default {
  components: {
    Burger,
  },
  mixins: [],
  props: {
    dummydata: Boolean,
  },
  data() {
    return {
      headerTitle: "Utils for Developer",
      isHome: true,
    };
  },
  computed: {},
  presets: {},
  watch: {
    $route(to, from) {
      if (to.name === "home") {
        this.headerTitle = "Utils for Developer";
        this.isHome = true;
        return;
      }

      if (to.path !== from.path) {
        this.headerTitle = to.name;
        if (to.name === "home") {
          this.isHome = true;
        } else {
          this.isHome = false;
        }
        return;
      }
    },
  },
  mounted() {},
  methods: {
    onChangeSearch(event: any) {
      this.$emit("searchUtil", event.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: neon;
  src: url(../../assets/fonts/neon.ttf);
}

.header-wrap {
  width: 100%;
  z-index: 997;
  padding: 15px 30px 15px 30px;
  display: flex;
  align-items: center;
  background: #fff;
  color: #333;
  justify-content: space-between;
  .header-title {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      margin-right: 10px;
    }
    font-size: 20px;
    font-weight: bold;
  }
  .search-bar {
    position: relative;
    width: 250px;
    input[type="text"] {
      width: 100%;
      height: 30px;
      border-radius: 40px;
      outline: none;
      border: none;
      background: #f7f6fb;
      padding: 2px 10px;
    }
    img {
      position: absolute;
      width: 15px;
      right: -10px;
      top: 9px;
    }
  }
}
@media (max-width: 470px) {
}
</style>

<template>
  <div class="page-wrap overHidden">
    <div v-if="searchUtilList.length" class="util-list-wrap">
      <router-link
        v-for="(item, idx) in searchUtilList"
        :key="`item-${idx}`"
        :to="item.route"
        class="util-item"
        @click="onClickUtil(item.name)"
      >
        <img :src="getIcon(item.name)" />
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
    <div v-else class="util-list-wrap">
      <div class="no-list">일치하는 항목이 없습니다.</div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import MakeToast from "@/utils/makeToast";
//Icons
import IconDumpTester from "../assets/util-icons/dumpTester.svg";
import IconJsonParser from "../assets/util-icons/jsonParser.svg";
export default {
  components: {},
  mixins: [],
  props: {
    utilSearchText: String,
  },
  data() {
    return {
      utilList: [
        {
          name: "Dump Tester",
          desc: "시험문제 덤프를 만들고 풀어보세요.",
          route: "/utils/dumpTester",
        },
        {
          name: "JSON Parser",
          desc: "String형식의 JSON을 파싱하세요.",
          route: "/utils/jsonParser",
        },
      ] as { name: string; desc: string; route: string }[],
      searchUtilList: [] as { name: string; desc: string; route: string }[],
    };
  },
  computed: {},
  presets: {},
  watch: {
    utilSearchText() {
      this.getFilteredUtilList(this.utilSearchText);
    },
  },
  mounted() {
    this.searchUtilList = this.utilList;
  },
  methods: {
    getIcon(name: string) {
      switch (name) {
        case "Dump Tester":
          return IconDumpTester;
        case "JSON Parser":
          return IconJsonParser;
        default:
          return "";
      }
    },
    getFilteredUtilList(searchValue: any) {
      if (
        searchValue === "" ||
        searchValue === null ||
        searchValue === undefined
      ) {
        this.searchUtilList = this.utilList;
        return;
      }
      this.searchUtilList = this.utilList.filter((util: any) =>
        util.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    },
    onClickUtil(name: any) {
      MakeToast(`${name}으로 이동했습니다.`, "success", 2000);
    },
  },
};
</script>
<style scoped lang="scss">
.util-list-wrap {
  width: 100%;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
  .no-list {
    font-size: 16px;
    font-weight: bold;
  }
  .util-item {
    background: #fff;
    padding: 10px;
    width: 100%;
    min-width: 170px;
    max-width: 170px;
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

<template>
  <div class="page-wrap overHidden">
    <p class="main-tit">Dashboard</p>
    <div class="util-dashboard-wrap shadowBox">
      <div class="graph-wrap">
        <GraphIndicator
          v-for="(item, idx) in graphIndicators"
          :key="`item-${idx}`"
          :gColor="item.color"
          :gTotal="item.total"
          :gUsed="item.used"
          :gLabel="item.label"
        ></GraphIndicator>
      </div>
      <div class="post-list blueScrollBar">
        <div
          v-for="(item, idx) in postList"
          :key="`item-${idx}`"
          class="post-item"
        >
          <div class="post-title">
            {{ item.title }}
          </div>
          <div class="post-info flexRow">
            <div class="post-writer">{{ item.writer }}</div>
            <div class="post-date">{{ item.date }}</div>
          </div>
        </div>
      </div>
    </div>
    <p class="main-tit">Utils</p>
    <div v-if="searchUtilList.length" class="util-list-wrap">
      <div
        class="util-list-item-wrap"
        v-for="(item, idx) in searchUtilList"
        :key="`item-${idx}`"
      >
        <router-link
          :to="item.route"
          class="util-item shadowBox"
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
    </div>
    <div v-else class="util-list-wrap">
      <div class="no-list">일치하는 항목이 없습니다.</div>
    </div>
  </div>
</template>

<script lang="ts">
import _ from "lodash";
import MakeToast from "@/utils/makeToast";
import GraphIndicator from "@/components/GraphIndicator.vue";
//Icons
import IconDumpTester from "../assets/util-icons/dumpTester.svg";
import IconJsonParser from "../assets/util-icons/jsonParser.svg";
import IconConvertImage from "../assets/util-icons/convertImage.svg";
import IconCombinePdf from "../assets/util-icons/combinePdf.svg";
import IconOnlineJs from "../assets/util-icons/onlineJS.svg";

// import IconColorPicker from "../assets/util-icons/colorPicker.svg";
export default {
  components: { GraphIndicator },
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
        // {
        //   name: "Color Picker",
        //   desc: "색상을 선택하고 코드를 알아보세요.",
        //   route: "/utils/colorPicker",
        // },
        {
          name: "Convert Image",
          desc: "이미지를 다른형식으로 변환하세요.",
          route: "/utils/convertImage",
        },
        {
          name: "Combine PDF",
          desc: "여러 PDF파일을 합쳐보세요.",
          route: "/utils/combinePdf",
        },
        // {
        //   name: "Online JS",
        //   desc: "JS를 온라인에서 실행해보세요.",
        //   route: "/utils/onlineJS",
        // },
      ] as { name: string; desc: string; route: string }[],
      searchUtilList: [] as { name: string; desc: string; route: string }[],

      graphIndicators: [
        {
          label: "테스트1",
          color: "cyan",
          total: 100,
          used: 60,
        },
        {
          label: "테스트2",
          color: "purple",
          total: 100,
          used: 35,
        },
        {
          label: "테스트3",
          color: "emerald",
          total: 100,
          used: 80,
        },
      ],

      postList: [
        {
          title: "제목1",
          writer: "ADMIN",
          date: "2023.09.12",
        },
        {
          title: "제목2",
          writer: "ADMIN",
          date: "2023.09.12",
        },
        {
          title: "제목3",
          writer: "ADMIN",
          date: "2023.09.12",
        },
        {
          title: "제목4",
          writer: "ADMIN",
          date: "2023.09.12",
        },
        {
          title: "제목5",
          writer: "ADMIN",
          date: "2023.09.12",
        },
      ],
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
        case "Convert Image":
          return IconConvertImage;
        case "Combine PDF":
          return IconCombinePdf;
        case "Online JS":
          return IconOnlineJs;
        // case "Color Picker":
        //   return IconColorPicker;
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
      // MakeToast(`${name}으로 이동했습니다.`, "success", 2000);
    },
  },
};
</script>
<style scoped lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .util-dashboard-wrap {
    width: 100%;
    height: 350px;
    background: #fff;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 15px;

    .graph-wrap {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
    .post-list {
      width: 100%;
      height: 170px;
      background: #f7f6fb;
      border-radius: 14px;
      overflow-x: hidden;
      overflow-y: auto;
      box-shadow: inset 0px 0px 16px 1px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      transition: box-shadow 0.1s;
      .post-item {
        cursor: pointer;
        width: 100%;
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-bottom: 2px solid #fff;
        color: #333;
        &:hover {
          background: #edeaf8;
        }
        .post-title {
          font-weight: bold;
        }
        .post-info {
          font-size: 14px;
          font-weight: normal;
          .post-date {
            margin-left: 20px;
          }
        }
      }
    }
  }
  .util-list-wrap {
    width: 100%;
    gap: 15px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
    .no-list {
      font-size: 16px;
      font-weight: bold;
    }
    .util-list-item-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .util-item {
        background: #fff;
        padding: 10px;
        width: 170px;
        height: 170px;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
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
  }
}
</style>

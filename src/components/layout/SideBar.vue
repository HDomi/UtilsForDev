<template>
  <div class="sidebar-wrap" :class="{ active: panelState }">
    <router-link to="/utils">
      <img class="side-main-icon" src="../../assets/domi_logo_color.svg" />
    </router-link>
    <div class="side-item-wrap">
      <!-- <router-link to="/utils">
        <div class="item-title">홈으로</div>
      </router-link> -->
      <router-link
        v-for="(item, idx) in utilList"
        :key="`item-${idx}`"
        :to="item.route"
      >
        <div class="item-title">
          <div class="icon-wrap">
            <img :src="getIcon(item.name)" class="side-icon" />
          </div>
          <div>{{ item.name }}</div>
        </div>
      </router-link>
      <router-link to="/about">
        <div class="item-title">About</div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
//Icons
import IconDumpTester from "../../assets/util-icons/dumpTester.svg";
import IconJsonParser from "../../assets/util-icons/jsonParser.svg";
import IconConvertImage from "../../assets/util-icons/convertImage.svg";
import IconCombinePdf from "../../assets/util-icons/combinePdf.svg";
import IconOnlineJs from "../../assets/util-icons/onlineJS.svg";
export default {
  components: {},
  mixins: [],
  props: {
    panelState: Boolean,
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
      ],
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
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
  },
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
  img.side-main-icon {
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
        display: flex;
        align-items: center;
        .icon-wrap {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          img.side-icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>

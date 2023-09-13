<template>
  <div class="page-wrap">
    <p class="main-tit">Dashboard</p>
    <div class="blue-wrap shadowBox">
      <p class="dashboard-blue-title">
        여러분을 위한 많은 "Utility"가<br />준비되어 있습니다.
      </p>
      <img src="../assets/dashboard-img.svg" />
    </div>
    <div class="util-dashboard-wrap shadowBox">
      <div class="post-list-header flexRow">
        <p class="sub-tit">공지사항</p>
        <div class="list-length">{{ postList.length }}개</div>
      </div>
      <div class="post-list blueScrollBar">
        <div
          v-for="(item, idx) in postList"
          :key="`item-${idx}`"
          class="post-item"
          @click="onClickPost(item.path)"
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
import axios from "axios";
import MakeToast from "@/utils/makeToast";
import GraphIndicator from "@/components/GraphIndicator.vue";
import { UtilList, GetIcon } from "@/utils/UtilList";
export default {
  components: { GraphIndicator },
  mixins: [],
  props: {
    utilSearchText: String,
  },
  data() {
    return {
      utilList: UtilList,
      searchUtilList: [] as { name: string; desc: string; route: string }[],

      postList: [] as {
        title: string;
        writer: string;
        date: string;
        path: string;
      }[],
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
    this.getPosts();
  },
  methods: {
    getIcon(name: string) {
      return GetIcon(name);
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
    async getPosts() {
      this.loadingHandler(true);
      let posts = await axios
        .get(`https://api.github.com/repos/hdomi/util-posts/contents/`)
        .then((res: any) => {
          let resData = new Array();
          resData = res.data;
          const convertList = new Array();
          resData.forEach((p: any) => {
            const name = p.name;
            const splitName = name.split("-");
            const date = splitName[2].split(".md")[0];
            const convert = {
              title: splitName[0],
              writer: splitName[1],
              date: date,
              path: p.name,
            };
            convertList.push(convert);
          });
          return convertList;
        });
      this.postList = posts;
      this.loadingHandler(false);
    },
    onClickPost(path: string) {
      this.$router.push({
        path: `/posting`,
        query: {
          mdPath: path,
        },
      });
    },
    loadingHandler(value: boolean) {
      this.$emit("loadingHandler", value);
    },
  },
};
</script>
<style scoped lang="scss">
.page-wrap {
  display: flex;
  flex-direction: column;
  .blue-wrap {
    width: 100%;
    height: 300px;
    min-height: 300px;
    border-radius: 14px;
    margin-bottom: 20px;
    background: rgb(165, 207, 255);
    color: #fff;
    padding: 15px;
    position: relative;
    overflow: hidden;
    .dashboard-blue-title {
      text-align: left;
      font-size: 24px;
      font-weight: bolder;
      margin: 20px 0 0 20px;
    }
    img {
      position: absolute;
      right: 10px;
      bottom: -20px;
      width: 300px;
      height: 300px;
      transform: scaleX(-1);
    }
  }
  align-items: flex-start;
  .util-dashboard-wrap {
    width: 100%;
    background: #fff;
    border-radius: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 0 15px 15px 15px;
    .post-list-header {
      justify-content: space-between;
      margin: 15px 0;
      .sub-tit {
        margin: 0;
      }
      .list-length {
        font-size: 14px;
        font-weight: normal;
        color: #333;
      }
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

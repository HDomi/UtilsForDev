<template>
  <div class="page-wrap hiddenScroll">
    <div class="parser-wrap">
      <textarea v-model="inputJson" class="input-parser" spellcheck="false" />
      <div class="parsing-wrap">
        <div class="parsing-header">
          <span>String > JSON</span>
          <button @click="onClickCopy">복사</button>
        </div>
        <div class="parsing-sec blueScrollBar" v-html="getParsing()"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";

export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      inputJson: "",
      jsonToString: "",
    };
  },
  computed: {},
  presets: {},
  watch: {
    // inputJson() {
    //   console.log(JSON.stringify(this.inputJson));
    // },
  },
  mounted() {},
  methods: {
    getPlusAndMinus(key: string, type: string) {
      const text = type === "plus" ? "+" : "-";
      const style = `width: 10px;
        height: 10px;
        border-radius: 2px;
        border: 1px solid #333;
        font-size: 14px;
        display: inline-block;
        text-align: center;
        line-height: 10px;
        margin-left: 10px;
        cursor: pointer;
        `;
      // return `<span class="${key}" style="${style}" @click="console.log('ads')">${text}</span><br>`;
      return `<span></span>`;
    },
    onClickOpener() {
      console.log("click");
    },
    returnSection(v: any) {
      return `<span style="color: #333">${v}</span>`;
    },
    returnValue(v: any, type: any) {
      let color = "";
      switch (type) {
        case "boolean":
          if (v) {
            color = "blue";
          } else {
            color = "red";
          }
          break;
        case "number":
          color = "blue";
          break;
        case "string":
          color = "green";
          break;
      }
      return `<span class="parse-value" style="color: ${color}">${v}</span>`;
    },
    getParsing() {
      if (this.inputJson) {
        try {
          let parsingObject = null;
          if (this.inputJson.charAt(0) === '"') {
            const parsingString = JSON.parse(this.inputJson);
            this.jsonToString = parsingString;
            parsingObject = JSON.parse(parsingString);
          } else {
            this.jsonToString = this.inputJson;
            parsingObject = JSON.parse(this.inputJson);
          }
          let parsed = `<span>{</span>`;
          parsed += this.parseObject(parsingObject, 0, "wrap");
          parsed += `<span>}</span>`;

          return parsed;
        } catch (error) {
          return `<span>유효하지 않은 데이터입니다.</span>`;
        }
      } else {
        return `<span>데이터를 입력해주세요.</span>`;
      }
    },

    parseObject(obj: any, depth: any, title: string) {
      if (typeof obj !== "object" || obj === null) {
        if (typeof obj === "string") {
          return this.returnValue(`"${obj}"`, typeof obj);
        } else if (typeof obj === "boolean" || typeof obj === "number") {
          return this.returnValue(obj, typeof obj);
        } else {
          return JSON.stringify(obj);
        }
      }

      let parsed = ``;
      const keys = Object.keys(obj);

      keys.forEach((key, index) => {
        parsed += `<span class="parse-key" style="color: #333">"${key}": </span>`;

        const value = obj[key];

        if (Array.isArray(value)) {
          parsed += `${this.returnSection("[")}${this.getPlusAndMinus(
            key,
            "minus"
          )}`;
          parsed += this.parseObject(value, depth + 1, key);
          parsed += `${this.returnSection("]")}`;
        } else if (typeof value === "object" && value !== null) {
          parsed += `${this.returnSection("{")}${this.getPlusAndMinus(
            key,
            "minus"
          )}`;
          parsed += this.parseObject(value, depth + 1, key);
          parsed += `${this.returnSection("}")}`;
        } else {
          if (typeof value === "string") {
            parsed += this.returnValue(`"${value}"`, typeof value);
          } else if (typeof value === "boolean" || typeof value === "number") {
            parsed += this.returnValue(value, typeof value);
          } else {
            parsed += JSON.stringify(value);
          }
        }

        if (index < keys.length - 1) {
          parsed += `${this.returnSection(",")}<br>`;
        }
      });
      if (depth >= 0) {
        parsed = `<div class="div-${title}" style="margin-left: 20px">${parsed}</div>`;
      }

      return parsed;
    },
    onClickCopy() {
      MakeToast(`복사되었습니다.`, "success", 2000);
      console.log("COPY\n", this.jsonToString);
    },
  },
};
</script>

<style scoped lang="scss">
.parser-wrap {
  width: 100%;
  height: 100%;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .input-parser {
    text-align: start;
    background: #fff;
    width: 36%;
    border: 1px solid rgb(9, 119, 234);
    resize: none;
    &:focus {
      border: 1px solid rgb(0, 67, 138);
    }
  }
  .parsing-wrap {
    border: 1px solid rgb(9, 119, 234);
    width: calc(64% - 30px);
    background: #fff;
    height: 100%;
    .parsing-header {
      background: rgb(9, 119, 234);
      height: 30px;
      padding: 0 10px;
      text-align: left;
      color: #fff;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        border: none;
        background: #fff;
        color: #333;
        font-weight: bold;
        border-radius: 20px;
        height: 23px;
        font-size: 12px;
      }
    }
    .parsing-sec {
      overflow-y: auto;
      height: 100%;
      text-align: left;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px 10px 100px 10px;
    }
  }
}
@media (max-width: 700px) {
}
</style>

<template>
  <div class="page-wrap">
    <div class="image-sec shadowBox">
      <div class="upload-img" v-if="uploadedImage">
        <img :src="uploadedSrc" alt="Uploaded Image" />
        <img
          src="../../assets/ic_del.svg"
          alt="del-image"
          class="del-btn"
          @click="deleteImageHandler"
        />
      </div>
      <div class="upload-img" v-else>
        <p class="normal-desc">
          이미지를 업로드 해주세요.<br />jpg, png만 가능합니다.
        </p>
        <div class="file-input-wrapper">
          <input
            type="file"
            @change="handleFileChange"
            accept=".jpg, .jpeg, .png"
            style="display: none"
            ref="fileInput"
          />
          <button class="blue-btn" @click="openFileInput">파일 선택</button>
        </div>
      </div>
    </div>
    <div class="convert-sec">
      <div class="setting-sec flexColumn">
        <label>
          <p class="normal-desc">가로</p>
          <input
            v-model="selectedWidth"
            type="number"
            min="1"
            @input="onChangeWidth"
        /></label>
        <label
          ><p class="normal-desc">세로</p>
          <input
            v-model="selectedHeight"
            type="number"
            min="1"
            :readonly="pinWidthHeight"
            :class="{ disabled: pinWidthHeight }"
        /></label>
        <label
          ><p class="normal-desc" style="width: 100%">가로세로 비율 고정</p>
          <input v-model="pinWidthHeight" type="checkbox"
        /></label>
        <label
          ><p class="normal-desc" style="width: 100%">형식</p>
          <select
            id="imageType"
            v-model="selectedImageType"
            class="image-type-selecet"
          >
            <option
              v-for="(item, idx) in imageTypeItem"
              :key="`item-${idx}`"
              :value="item"
            >
              {{ item.toUpperCase() }}
            </option>
          </select></label
        >
      </div>
      <div class="btn-sec flexRow">
        <button class="blue-btn" @click="convertAndDownload">
          Convert to
          {{ imageTypeItem.filter((f) => uploadedImageType !== f)[0] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import download from "downloadjs";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      uploadedImage: null as File | null,
      uploadedSrc: "",
      uploadedImageType: "",

      selectedWidth: 1,
      selectedHeight: 1,
      pinWidthHeight: false,
      selectedImageType: "jpg",
      imageTypeItem: ["jpg", "png"],
    };
  },
  computed: {},
  presets: {},
  watch: {
    uploadedImageType() {
      this.selectedImageType = this.imageTypeItem.filter(
        (f) => this.uploadedImageType !== f
      )[0];
    },
    pinWidthHeight() {
      if (this.pinWidthHeight) {
        this.selectedHeight = this.selectedWidth;
      } else {
        this.selectedHeight = 0;
      }
    },
    selectedWidth() {
      if (this.selectedWidth === 0) {
        this.selectedWidth = 1;
      }
    },
    selectedHeight() {
      if (this.selectedHeight === 0) {
        this.selectedHeight = 1;
      }
    },
  },
  mounted() {},
  methods: {
    openFileInput() {
      const fileInput = this.$refs.fileInput as HTMLInputElement | undefined;
      if (fileInput) {
        fileInput.click();
      }
    },
    handleFileChange(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files && inputElement.files.length > 0) {
        const file = inputElement.files[0];
        const type = file.type.split("/")[1];
        this.uploadedImageType = type === "png" ? "png" : "jpg";
        MakeToast(
          `${inputElement.files[0].name}이(가) 업로드되었습니다. / 타입 : ${this.uploadedImageType}`,
          "success",
          2000
        );
        this.uploadedImage = file;
        const image = new Image();
        image.src = this.uploadedSrc = URL.createObjectURL(file);
        image.onload = async () => {
          this.selectedWidth = image.width;
          this.selectedHeight = image.height;
        };
      }
    },
    deleteImageHandler() {
      this.uploadedImage = null;
      this.uploadedSrc = "";
      this.uploadedImageType = "";
      this.selectedWidth = 0;
      this.selectedHeight = 0;
      this.pinWidthHeight = false;
      this.selectedImageType = "jpg";
    },
    onChangeWidth() {
      if (this.pinWidthHeight) {
        this.selectedHeight = this.selectedWidth;
      }
    },
    async convertAndDownload() {
      if (this.uploadedImage) {
        const image = new Image();
        image.src = URL.createObjectURL(this.uploadedImage);
        image.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = this.selectedWidth;
          canvas.height = this.selectedHeight;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(image, 0, 0, this.selectedWidth, this.selectedHeight);
            const dataUrl = canvas.toDataURL(`image/${this.selectedImageType}`);
            download(
              dataUrl,
              `converted.${this.selectedImageType}`,
              `image/${this.selectedImageType}`
            );
          }
        };
      } else {
        MakeToast(`이미지를 먼저 업로드 해주세요.`, "error", 2000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.image-sec {
  width: 100%;
  height: 100%;
  .upload-img {
    position: relative;
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      max-height: 400px;
    }
    img.del-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
  }
  .file-input-wrapper {
    position: relative;
    overflow: hidden;
    .blue-btn {
      margin-top: 15px;
    }
  }
}
.convert-sec {
  border-radius: 14px;
  border: 1px solid rgb(107, 176, 255);
  background: #fff;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  .setting-sec {
    padding: 10px 20px;
    width: 300px;
    height: 100%;
    align-items: flex-start !important;
    border-right: 1px solid rgb(107, 176, 255);
    label {
      display: flex;
      margin-bottom: 10px;
      p {
        min-width: max-content;
        margin-right: 10px;
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: bold;
        color: rgb(107, 176, 255);
      }
    }
    input[type="number"] {
      border-radius: 10px;
      padding: 0 15px 0 15px;
      width: 100%;
      height: 30px;
      color: rgb(107, 176, 255);
      font-weight: bold;
      border: 1px solid rgb(107, 176, 255);
      &:focus {
        border: 1px solid rgb(107, 176, 255);
        outline: none;
      }
      &.disabled {
        color: #cfcfcf;
        border: 1px solid #cfcfcf;
      }
    }
    .image-type-selecet {
      border: 1px solid rgb(107, 176, 255);
      color: rgb(107, 176, 255);
      border-radius: 10px;
      &:focus {
        border: 1px solid rgb(107, 176, 255);
        outline: none;
      }
    }
  }
  .btn-sec {
    width: 100%;
    height: 100%;
  }
}
@media (max-width: 700px) {
}
</style>

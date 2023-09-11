<template>
  <div class="page-wrap">
    <div class="pdf-header">
      <div class="file-input-wrapper">
        <input
          type="file"
          @change="handleFileChange"
          accept=".pdf"
          style="display: none"
          ref="fileInput"
          multiple
        />
        <div class="flexRow">
          <button class="blue-btn" @click="openFileInput">파일 선택</button>
          <p v-if="pdfFiles.length">{{ pdfFiles.length }}개 선택됨</p>
        </div>
      </div>
      <div>
        <button
          v-if="pdfFiles.length"
          class="blue-btn"
          style="margin-right: 15px"
          @click="deleteAllPdf"
        >
          모두삭제
        </button>
        <button class="blue-btn" @click="mergeAndDownload">
          PDF 병합 및 다운로드
        </button>
      </div>
    </div>
    <div class="flexRow pdf-desc">
      <p class="normal-desc">
        모든 파일이 리스트의 순서대로 합쳐집니다. 리스트 아이템을 이동하여
        순서를 변경해주세요.
      </p>
    </div>
    <draggable
      :list="pdfFiles"
      :disabled="!enabled"
      item-key="name"
      class="uploaded-pdf-list"
      ghost-class="ghost"
      :move="checkMove"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element, idx }">
        <div class="uploaded-pdf-item">
          <p class="normal-desc">{{ idx + 1 }}. {{ element.name }}</p>
          <img
            src="../../assets/ic_del.svg"
            alt="del-image"
            class="del-btn"
            @click="deleteUploadedFile(idx)"
          />
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import { PDFDocument } from "pdf-lib";
import draggable from "vuedraggable"; // vuedraggable-next 패키지를 가져옵니다.

export default {
  components: {
    draggable,
  },
  data() {
    return {
      pdfFiles: [] as File[],

      enabled: true,
      dragging: false,
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    openFileInput() {
      const fileInput = this.$refs.fileInput as HTMLInputElement | undefined;
      if (fileInput) {
        fileInput.click();
      }
    },
    deleteUploadedFile(index: number) {
      const name = this.pdfFiles[index].name;
      MakeToast(`${name}이(가) 삭제 되었습니다.`, "success", 2000);
      this.pdfFiles.splice(index, 1);
    },
    deleteAllPdf() {
      this.pdfFiles = [];
      MakeToast(`모든 PDF가 삭제 되었습니다.`, "success", 2000);
    },
    handleFileChange(event: any) {
      const uploadFiles = Array.from(event.target.files);
      if (uploadFiles) {
        const nameArray = uploadFiles.map((item) => item.name);
        MakeToast(
          `${nameArray.join(", ")}이(가) 업로드 되었습니다.`,
          "success",
          5000
        );
        this.pdfFiles.push(...(uploadFiles as File[]));
      }
    },
    checkMove(e: any) {
      console.log("Future index: " + e.draggedContext.futureIndex);
    },
    async mergeAndDownload() {
      const mergedPdfDoc = await PDFDocument.create();

      for (const pdfFile of this.pdfFiles) {
        const pdfBuffer = await pdfFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(pdfBuffer);

        // 모든 페이지를 복사하여 병합
        const copiedPages = await mergedPdfDoc.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((copiedPage) => {
          mergedPdfDoc.addPage(copiedPage);
        });
      }

      const mergedPdfBytes = await mergedPdfDoc.save();

      const mergedPdfBlob = new Blob([mergedPdfBytes], {
        type: "application/pdf",
      });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

      const downloadLink = document.createElement("a");
      downloadLink.href = mergedPdfUrl;
      downloadLink.download = "Combined.pdf";
      downloadLink.click();

      URL.revokeObjectURL(mergedPdfUrl);
    },
  },
};
</script>

<style scoped lang="scss">
.pdf-header {
  width: 100%;
  background: #fff;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .file-input-wrapper {
    position: relative;
    overflow: hidden;
    .flexRow {
      p {
        margin-left: 10px;
        font-size: 15px;
        font-weight: bold;
        color: rgb(67, 155, 255);
      }
    }
  }
}
.pdf-desc {
  p {
    margin: 20px 0;
    font-size: 15px;
    font-weight: bold;
    color: rgb(67, 155, 255);
  }
}
.uploaded-pdf-list {
  border-radius: 14px;
  border: 1px solid rgb(107, 176, 255);
  padding: 15px 15px;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  gap: 10px;
  color: #333;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: flex-start;
  .uploaded-pdf-item {
    cursor: pointer;
    white-space: nowrap;
    height: 40px;
    width: max-content;
    display: flex;
    align-items: center;
    padding: 5px 15px;
    border-radius: 20px;
    border: 1px solid rgb(67, 155, 255);
    p {
      color: rgb(67, 155, 255);
    }
    img.del-btn {
      margin-left: 10px;
      width: 13px;
      height: 13px;
      cursor: pointer;
    }
  }
}
@media (max-width: 700px) {
}
</style>

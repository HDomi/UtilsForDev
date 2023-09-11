<template>
  <div class="page-wrap">
    <textarea v-model="code" rows="10" cols="50"></textarea>
    <button @click="runCode">Run</button>
    <div>
      <pre>{{ output }}</pre>
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
      code: "",
      output: "",
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    runCode() {
      const trimmedCode = this.code.trim();
      if (!trimmedCode) {
        this.output = "코드를 입력하세요.";
        return;
      }

      try {
        const script = new Function(trimmedCode);
        const result = script();
        this.output = result;
      } catch (error: any) {
        this.output = error.toString();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@media (max-width: 700px) {
}
</style>

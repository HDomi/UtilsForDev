<template>
  <div class="page-wrap" style="margin-bottom: 60px">
    <color-picker
      is-widget
      format="hex"
      lang="En"
      :pureColor="pureColor"
      :gradientColor="gradientColor"
      @update:pureColor="updatePureColor"
      @update:gradientColor="updateGradientColor"
    />
  </div>
</template>

<script lang="ts">
import MakeToast from "@/utils/makeToast";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
export default {
  components: { ColorPicker },
  mixins: [],
  props: {},
  data() {
    return {
      pureColor: "red",
      gradientColor:
        "linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 100%)",
    };
  },
  computed: {},
  presets: {},
  watch: {},
  mounted() {},
  methods: {
    updatePureColor(newColor: any) {
      this.pureColor = newColor;
    },
    updateGradientColor(newGradientColor: any) {
      this.gradientColor = newGradientColor;
    },
  },
};
</script>
<style lang="scss">
.vc-colorpicker {
  box-shadow: none !important;
  width: 100% !important;
}
</style>
<style scoped lang="scss">
@media (max-width: 700px) {
}
</style>

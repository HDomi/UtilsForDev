// shims-svg.d.ts

declare module "*.svg" {
  import { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
declare module "lodash";
declare module "downloadjs";
declare module "showdown";
declare module "vue-spinner/src/FadeLoader.vue";

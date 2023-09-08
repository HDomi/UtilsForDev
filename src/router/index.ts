import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";

//Utils
import DumpTester from "../views/util-pages/DumpTester.vue";
import JsonParser from "../views/util-pages/JsonParser.vue";
import ConvertImage from "../views/util-pages/ConvertImage.vue";
import ColorPicker from "../views/util-pages/ColorPicker.vue";
import CombinePdf from "../views/util-pages/CombinePdf.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/utils",
  },
  {
    path: "/utils",
    name: "home",
    component: HomePage,
    props: true,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/utils/dumpTester",
    name: "Dump Tester",
    component: DumpTester,
  },
  {
    path: "/utils/jsonParser",
    name: "Json Parser",
    component: JsonParser,
  },
  {
    path: "/utils/convertImage",
    name: "Convert Image",
    component: ConvertImage,
  },
  {
    path: "/utils/colorPicker",
    name: "Color Picker",
    component: ColorPicker,
  },
  {
    path: "/utils/combinePdf",
    name: "Combine PDF",
    component: CombinePdf,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach(async (to: any, from: any) => {});
router.afterEach(async (to: any, from: any) => {
  // if(to.name === 'home' || to.name === 'posting'){
  //   console.log(to.name);
  // }else{
  //   console.log(to.name);
  // }
});
export default router;

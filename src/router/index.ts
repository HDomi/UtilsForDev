import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/UtilsForDev/home",
    name: "home",
    component: HomePage,
  },
  {
    path: "/UtilsForDev/utils/dumpTester",
    name: "dumpTester",
    component: () => import("../views/util-pages/DumpTester.vue"),
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

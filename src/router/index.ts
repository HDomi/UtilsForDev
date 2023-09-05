import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";
import AboutPage from "../views/AboutPage.vue";

//Utils
import DumpTester from "../views/util-pages/DumpTester.vue";

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
    name: "about",
    component: AboutPage,
  },
  {
    path: "/utils/dumpTester",
    name: "dumpTester",
    component: DumpTester,
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

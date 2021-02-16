import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import echartsRouter from './modules/echarts'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  echartsRouter,
  {
    path: "/navBar",
    name: "navBar",
    component: () =>
      import("@/layout/navBar.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;

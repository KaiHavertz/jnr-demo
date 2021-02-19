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
  }, {
    path: "/topBar",
    name: "topBar",
    component: () =>
      import("@/layout/topBar.vue")
  }, {
    path: "/jnrNavBar",
    name: "jnrNavBar",
    component: () =>
      import("@/components/jnr/jnrNavBar.vue")
  }, {
    path: "/jnrDialog",
    name: "jnrDialog",
    component: () =>
      import("@/components/jnr/jnrDialog.vue")
  },{
    path: "/jnrTabs",
    name: "jnrTabs",
    component: () =>
      import("@/components/jnr/jnrTabs.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;

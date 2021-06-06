import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Splash from "../views/Splash.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Splash",
    component: Splash,
  },
  {
    path: "/map",
    name: "Map",
    component: () =>
      import(/* webpackChunkName: "scenario" */ "../views/Roadmap.vue"),
  },
  {
    path: "/level",
    name: "Level",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "scenario" */ "../views/Level.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

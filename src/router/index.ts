import { createRouter, createWebHistory } from "vue-router";
// import noReasult from './noReault'
// 路由规则
const routes = [
  {
    path: "/main",
    component: () => import("../view/main.vue"),
  },
  {
    path: "/",
    component: () => import("../view/login.vue"),
  },
  {
    path: "/reg",
    component: () => import("../view/reg.vue"),
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('../NoReault/404.vue')
  },
]
//根据路由规则创建路由
const router = createRouter({
  history: createWebHistory(""),
  routes,
});
export default router;

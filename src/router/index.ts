import { createRouter, createWebHistory } from "vue-router";

import ShuffleVIew from "@/views/ShuffleView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ShuffleVIew,
    },
  ],
});

export default router;

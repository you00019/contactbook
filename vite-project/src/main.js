import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Details from "./views/Details.vue";
import New from "./views/New.vue";
import Edit from "./views/Edit.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";

const routes = [
  { path: "/", component: Home },
  { path: "/details/:id", component: Details, props: true },
  { path: "/new", component: New, props: true },
  { path: "/edit/:id", component: Edit, props: true },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

createApp(App).use(router).mount("#app");

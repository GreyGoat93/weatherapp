import { createRouter, createWebHistory } from "vue-router";
import WeatherBodyContent from "./pages/WeatherBodyContent.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [{ path: "/city/:id", component: WeatherBodyContent }],
});

export default router;
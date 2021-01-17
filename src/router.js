import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index.js";
import WeatherBodyCurrent from "./pages/WeatherBodyCurrent.vue";
import Info from "./pages/Info.vue";

// const cityByIp = async() => {
//     const cities = ["Istanbul", "Ankara", "Izmir", "Funchal", "London", "Berlin"];
//     await new Promise((r) => setTimeout(r, 3000));
//     return `/city/${cities[Math.floor(Math.random() * cities.length)]}`;
// };

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/city/istanbul" },
        { path: "/city/:id", component: WeatherBodyCurrent },
        { path: "/info", component: Info, meta: { title: "Info" } },
    ],
});

router.beforeEach((to, from, next) => {
    console.log(to);
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.matched[0].path === "/city/:id") {
        store.dispatch("retrieveCity", to.params.id).then(() => {
            document.title = store.getters.cityName;
        });
        next();
    } else {
        next();
    }
});

export default router;
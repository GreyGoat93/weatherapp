import { createStore } from "vuex";
import weatherBody from "./modules/weatherBody.js";

const store = createStore({
    modules: {
        weatherBody,
    },
});

export default store;
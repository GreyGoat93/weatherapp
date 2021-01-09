import { createStore } from "vuex";
import weatherBody from "./modules/weatherBody.js";

export default createStore({
    modules: {
        weatherBody,
    },
});
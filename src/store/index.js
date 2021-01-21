import { createStore } from "vuex";
import weatherBody from "./modules/weatherBody.js";
import preferences from "./modules/preferences.js";

const store = createStore({
    state: {
        isModalOpen: false,
    },
    getters: {
        isModalOpen: (state) => state.isModalOpen,
    },
    mutations: {
        toggleModal: (state, payload) => {
            state.isModalOpen = payload;
        },
    },
    modules: {
        weatherBody,
        preferences,
    },
});

export default store;
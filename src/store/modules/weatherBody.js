import axios from "axios";
import baseURL from "../../tools/baseURL";

const state = {
    currentCity: {},
    queriedCities: [],
    queriedCitiesLength: 0,
};

const mutations = {
    retrieveCity(state, payload) {
        state.currentCity = payload;
    },
    queryCities(state, payload) {
        state.queriedCities = payload[0];
        state.queriedCitiesLength = payload[1];
    },
};

const getters = {
    currentCity: (state) => state.currentCity,
    queriedCities: (state) => state.queriedCities,
    queriedCitiesLength: (state) => state.queriedCitiesLength,
    cityName: (state) => {
        return Object.keys(state.currentCity).length ?
            state.currentCity.location.name :
            "";
    },
    temperature: (state) => {
        return Object.keys(state.currentCity).length ?
            Math.round(state.currentCity.current.temp_c) :
            "";
    },
    weatherIconSrc: (state) => {
        return Object.keys(state.currentCity).length ?
            state.currentCity.current.condition.icon :
            "";
    },
};

const actions = {
    async retrieveCity(state, cityUrl) {
        state.commit("retrieveCity", {});
        return axios
            .get(baseURL.current + `&q=${cityUrl}`)
            .then((r) => {
                state.commit("retrieveCity", r.data);
            })
            .catch(() => {
                state.commit("retrieveCity", {});
            });
    },
    queryCities(state, inputText) {
        state.queriedCities = [];
        state.queriedCitiesLength = 0;
        return axios
            .get(baseURL.search + `&q=${inputText}`)
            .then((r) => {
                if (r.data.length > 0) {
                    state.commit("queryCities", [{...r.data }, r.data.length]);
                } else if (r.data.length <= 0) {
                    state.commit("queryCities", [
                        [], 0
                    ]);
                }
            })
            .catch(() => {
                state.commit("queryCities", [
                    [], 0
                ]);
            })
            .finally(() => {
                state.isQueryDone = true;
            });
    },
};

export default {
    state,
    mutations,
    getters,
    actions,
};
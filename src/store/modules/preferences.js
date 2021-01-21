const state = {
    temperatureScale: "C",
    windSpeedScale: "KPH",
};
const getters = {
    temperatureScale: (state) => state.temperatureScale,
    windSpeedScale: (state) => state.windSpeedScale,
};
const mutations = {
    toggleTemperatureScale: (state, payload) =>
        (state.temperatureScale = payload),
    toggleWindSpeedScale: (state, payload) => (state.windSpeedScale = payload),
};

export default {
    state,
    mutations,
    getters,
};
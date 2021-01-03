const baseURL = {
    current: process.env.VUE_APP_API_URL + "current" + process.env.VUE_APP_API_KEY,
    search: process.env.VUE_APP_API_URL + "search" + process.env.VUE_APP_API_KEY,
};

export default baseURL;
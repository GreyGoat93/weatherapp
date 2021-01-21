export default {
    getObjByHistory: () => {
        return JSON.parse(localStorage.getItem("forecastHistory"));
    },
    // item: has location-url and location name
    setObjByHistory: function(item) {
        let history = this.getObjByHistory();
        if (history === null) {
            history = [];
            history.push(item);
        } else {
            history.forEach((searched, index) => {
                if (item.url === searched.url && item.fullName === searched.fullName) {
                    history.splice(index, 1);
                }
            });
            if (history.length > 10) {
                history.pop();
            }
            history.unshift(item);
        }
        localStorage.setItem("forecastHistory", JSON.stringify(history));
    },
};
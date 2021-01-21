export default (data, scale) => {
    let val = null;
    if (scale === "C") {
        val = data.temp_c;
    } else if (scale === "F") {
        val = data.temp_f;
    }
    return `${Math.floor(val)}°${scale}`;
};
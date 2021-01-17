<template>
  <div class="weather-body">
    <weather-body-header />
    <div class="weather-body-container">
      <weather-body-content />
    </div>
  </div>
</template>

<script>
import WeatherBodyContent from "./WeatherBodyContent.vue";
import WeatherBodyHeader from "./WeatherBodyHeader.vue";
export default {
  components: { WeatherBodyHeader, WeatherBodyContent },
  setup() {},
};
</script>

<style scoped>
.weather-body {
  height: 100vh;
  max-width: 100vw;
  z-index: 20;
  display: flex;
  flex-flow: column;
}

.weather-body-container {
  max-width: 100vw;
  height: 100vh;
}
</style>

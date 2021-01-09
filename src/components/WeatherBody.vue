<template>
  <div class="weather-body">
    <weather-body-header />
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import WeatherBodyHeader from "./WeatherBodyHeader.vue";
export default {
  components: { WeatherBodyHeader },
  setup() {},
};
</script>

<style scoped>
.weather-body {
  height: 100vh;
  width: 100vw;
  z-index: 20;
  display: flex;
  flex-flow: column;
}
</style>

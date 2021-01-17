<template>
  <div class="weather-section">
    <div class="info">
      <div v-if="Object.keys(currentCity).length" class="city-content">
        <div class="city-name-container">
          <p class="city-name">{{ cityName }}</p>
        </div>
        <div class="weather-icon-container">
          <div>
            <img
              :src="weatherIconSrc"
              alt="Weather Icon"
              class="weather-icon"
            />
          </div>
          <div>
            <p class="value">{{ temperature }}°</p>
          </div>
        </div>
      </div>
      <div v-else>
        <img src="../assets/loading.gif" alt="" style="height:15vh;" />
      </div>
    </div>
  </div>
  <div class="weather-by-days">
    <weather-timeline />
  </div>
</template>

<script>
import WeatherTimeline from "../components/WeatherTimeline.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: { WeatherTimeline },
  setup() {
    const store = useStore();

    const currentCity = computed(() => store.getters.currentCity);
    const cityName = computed(() => store.getters.cityName);
    const temperature = computed(() => store.getters.temperature);
    const weatherIconSrc = computed(() => store.getters.weatherIconSrc);

    return {
      cityName,
      temperature,
      weatherIconSrc,
      currentCity,
    };
  },
};
</script>

<style scoped>
.weather-section {
  background: url("../assets/sky.jpg") no-repeat fixed center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weather-by-days {
  background: linear-gradient(160deg, #111, #222);
  padding: 1em;
}

.info {
  color: #222;
  font-weight: 800;
  font-size: 1.2em;
  background: linear-gradient(30deg, #aaa5, #eee9);
  border-radius: 5px;
  display: flex;
  align-items: center;
  max-width: 80%;
}

.city-content {
  padding: 0.2em;
}

.weather-icon-container {
  margin: 0.2em 0em;
  display: flex;
  justify-content: center;
}

.weather-icon {
  width: inherit;
  display: block;
  width: 30px;
}

.value {
  font-size: 1.2em;
}

.city-name-container {
  display: flex;
  justify-content: center;
}

.city-name {
  margin: 0;
  padding: 0.3em;
  text-align: center;
}

.weather-enter-active,
.weather-leave-active {
  transition: all 0.5s ease;
}

.weather-enter-from {
  transform: translateX(150vw);
}
.weather-leave-to {
  transform: translateX(-150vw);
}

@media (min-width: 768px) {
  .info {
    max-width: 60%;
  }
}

@media (min-height: 512px) {
  .info {
    font-size: 3em;
    border-radius: 50px;
  }

  .value {
    font-size: 1.5em;
  }

  .weather-icon {
    width: 100px;
  }
}
</style>

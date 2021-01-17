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
    <div class="weather-timeline-container2">
      <div class="weather-timeline-container" ref="weatherTimelineContainer">
        <table class="weather-timeline" v-if="Object.keys(currentCity).length">
          <tr class="timeline-row">
            <th class="timeline-box">
              Day/Hour
            </th>
            <th
              v-for="num in 24"
              :key="num"
              class="timeline-box"
              v-text="num - 1 < 10 ? `0${num - 1}:00` : `${num - 1}:00`"
            ></th>
          </tr>
          <tr
            class="timeline-row"
            v-for="forecastDay in currentCity.forecast.forecastday"
            :key="forecastDay"
          >
            <td class="timeline-box" v-text="forecastDay.date"></td>
            <td
              class="timeline-box"
              v-for="time in forecastDay.hour"
              :key="time"
            >
              <img
                :src="time.condition.icon"
                :alt="time.condition.text"
                class="timeline-data-icon"
              />
              <span v-text="Math.floor(time.temp_c) + '°'"> </span>
            </td>
          </tr>
        </table>
      </div>
      <div class="slider" ref="slider">
        <div class="slide-left" ref="slideLeft">
          ◂
        </div>
        <div class="slide-right" ref="slideRight">
          ▸
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const slider = ref("");
    const slideLeft = ref("");
    const slideRight = ref("");
    const weatherTimelineContainer = ref("");

    onMounted(() => {
      slider.value.addEventListener("mouseover", () => {
        slideLeft.value.classList.add("d-flex");
        slideRight.value.classList.add("d-flex");
      });

      slider.value.addEventListener("mouseout", () => {
        slideLeft.value.classList.remove("d-flex");
        slideRight.value.classList.remove("d-flex");
      });

      slideLeft.value.addEventListener("click", () => {
        weatherTimelineContainer.value.scrollLeft -= 300;
      });

      slideRight.value.addEventListener("click", () => {
        weatherTimelineContainer.value.scrollLeft += 300;
      });
    });

    onUnmounted(() => {
      slider.value.removeEventListener("mouseover", () => {
        slideLeft.value.classList.add("d-flex");
        slideRight.value.classList.add("d-flex");
      });

      slider.value.removeEventListener("mouseout", () => {
        slideLeft.value.classList.remove("d-flex");
        slideRight.value.classList.remove("d-flex");
      });
    });

    const currentCity = computed(() => store.getters.currentCity);
    const cityName = computed(() => store.getters.cityName);
    const temperature = computed(() => store.getters.temperature);
    const weatherIconSrc = computed(() => store.getters.weatherIconSrc);

    return {
      cityName,
      slider,
      slideLeft,
      slideRight,
      weatherTimelineContainer,
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

.weather-timeline-container2 {
  position: relative;
}

.weather-timeline-container {
  overflow-x: hidden;
  scroll-behavior: smooth;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  background: linear-gradient(160deg, #6663, #9996);
}

.slider {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slide-left,
.slide-right {
  margin: 0.5em;
  width: 32px;
  height: 32px;
  display: none;
  align-items: center;
  justify-content: center;
  background: #eee;
  color: #000;
  border-radius: 50%;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.slide-left:focus,
.slide-right:focus {
  outline: none;
}

.slide-left:hover,
.slide-right:hover {
  background: #111;
  color: #eee;
  cursor: pointer;
  outline: none;
}

.d-flex {
  display: flex;
}

.weather-timeline {
  border-radius: 10px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-collapse: collapse;
  white-space: nowrap;
}

.timeline-row {
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

.timeline-box {
  height: 75px;
  width: 75px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9em;
}

.timeline-data-icon {
  width: 32px;
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

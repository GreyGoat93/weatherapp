<template>
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
          <td class="timeline-box" v-for="time in forecastDay.hour" :key="time">
            <img
              :src="time.condition.icon"
              :alt="time.condition.text"
              class="timeline-data-icon"
            />
            <span v-text="getTemperature(time, temperatureScale)"> </span>
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
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import getTemperature from "../tools/getTemperature.js";
export default {
  setup() {
    const slider = ref("");
    const slideLeft = ref("");
    const slideRight = ref("");
    const weatherTimelineContainer = ref("");

    const store = useStore();
    const currentCity = computed(() => store.getters.currentCity);
    const temperatureScale = computed(() => store.getters.temperatureScale);

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

    onBeforeUnmount(() => {
      console.log(slider);
      slider.value.removeEventListener("mouseover", () => {
        slideLeft.value.classList.add("d-flex");
        slideRight.value.classList.add("d-flex");
      });

      slider.value.removeEventListener("mouseout", () => {
        slideLeft.value.classList.remove("d-flex");
        slideRight.value.classList.remove("d-flex");
      });
    });

    return {
      slider,
      slideLeft,
      slideRight,
      weatherTimelineContainer,
      currentCity,
      temperatureScale,
      getTemperature,
    };
  },
};
</script>

<style scoped>
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
  width: 32px;
  height: 100%;
  display: none;
  align-items: center;
  justify-content: center;
  background: #eee4;
  color: #000;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.slide-left:hover,
.slide-right:hover {
  background: #1114;
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
</style>

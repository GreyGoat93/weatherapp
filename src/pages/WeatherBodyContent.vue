<template>
  <section class="content">
    <transition name="weather">
      <div v-if="Object.keys(currentCity).length" class="info">
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
    </transition>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const currentCity = computed(() => store.getters.currentCity);
    const cityName = computed(() => store.getters.cityName);
    const temperature = computed(() => store.getters.temperature);
    const weatherIconSrc = computed(() => store.getters.weatherIconSrc);

    onMounted(() => {
      console.log("mounted");
      store.dispatch("retrieveCity", route.params.id);
    });

    return { cityName, temperature, weatherIconSrc, currentCity };
  },
};
</script>

<style scoped>
.content {
  position: relative;
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.info {
  position: absolute;
  top: 20%;
  color: #222;
  font-weight: 800;
  font-size: 4em;
}

.weather-icon-container {
  margin: 0.2em 0em;
  display: flex;
  justify-content: center;
}

.weather-icon {
  width: inherit;
  display: block;
  width: 100px;
}

.value {
  font-size: 1.5em;
}

.city-name-container {
  display: flex;
  justify-content: center;
}

.city-name {
  margin: 0;
  padding: 0;
}

.weather-enter-active,
.weather-leave-active {
  transition: opacity 0.7s ease;
}

.weather-enter-from,
.weather-leave-to {
  opacity: 0;
}
</style>

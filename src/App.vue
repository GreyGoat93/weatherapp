<template>
  <div class="app">
    <transition name="loading-tra">
      <loading v-if="state.isLoaded" class="loading-screen" />
    </transition>
    <transition name="loading-tra">
      <weather-body v-if="!state.isLoaded" class="weather-body" />
    </transition>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import Loading from "./components/Loading.vue";
import WeatherBody from "./components/WeatherBody.vue";
export default {
  components: { Loading, WeatherBody },
  setup() {
    const state = reactive({
      isLoaded: true,
    });

    onMounted(() => {
      setTimeout(() => {
        state.isLoaded = false;
      }, 500);
    });

    return { state };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  max-width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
  height: 100%;
}

.app {
  height: 100%;
}

.d-none {
  display: none;
}

.loading-tra-enter-active,
.loading-tra-leave-active {
  transition: opacity 0.5s ease;
}

.loading-tra-enter-from,
.loading-tra-leave-to {
  opacity: 0;
}
</style>

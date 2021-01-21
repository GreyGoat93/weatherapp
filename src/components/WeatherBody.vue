<template>
  <div class="weather-body">
    <weather-body-header ref="header" />
    <div class="weather-body-container">
      <weather-body-content />
    </div>
  </div>
</template>

<script>
import WeatherBodyContent from "./WeatherBodyContent.vue";
import WeatherBodyHeader from "./WeatherBodyHeader.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
export default {
  components: { WeatherBodyHeader, WeatherBodyContent },
  setup() {
    const header = ref("");

    const changeHeaderBackground = (e) => {
      let scrollTop = e.srcElement.scrollingElement.scrollTop;
      if (scrollTop <= 1) {
        header.value.$el.classList.remove("bg-header");
        header.value.$el.classList.add("bg-transparent");
      } else if (scrollTop > 1) {
        header.value.$el.classList.remove("bg-transparent");
        header.value.$el.classList.add("bg-header");
      }
    };

    onMounted(() => {
      document.addEventListener("scroll", changeHeaderBackground);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("scroll", changeHeaderBackground);
    });

    return { header };
  },
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

.bg-header {
  background: #005;
  transition: background 0.3s;
}

.bg-transparent {
  background: transparent;
  transition: background 0.3s;
}
</style>

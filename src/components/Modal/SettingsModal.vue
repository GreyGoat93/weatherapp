<template>
  <div class="modal-inside">
    <div class="title">
      <h2>Preferences</h2>
    </div>
    <div class="preference-section">
      <span class="preference-text">
        <p>Temperature Scale:</p>
      </span>
      <span>
        <button
          class="preference-button"
          :class="temperatureScale == 'C' ? 'bg-selected' : 'bg-unselected'"
          @click="changeTemperatureScale('C')"
          :disabled="temperatureScale == 'C'"
        >
          °C
        </button>
        <button
          class="preference-button"
          :class="temperatureScale == 'F' ? 'bg-selected' : 'bg-unselected'"
          @click="changeTemperatureScale('F')"
          :disabled="temperatureScale == 'F'"
        >
          °F
        </button>
      </span>
    </div>
    <hr />
    <div class="preference-section">
      <span class="preference-text">
        <p>Wind Speed Scale:</p>
      </span>
      <span>
        <button
          class="preference-button "
          :class="windSpeedScale == 'KPH' ? 'bg-selected' : 'bg-unselected'"
          @click="changeWindSpeedScale('KPH')"
          :disabled="windSpeedScale == 'KPH'"
        >
          KPH
        </button>
        <button
          class="preference-button"
          :class="windSpeedScale == 'MPH' ? 'bg-selected' : 'bg-unselected'"
          @click="changeWindSpeedScale('MPH')"
          :disabled="windSpeedScale == 'MPH'"
        >
          MPH
        </button>
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const temperatureScale = computed(() => store.getters.temperatureScale);
    const windSpeedScale = computed(() => store.getters.windSpeedScale);

    const changeTemperatureScale = (val) => {
      store.commit("toggleTemperatureScale", val);
    };

    const changeWindSpeedScale = (val) => {
      store.commit("toggleWindSpeedScale", val);
    };

    return {
      temperatureScale,
      windSpeedScale,
      changeTemperatureScale,
      changeWindSpeedScale,
    };
  },
};
</script>

<style scoped>
.modal-inside {
  color: #000;
  border: 1px solid #000;
  border-radius: 1em;
  height: 100%;
  padding: 0.5em;
}

.title {
  text-align: center;
  padding: 0.5em;
}

.preference-section {
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
}

.preference-text {
  display: flex;
  align-items: center;
}

.preference-button {
  width: 3em;
  height: 2em;
  border: none;
  margin: 0 0.5em;
  outline: none;
  font-weight: bolder;
}

.preference-button:hover {
  cursor: pointer;
  background: #005;
}

.preference-button:disabled:hover {
  cursor: default;
  background: #000;
}

.bg-selected {
  background: #000;
  color: #fff;
}

.bg-unselected {
  background: #444;
  color: #fff;
}
</style>

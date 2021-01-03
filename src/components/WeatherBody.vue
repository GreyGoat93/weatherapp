<template>
  <div class="weather-body">
    <header>
      <div class="header-inside">
        <div class="title">
          <h1>WeatherApp</h1>
        </div>
        <div class="search-box-container">
          <div class="search-box">
            <div class="search-box-input-container">
              <input
                ref="searchBox"
                class="search-box-input"
                v-model.trim="state.searchBox"
                placeholder="Search a city"
                type="text"
                @input="queryCities"
                searchable="Select City"
              />
              <div class="search-icon-container">
                <img
                  :src="
                    state.isQueryDone == true
                      ? require('../assets/search-icon.png')
                      : require('../assets/loading.gif')
                  "
                  alt=""
                  class="search-icon"
                />
              </div>
            </div>
            <div class="search-box-dropdown" v-if="state.searchBox != ''">
              <div
                v-if="state.queriedCitiesLength <= 0 && state.searchBox != ''"
                class="search-box-dropdown-item"
              >
                Nothing found...
              </div>
              <div
                v-if="state.queriedCitiesLength > 0 && state.searchBox != ''"
              >
                <div
                  v-for="city in state.queriedCities"
                  :key="city.id"
                  class="search-box-dropdown-item"
                  @click="getForecastBySearchBox(city.url)"
                >
                  <p>
                    {{ city.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nav">
          <p>Info</p>
        </div>
      </div>
    </header>
    <section class="content">
      <div class="info">
        <div class="city-name-container">
          <p class="city-name">{{ state.cityName }}</p>
        </div>
        <div class="weather-icon-container">
          <div>
            <img :src="state.logoSrc" alt="" class="weather-icon" />
          </div>
          <div>
            <p class="value">{{ state.temperature }}°</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import axios from "axios";
import baseURL from "../tools/baseURL";
export default {
  setup() {
    const state = reactive({
      isQueryDone: true,
      cityName: "",
      temperature: "",
      logoSrc: "",
      searchBox: "",
      queriedCities: [],
      queriedCitiesLength: 0,
    });

    function queryCities(e) {
      state.isQueryDone = false;
      let inputText = e.target.value;
      axios
        .get(baseURL.search + `&q=${inputText}`)
        .then((r) => {
          if (r.data.length > 0) {
            console.log(r);
            state.queriedCities = { ...r.data };
            state.queriedCitiesLength = r.data.length;
          } else if (r.data.length <= 0) {
            state.queriedCities = [];
            state.queriedCitiesLength = 0;
          }
        })
        .catch(() => {
          console.log("noooooo!!!");
          state.queriedCities = [];
          state.queriedCitiesLength = 0;
        })
        .finally(() => {
          state.isQueryDone = true;
        });
    }

    function getForecast(cityName) {
      axios.get(baseURL.current + `&q=${cityName}`).then((r) => {
        console.log(r);
        state.cityName = r.data.location.name;
        state.temperature = Math.round(r.data.current.temp_c);
        state.logoSrc = r.data.current.condition.icon;
      });
    }

    function getForecastBySearchBox(cityName) {
      getForecast(cityName);
      state.searchBox = "";
    }

    onMounted(() => {
      getForecast("İstanbul");
    });

    return { state, getForecastBySearchBox, queryCities };
  },
};
</script>

<style>
header {
  padding: 1em 0;
  background: #555;
  box-shadow: 0px 3px 5px 2px rgba(16, 71, 85, 0.5);
}

.weather-body {
  height: 100vh;
  width: 100vw;
  z-index: 20;
  display: flex;
  flex-flow: column;
}

.header-inside {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.title {
  width: 25%;
}

.search-box-container {
  width: 50%;
  display: flex;
  justify-content: center;
}

.search-box {
  display: flex;
  justify-content: center;
  position: relative;
  width: 80%;
}

.search-box-input {
  display: block;
  width: 100%;
  border: 1px solid #000;
  border-right: none;
  font-size: 1em;
  outline: none;
  padding: 0.4em;
  box-sizing: border-box;
}

.search-box-input-container {
  width: 50%;
  display: flex;
  justify-content: center;
  position: relative;
}

.search-box-dropdown {
  position: absolute;
  margin-top: 2.2em;
  background: #fff;
  border: 1px solid #000;
  width: 50%;
  z-index: 999;
  max-height: 200px;
  overflow-y: scroll;
}

.search-box-dropdown-item {
  height: 2em;
  border: none;
  display: flex;
  align-items: center;
  padding: 0.4em;
  font-size: 1em;
}

.search-box-dropdown-item:hover {
  background: #ddd;
  cursor: pointer;
}

.search-icon-container {
  width: 20%;
  background: #fff;
  border: 1px solid #000;
  border-left: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-icon {
  width: 50%;
}

.nav {
  width: 25%;
  display: flex;
  justify-content: flex-end;
}

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
</style>

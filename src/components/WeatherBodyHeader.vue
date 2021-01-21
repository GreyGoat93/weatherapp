<template>
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
              :value="state.searchBox"
              placeholder="Search a city"
              id="queryInput"
              type="text"
              @keyup="queryCities"
              searchable="Select City"
              @focus="state.inputFocused = true"
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
          <div class="search-box-dropdown" v-if="state.inputFocused">
            <div v-if="state.searchBox != '' && queriedCitiesLength <= 0">
              <div class="search-box-dropdown-item">
                Nothing Found...
              </div>
            </div>
            <div
              v-else-if="
                state.searchBox == '' &&
                  forecastHistory.getObjByHistory() != null
              "
            >
              <div
                v-for="city in forecastHistory.getObjByHistory()"
                :key="city"
                class="search-box-dropdown-item"
                @click="getForecastBySearchBox(city.url, city.fullName)"
              >
                {{ city.fullName }}
              </div>
            </div>
            <div id="queriedCities" v-else>
              <div
                v-for="city in queriedCities"
                :key="city.id"
                class="search-box-dropdown-item"
                @click="getForecastBySearchBox(city.url, city.name)"
              >
                <p>
                  {{ city.name }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="settings">
          <i class="fa fa-gear" @click="openSettings"></i>
        </div>
      </div>
      <div class="nav">
        <router-link to="/info" class="nav-link">Info</router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import forecastHistory from "../tools/forecastHistory.js";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      isQueryDone: true,
      searchBox: "",
      inputFocused: false,
      oldSearchBox: "",
      searchTimeout: null,
    });

    //Vuex Getters
    const queriedCities = computed(() => store.getters.queriedCities);
    const queriedCitiesLength = computed(
      () => store.getters.queriedCitiesLength
    );

    //OnMounted add click event listener on document to detect clicks on search bar.
    onMounted(() => {
      document.onclick = (e) => {
        let queryId = "queriedCities";
        let inputId = "queryInput";
        let wasClickedOutsideInput =
          e.path[0].id != queryId &&
          e.path[1].id != queryId &&
          e.path[2].id != queryId &&
          e.path[0].id != inputId;
        if (wasClickedOutsideInput) {
          state.inputFocused = false;
        }
      };
    });

    //Queries cities when it is called. This function sets cities by input of the search box.
    async function queryCities(e) {
      state.isQueryDone = false;
      state.inputFocused = true;
      state.searchBox = e.target.value;
      let newText = e.target.value;

      if (state.searchTimeout != "") {
        clearTimeout(state.searchTimeout);
      }
      state.searchTimeout = setTimeout(async () => {
        if (state.oldSearchBox == newText.trim() || newText.trim() != "") {
          await store.dispatch("queryCities", newText.trim());
        }
        state.isQueryDone = true;
      }, 200);

      state.oldSearchBox = newText;
    }

    //Route changes when it is called. This function gets city data and stores city data in localStorage
    function getForecastBySearchBox(cityUrl, cityName) {
      state.searchBox = "";
      router.push({ path: `/city/${cityUrl}` });
      forecastHistory.setObjByHistory({ url: cityUrl, fullName: cityName });
      state.inputFocused = false;
    }

    function openSettings() {
      store.commit("toggleModal", true);
    }

    return {
      state,
      router,
      queryCities,
      getForecastBySearchBox,
      queriedCities,
      queriedCitiesLength,
      forecastHistory,
      openSettings,
    };
  },
};
</script>

<style scoped>
header {
  padding-top: 1em;
  box-sizing: border-box;
  z-index: 100;
  position: fixed;
  width: 100vw;
  height: 120px;
  display: flex;
  align-items: center;
}

.header-inside {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}

.search-box-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.75em;
}

.search-box {
  display: flex;
  justify-content: center;
  position: relative;
  width: 50%;
  height: 2em;
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
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
}

.settings {
  height: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.7em;
}

.fa-gear {
  margin-top: -0.1em;
  font-size: 1.5em;
}

.fa-gear:hover {
  cursor: pointer;
  color: #000;
}

.search-box-dropdown {
  position: absolute;
  margin-top: 2em;
  background: #fff;
  border: 1px solid #000;
  border-top: none;
  width: 100%;
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
  color: #000;
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
  width: 100%;
  display: none;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.4em;
  border: 1px solid transparent;
  border-radius: 0.2em;
  transition: border 0.3s;
}

.nav-link:hover {
  border: 1px solid white;
  transition: border 0.3s;
}

@media (min-width: 768px) {
  header {
    height: 80px;
    padding-top: 0;
    display: flex;
    align-items: center;
  }
  .header-inside {
    justify-content: space-between;
    flex-flow: row;
    width: 95%;
  }

  .title {
    width: 25%;
    justify-content: flex-start;
  }

  .search-box-container {
    width: 50%;
    margin-top: 0;
  }

  .search-box-input-container {
    width: 100%;
  }

  .nav {
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-weight: 900;
  }
}
</style>

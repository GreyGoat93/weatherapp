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
              v-if="queriedCitiesLength <= 0 && state.searchBox != ''"
              class="search-box-dropdown-item"
            >
              Nothing found...
            </div>
            <div v-if="queriedCitiesLength > 0 && state.searchBox != ''">
              <div
                v-for="city in queriedCities"
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
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const state = reactive({
      isQueryDone: true,
      searchBox: "",
    });

    const queriedCities = computed(() => store.getters.queriedCities);
    const queriedCitiesLength = computed(
      () => store.getters.queriedCitiesLength
    );

    async function queryCities(e) {
      state.isQueryDone = false;
      await store.dispatch("queryCities", e.target.value);
      state.isQueryDone = true;
    }

    function getForecastBySearchBox(cityUrl) {
      state.searchBox = "";
      router.push(`/city/${cityUrl}`);
    }

    return {
      state,
      router,
      queryCities,
      getForecastBySearchBox,
      queriedCities,
      queriedCitiesLength,
    };
  },
};
</script>

<style scoped>
header {
  padding: 1em 0;
  background: #555;
  box-shadow: 0px 3px 5px 2px rgba(16, 71, 85, 0.5);
}

.header-inside {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-flow: column;
}

.title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-box-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 0.75em;
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
  width: 75%;
  display: flex;
  justify-content: center;
  position: relative;
}

.search-box-dropdown {
  position: absolute;
  margin-top: 8.1%;
  background: #fff;
  border: 1px solid #000;
  width: 75%;
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
  width: 100%;
  display: none;
}

@media (min-width: 768px) {
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
    width: 50%;
  }

  .search-box-dropdown {
    width: 50%;
    margin-top: 7.1%;
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

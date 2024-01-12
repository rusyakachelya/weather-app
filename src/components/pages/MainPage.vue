<template>
  <div class="main-container">
    <div class="input-container">
      <CustomInput
          v-model="city"
          :value="city"
          :autocomplete="'off'"
          :custom-class="'search_city'"
          :placeholder="$t('placeholder')"
          @input="updateCitySuggestions"
          @keydown.enter="debouncedGetWeatherData"

      />
      <input class="search_city-submit" type="submit"  @click="debouncedGetWeatherData">
    </div>

    <AutoComplete
        :suggestions="suggestions"
        @selectSuggestion="selectSuggestion"
    />
    <NotificationComponent ref="notification"/>
    <LoadingIndicator :is-loading="isLoading"/>
    <NoContentBlock
        :has-data="weatherData && weatherData.length > 0"
        :message="$t('noContentBlocksMessages.mainPage')"
    />
    <WeatherWrapper
        v-for="(weather, index) in weatherData"
        :key="index"
        :weather="weather"
        @removeCityById="removeCityById"
    />
  </div>
</template>

<script>
import {debounce} from "@/helpers/debounce";
import {getWeatherByGeolocation} from "@/services/api/getWeatherByGeolocation";
import {getWeatherData} from "@/services/api/getWeather";
import {groupAndSortData} from "@/helpers/groupAndSortData";
import {getWeatherDataForCities} from "@/services/weatherDataService";
import {addToLocalStorage, getItemsFromLocalStorage, updateLocalStorage} from "@/services/localStorageService";
import {getCitySuggestions} from "@/services/api/getCitySuggestions";
import {shortLocale} from "@/helpers/i18nHelpers";

import WeatherWrapper from "@/components/WeatherWrapper/WeatherWrapper.vue";
import LoadingIndicator from "@/components/UI/LoadingIndicator.vue";
import NoContentBlock from "@/components/UI/NoContentBlock.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import AutoComplete from "@/components/AutoComplete/AutoComplete.vue";
import NotificationComponent from "@/components/UI/NotificationComponent.vue";

export default {
  name: "MainPage",
  components: {
    WeatherWrapper,
    LoadingIndicator,
    NoContentBlock,
    CustomInput,
    AutoComplete,
    NotificationComponent
  },
  data() {
    return {
      city: '',
      weatherData: [],
      suggestions: [],
      selectedTab: '1-day',
      oneDayData: null,
      cities: null,
      isLoading: false,
    };
  },
  methods: {
    debouncedGetWeatherData: debounce(async function () {
      try {
        this.isLoading = true;
        const data = await this.fetchCurrentWeatherData();
        const { city } = data;
        const { name: cityName, id: cityId } = city;
        const sortedData = groupAndSortData(data.list);

        this.handleCityData(cityId, cityName, sortedData);
      } catch (error) {
        console.error('getWeatherDataError', error);
      } finally {
        this.isLoading = false;
      }
    }, 500),

    async fetchCurrentWeatherData() {
      return getWeatherData({
        q: this.city,
        units: 'metric',
        lang: shortLocale(this.locale)
      });
    },

    handleCityData(cityId, cityName, sortedData) {
      const isCityAlreadyExists = getItemsFromLocalStorage('weatherData').includes(cityId);
      if (isCityAlreadyExists) {
        this.$refs.notification.showNotification(this.$t('notification'));
      } else {
        this.addWeatherDataToLocalStorage(cityId, cityName, sortedData);
      }

      this.clearSearchInput();
    },

    addWeatherDataToLocalStorage(cityId, cityName, sortedData) {
      this.weatherData.unshift({
        code: cityName,
        id: cityId,
        list: sortedData,
      });
      addToLocalStorage(cityId, 'weatherData');
    },

    clearSearchInput() {
      this.city = '';
      this.suggestions = [];
    },



    async fetchWeatherData() {
      try {
        this.isLoading = true;
        const dataArray = await getWeatherDataForCities(getItemsFromLocalStorage('weatherData'), shortLocale(this.locale));
        const favorites = getItemsFromLocalStorage('favorites') || [];
        return dataArray.map(item => this.processWeatherDataItem(item, favorites));
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchWeatherByGeolocation() {
      try {
        this.isLoading = true;
        const data = await getWeatherByGeolocation(shortLocale(this.locale));
        addToLocalStorage(data.id, 'weatherData');
        return data
      } catch (error) {
        console.error('Error fetching weather by geolocation:', error.message);
      } finally {
        this.isLoading = false;
      }
    },

    selectSuggestion(city) {
      this.city = city;
      this.debouncedGetWeatherData();
      this.suggestions = [];
    },

    processWeatherDataItem(item, favorites) {
      const { city } = item

      const cityName = city['name'];
      const cityId = city['id']
      const isFavorite = favorites.includes(cityId);

      return {
        code: cityName,
        id: cityId,
        favorite: isFavorite,
        list: groupAndSortData(item.list),
      };
    },

    async updateCitySuggestions() {
      this.suggestions = await getCitySuggestions(this.city, shortLocale(this.locale));
    },

    removeCityById(cityId) {
      this.isLoading = true;
      setTimeout(() => {
        const cities = getItemsFromLocalStorage('weatherData');
        updateLocalStorage('weatherData', cities, cityId);
        this.weatherData = this.weatherData.filter(city => city.id !== cityId);
        this.isLoading = false;
      }, 500);
    },

    async handleLocaleChange() {
      this.fetchWeatherData().then(data => this.weatherData = data)
    },

  },
  mounted() {
    this.isLoading = true;
    getItemsFromLocalStorage('weatherData').length === 0 && 'geolocation' in navigator
        ? this.fetchWeatherByGeolocation().then(data => this.weatherData = data)
        : this.fetchWeatherData().then(data => this.weatherData = data)
  },
  watch: {
    '$i18n.locale': 'handleLocaleChange',
  },
};
</script>

<style scoped>

.input-container {
  padding: 15px 15px 5px 15px;
  position: relative;
}


.search_city-submit {
  height: 26px;
  width: 55px;
  border: 0;
  cursor: pointer;
  text-indent: -9999px;
  background: url(https://sinst.fwdcdn.com/img/newImg/buttonSearch.png) no-repeat 0 0;
  position: absolute;
  top: 17px;
  right: 402px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  padding: 0;
}

.main-container {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  min-height: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  position: relative;
}

@media (max-width: 1300px) {
  .search_city-submit {
    display: none;
  }
}

</style>

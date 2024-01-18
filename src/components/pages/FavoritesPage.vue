<template>
  <div class="favorites-page">
    <WeatherWrapper
        v-for="(weather, index) in favorites"
        :key="index"
        :weather="weather"
        @removeCityById="removeCityById"
    />
    <LoadingIndicator
        :is-loading="isLoading"
    />
    <NoContentBlock
        :has-data="favorites.length > 0"
        :message="$t('noContentBlocksMessages.favoritesPage')"
    />
  </div>
</template>

<script>
import WeatherWrapper from "@/components/WeatherWrapper/WeatherWrapper.vue";
import LoadingIndicator from "@/components/UI/LoadingIndicator.vue";
import NoContentBlock from "@/components/UI/NoContentBlock.vue";

import {getWeatherDataForCities} from "@/services/weatherDataService";
import {getItemsFromLocalStorage, updateLocalStorage,} from "@/services/localStorageService";
import {groupAndSortData} from "@/helpers/groupAndSortData";
import {shortLocale} from "@/helpers/i18nHelpers";

export default {
  name: "FavoritesPage",
  components: {WeatherWrapper, LoadingIndicator, NoContentBlock},
  data() {
    return {
      favorites: [],
      isLoading: false
    }
  },
  methods: {
    removeCityById(cityId) {
      this.isLoading = true
      setTimeout(() => {
        const cities = getItemsFromLocalStorage('favorites')
        updateLocalStorage('favorites', cities, cityId)
        this.favorites = this.favorites.filter(city => city.id !== cityId)
        this.isLoading = false
      }, 500)
    },
    async fetchDataForFavorites() {
      try {
        this.isLoading = true
        const dataArray = await getWeatherDataForCities(getItemsFromLocalStorage('favorites'), shortLocale(this.locale));
        return dataArray.map(async (item) => {
          const {city, list} = item;
          const code = city.name;
          const id = city.id;
          const sortedData = groupAndSortData(list);

          return {
            code,
            id,
            list: sortedData
          };
        });
      } catch (error) {
        console.error('Произошла ошибка при получении данных:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateFavoritesData() {
      const dataPromises = await this.fetchDataForFavorites();
      this.favorites = await Promise.all(dataPromises);
    }

  },
   mounted() {
    this.updateFavoritesData()
  },
  watch: {
    '$i18n.locale': 'updateFavoritesData'
  },


}
</script>


<style scoped>
.favorites-page {
  border-radius: 20px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

</style>
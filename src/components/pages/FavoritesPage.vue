<template>
  <div class="favorites-page">
    <WeatherWrapper
        v-for="(weather, index) in favorites"
        :key="index"
        :weather="weather"
    />
    <LoadingIndicator
        :is-loading="isLoading"
    />
    <NoContentBlock
      :has-data="favorites.length > 0"
      :message="noContentMessage"
    />

  </div>
</template>

<script>
import WeatherWrapper from "@/components/WeatherWrapper.vue";
import LoadingIndicator from "@/components/UI/LoadingIndicator.vue";
import NoContentBlock from "@/components/UI/NoContentBlock.vue";

import {getSavedCities, getWeatherDataForCities} from "@/services/weatherDataService";
import {groupAndSortData} from "@/services/groupAndSortData";


export default {
  name: "FavoritesPage",
  components: {WeatherWrapper, LoadingIndicator, NoContentBlock},
  data() {
    return {
      favorites: [],
      noContentMessage: 'Ваш список улюблених міст порожній. Додайте міста, щоб стежити за погодою в них!',
      isLoading: false
    }
  },
  methods: {},
  mounted() {
    this.isLoading = true
    getWeatherDataForCities(getSavedCities('favorites'))
        .then(dataArray => {
          this.favorites = dataArray.map(item => {
            return {
              code: item['city']['name'],
              list: groupAndSortData(item.list)
            }
          })
        })
        .finally(() => {
          this.isLoading = false
        })
  }
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
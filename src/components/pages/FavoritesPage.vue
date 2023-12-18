<template>
  <div class="favorites-page" >
    <WeatherWrapper
        v-for="(weather, index) in favorites"
        :key="index"
        :weather="weather"
    />
  </div>
</template>

<script>
import WeatherWrapper from "@/components/WeatherWrapper.vue";

import { getSavedCities, getWeatherDataForCities } from "@/services/weatherDataService";
import { groupAndSortData } from "@/services/groupAndSortData";


export default {
  name: "FavoritesPage",
  components: {WeatherWrapper},
  data() {
    return {
      favorites: []
    }
  },
  methods: {},
 mounted() {
   getWeatherDataForCities(getSavedCities('favorites')).then(dataArray => {
     this.favorites = dataArray.map(item => {
       return {
         code: item['city']['name'],
         list: groupAndSortData(item.list)
       }
     })
   })
 }
}
</script>


<style scoped>
  .favorites-page{
    border-radius: 20px;
    min-height: 400px;
    margin: 0 auto;
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
</style>
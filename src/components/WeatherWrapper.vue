<template>
  <div class="weather-wrapper">
    <div class="change-tabs">
      <div class="tab" @click="changeTab('1-day')">1 день</div>
      <span>/</span>
      <div class="tab" @click="changeTab('5-days')">5 днів</div>
    </div>
    <div class="buttons-container">
      <div v-if="isMainPage" class="to-favorites" @click="this.addToFavorites(weather.code, 'favorites')">В обране</div>
      <div class="remove-btn" @click="openModal()">Видалити</div>
    </div>
    <ConfirmModal
        :is-open="isModalOpen"
        message="Ви впевнені, що хочете видалити елемент??"
        @deleteConfirmed="deleteConfirmed"
        :on-cancel="closeModal"
    />
    <WeatherCardList
        :city="weather.code"
        :list="sortForSpecificDays"
    />
  </div>
</template>

<script>
import WeatherCardList from "@/components/WeatherCardList.vue";
import ConfirmModal from "@/components/UI/ConfirmModal.vue";

import {saveWeatherData} from "@/services/weatherDataService";

export default {
  name: "WeatherWrapper",
  props: ['weather'],
  components: {WeatherCardList, ConfirmModal},
  data() {
    return {
      selectedTab: '1-day',
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',],
      isModalOpen: false
    }
  },
  methods: {
    changeTab(tab) {
      this.selectedTab = tab
    },
    extractDateComponents(dateString) {
      const dateObject = new Date(dateString);

      const day = dateObject.getDate();

      return day;
    },
    shiftDays(object) {
      const daysOfWeek = Object.keys(object);
      const currentDayIndex = new Date().getDay() - 1;
      const shiftedDays = daysOfWeek.slice(currentDayIndex).concat(daysOfWeek.slice(0, currentDayIndex));
      const shiftedObject = {};

      shiftedDays.forEach(day => {
        shiftedObject[day] = object[day];
      });

      const transformData = Object.entries(shiftedObject).map(([day, weatherData]) => {
        return {
          day,
          weatherData,
          date: this.extractDateComponents(weatherData[0].dt_txt)
        };
      });


      return transformData;
    },

    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    deleteConfirmed() {
      this.removeCity(this.weather.code)
      this.closeModal()
    },

    addToFavorites(cityName, key) {
      saveWeatherData(cityName, key)
    },

    arrayToObject(currentDayName, array) {
      const resultObject = {
        [currentDayName]: array,
      };

      return Object.entries(resultObject).map(([day, weatherData]) => ({
        day,
        weatherData,
      }));
    },

    removeCity(cityName) {
      const arrKey = this.getDefiniteCities
      const cities = JSON.parse(window.localStorage.getItem(arrKey))
      const updatedCities = cities.filter(city => city != cityName)
      localStorage.setItem(arrKey, JSON.stringify(updatedCities));
      window.location.reload();
    },


  },
  computed: {
    sortForSpecificDays() {
      const currentDate = new Date();
      const currentDayName = this.daysOfWeek[currentDate.getDay()];

      const selectedData = this.selectedTab === '1-day' ? this.weather.list[currentDayName] : this.weather.list;
      // const arrayToObject = (array) => {
      //   const resultObject = {
      //     [currentDayName]: array,
      //   };
      //   const transformData = Object.entries(resultObject).map(([day, weatherData]) => {
      //     return {
      //       day,
      //       weatherData,
      //     };
      //   });
      //   return transformData;
      // };

      return this.selectedTab === '1-day' ? this.arrayToObject(currentDayName,selectedData) : this.shiftDays(selectedData);
    },
    isMainPage() {
      return this.$route.path === '/';
    },
    getDefiniteCities() {
      return this.$route.path === '/' ? 'weatherData' : 'favorites'
    }
  },

}
</script>


<style scoped>

.buttons-container {
  display: flex;
  justify-content: center;
}

.buttons-container div {
  cursor: pointer;
  padding: 5px;
}

.to-favorites:hover {
  color: #177de5;
}

.remove-btn:hover {
  color: #ab1e1e;
}

.change-tabs {
  justify-content: end;
  display: flex;
  color: black;
  align-items: center;
}

.tab {
  padding: 5px;
  cursor: pointer;
}

.tab:last-child {
  margin-right: 0;
  border-top-right-radius: 10px;
}

.tab:first-child {
  border-top-left-radius: 10px;
}

.weather-wrapper {
  padding: 10px;
  color: black;
}
</style>
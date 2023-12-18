<template>
  <div class="main-container">
    <div class="input-container">
      <input type="text"
             id="search_city"
             v-model="city"
             autocomplete="off"
             placeholder="Назва населеного пункту"
             @input="handleInput"
             @keydown.enter="debouncedGetWeatherData"
      >
      <input class="search_city-submit" type="submit" @click="debouncedGetWeatherData()">
    </div>

    <ul class="input-list" v-if="suggestions.length && this.city.length">
      <li v-for="(suggestion, index) in suggestionsArray" :key="index" @click="selectSuggestion(suggestion)">
        {{ suggestion }}
      </li>
    </ul>


    <WeatherWrapper
        v-for="(weather, index) in weatherData"
        :key="index"
        :weather="weather"
    />



  </div>
</template>

<script>
import {debounce} from "@/services/debounce";
import {getWeatherData} from "@/services/getWeather";
import { groupAndSortData } from "@/services/groupAndSortData";
import { saveWeatherData, getSavedCities, getWeatherDataForCities } from "@/services/weatherDataService";

import WeatherWrapper from "@/components/WeatherWrapper.vue";


export default {
  name: "MainPage",
  components: {
    WeatherWrapper
  },
  data() {
    return {
      city: '',
      weatherData: [],
      suggestions: [],
      allSuggestions: [
        'Київ',
        'Харків',
        'Одеса',
        'Дніпро',
        'Донецьк',
        'Запоріжжя',
        'Львів',
        'Кривий Ріг',
        'Миколаїв',
      ],
      selectedTab: '1-day',
      oneDayData: null,
      newList: {},
      cities: null

    }
  },
  methods: {
    debouncedGetWeatherData: debounce(function () {
      const queries = {
        q: this.city,
        units: 'metric',
        lang: 'ua',
      }

      getWeatherData(queries)
          .then(data => {
            console.log(data)
            this.weatherData.unshift({
              code: data['city']['name'],
              list: groupAndSortData(data.list)
            })
            saveWeatherData(data['city']['name'],'weatherData')
            this.city = ''
          })

    }, 1000),
    handleInput() {
      const inputValue = this.city.toLowerCase();

      this.suggestions = [];

      this.allSuggestions.forEach((suggestion) => {
        if (suggestion.toLowerCase().includes(inputValue)) {
          this.suggestions.push(suggestion);
        }
      })
    },
    selectSuggestion(suggestion) {
      this.city = suggestion;
      this.debouncedGetWeatherData()
      this.suggestions = [];
    },


  },
  computed: {
    suggestionsArray() {
      const value = this.city.toLowerCase();
      return this.allSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(value));
    }
  },
  mounted() {
     getWeatherDataForCities(getSavedCities('weatherData')).then(dataArray => {
       this.weatherData = dataArray.map(item => {
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

.input-container{
  padding: 15px;
  position: relative;
}
.input-list {
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  list-style: none;
  width: 417px;
  min-height: 35px;
  overflow-x: hidden;
  position: absolute;
  z-index: 1;
  border: 1px solid #ccc;
  background: white;
  margin: 0 auto;
  top: 44px;
  left: 400px;
  padding: 5px;
  text-align: start;
}

#search_city {
  color: #777;
  width: 423px;
  border: 1px solid #abadb3;
  padding: 2px;
  font-size: 14px;
  line-height: 20px;
  height: 25px;
  border-radius: 3px;
  outline: 0;
}
#search_city:focus {
  border: 1px solid #6dabf2;
  box-shadow: 0 0 3px rgba(50,157,247,.5);
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
.weather-input:focus {
  outline: none;
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


li {
  padding: 8px;
  cursor: pointer;
}

li:hover {
  background-color: #6dabf2;
  color: white;
}
</style>

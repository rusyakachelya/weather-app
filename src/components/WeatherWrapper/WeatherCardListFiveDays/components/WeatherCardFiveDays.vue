<template>
  <div class="weather-card-5days"
       @click="this.selectWeather(weather)"
       :class="{ 'active-tab': isActiveTab }"
  >
    <div class="weather-5days-title">
      <p>{{ weather.week }}</p>
      <p>{{ weather.dayOfMonth }}</p>
      <p>{{ weather.month }}</p>
    </div>
    <div class="temperature">
      <div class="min">{{ $t('temperatures.min') }}. <span>{{ minTemperature }}°</span></div>
      <div class="max">{{ $t('temperatures.max') }}. <span>{{ maxTemperature }}°</span></div>
    </div>


  </div>
</template>

<script>
export default {
  name: "WeatherCard",
  props: ['weather', 'isActiveTab'],
  components: {},
  data() {
    return {}
  },
  methods: {
    selectWeather(weather) {
      this.$emit('selectWeather', weather)
    }
  },
  computed: {
    maxTemperature() {
      if (!this.weather || !Array.isArray(this.weather.weatherData) || this.weather.weatherData.length === 0) {
        return NaN;
      }

      const temperatures = this.weather.weatherData.map(entry => entry.main.temp_max);
      return Math.max(...temperatures) % 1 < 0.5 ? Math.floor(Math.max(...temperatures)) : Math.ceil(Math.max(...temperatures))
    },
    minTemperature() {
      if (!this.weather || !Array.isArray(this.weather.weatherData) || this.weather.weatherData.length === 0) {
        return NaN;
      }

      const temperatures = this.weather.weatherData.map(entry => entry.main.temp_min);
      return Math.min(...temperatures) % 1 < 0.5 ? Math.floor(Math.min(...temperatures)) : Math.ceil(Math.min(...temperatures))
    }
  },
  mounted() {

  }
}
</script>


<style scoped>
.active-tab {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.weather-5days-title {
  display: flex;
  flex-direction: column;
}

.temperature {
  display: flex;
}

.temperature .max, .temperature .min {
  width: 34px;
  color: #9d9d9d;
  font-size: 11px;
}

.temperature .max span, .temperature .min span {
  display: block;
  font-size: 17px;
  color: #000;
}

p {
  margin: 5px 0;
}

.weather-card-5days {
  cursor: pointer;
  display: flex;
  border-radius: 20px;
  color: black;
  flex-direction: column;
  margin: 0px 10px;
  padding: 20px;
}


@media (max-width: 760px) {
  .weather-card-5days {
    padding: 5px;
    font-size: 12px;
  }
}
@media (max-width: 668px) {
  .weather-card-5days {
    padding: 5px;
    width: 218px;
  }
  .temperature .max span, .temperature .min span {
    font-size: 14px;
  }
  .temperature {
    justify-content: center;
  }
  .weather-5days-title {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .weather-5days-title p{
    margin-right: 5px;
  }
  .weather-5days-title p:last-child{
    margin-right: 0px;
  }
}





</style>
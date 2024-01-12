<template>
  <div class="weather-content-container multiple-items">
    <WeatherCardFiveDays
        v-for="(card,index) in list"
        :key="index"
        :weather="card"
        @selectWeather="selectWeather"
        :is-active-tab="activeTabIndex === index"
    />
  </div>
  <WrapperTimelineFiveDays
      :weather="selectedWeather"
  />
</template>

<script>
import WeatherCardFiveDays
  from "@/components/WeatherWrapper/WeatherCardListFiveDays/components/WeatherCardFiveDays.vue";
import WrapperTimelineFiveDays
  from "@/components/WeatherWrapper/WeatherCardListFiveDays/components/WrapperTimelineFiveDays.vue";

export default {
  name: "WeatherCardListFiveDays",
  components: {WeatherCardFiveDays, WrapperTimelineFiveDays},
  props: ['list'],
  data() {
    return {
      selectedWeather: null,
      activeTabIndex: 0,
    }
  },
  methods: {
    selectWeather(weather) {
      this.selectedWeather = weather.weatherData
      this.activeTabIndex = this.list.indexOf(weather);
    }
  },
  mounted() {
    this.selectedWeather = this.list[0].weatherData
  },
  updated() {

  }
}
</script>


<style scoped>
.weather-content-container.multiple-items {
  display: flex;
  justify-content: flex-start;
}


@media (max-width: 760px) {
  .weather-content-container.multiple-items {
    justify-content: center;
  }
}
@media (max-width: 668px) {
  .weather-content-container.multiple-items {
    flex-direction: column;
    align-items: center;
  }
}
</style>
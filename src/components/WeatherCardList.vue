<template>
  <div class="weather-content-container">
    <h3 class="weather-card-city"><strong>Погода у</strong> {{ city }}</h3>
    <WeatherCard
        v-for="(card,index) in list"
        :key="index"
        :weather="card"
    />
  </div>
</template>

<script>
import WeatherCard from "@/components/UI/WeatherCard.vue";


export default {
  name: "WeatherCardList",
  data() {
    return {
      selectedTab: '1-day',
    }
  },
  props: ['list', 'city',],
  components: {WeatherCard},
  computed: {},
  methods: {},
}
</script>


<style scoped>
.weather-card-city{
  margin-top: 0px;
  text-align: start;
}
strong{
  color: #777777;
}
</style>
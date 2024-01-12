<template>
  <div class="weather-content-container">
    <WeatherCard
        v-for="(card,index) in list"
        :key="index"
        :weather="card"
    />
  </div>
</template>


<script>
import WeatherCard from "@/components/WeatherWrapper/WeatherCardList/components/WeatherCard.vue";


export default {
  name: "WeatherCardList",
  data() {
    return {}
  },
  props: ['list',],
  components: {WeatherCard},
  computed: {},
  methods: {},
}
</script>


<style scoped>
strong{
  color: #777777;
}


</style>
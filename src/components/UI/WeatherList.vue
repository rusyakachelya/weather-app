<template>
  <div class="">
  <WeatherCard/>
  </div>
</template>

<script>
import WeatherCard from "@/components/UI/WeatherCard.vue";
export default {
  name: "WeatherList",
  props: ['weatherdata'],
  components: {WeatherCard}
}
</script>

<style scoped>

</style>
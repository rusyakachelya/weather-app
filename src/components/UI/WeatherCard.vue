<template>
  <div class="weather-card">
    <div class="weather-day">{{ weather.day }} <span>{{weather.date}}</span></div>
    <div class="timeline-container">
      <div class="titles">
        <p>Час</p>
        <p>Температура, °C</p>
        <p>Відчувається як</p>
      </div>
      <TimelineCard
          v-for="(timeline, index) in weather.weatherData"
          :key="index"
          :timeline="timeline"
      />
    </div>
  </div>
</template>

<script>
import TimelineCard from "@/components/UI/TimelineCard.vue";
export default {
  name: "WeatherCard",
  props: ['weather'],
  components: {TimelineCard},
  methods: {

  },
  computed: {},
  mounted() {
  }
}
</script>


<style scoped>
.timeline-container{
  align-items: center;
  display: flex;
  padding: 10px;
  font-size: 15px;
  line-height: 15px;
}
.titles{
  font-size: 11px;
  color: #777;
}
.weather-day{
  padding: 5px;
}
.weather-card{
  display: flex;
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  color: black;
  flex-direction: column;
  margin-bottom: 10px;
}
.weather-card-container{
  //padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weather-card-container:last-child{
  align-self: baseline;
}


</style>
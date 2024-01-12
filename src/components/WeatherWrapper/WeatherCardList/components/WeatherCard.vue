<template>
  <div class="weather-card">
    <div class="timeline-container" >
      <div class="titles">
        <p>{{$t('timelineTitles.time')}}</p>
        <p>{{$t('timelineTitles.temperature')}}, °C</p>
        <p>{{$t('timelineTitles.feelsLike')}}</p>
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
import TimelineCard from "@/components/WeatherWrapper/WeatherCardList/components/TimelineCard.vue";

export default {
  name: "WeatherCard",
  props: ['weather',],
  components: {TimelineCard},
  methods: {

  },
  computed: {},
  mounted() {
  }
}
</script>


<style scoped>
.timeline-container {
  align-items: center;
  display: flex;
  padding: 10px;
  font-size: 15px;
  line-height: 15px;
}

.titles {
  font-size: 11px;
  color: #777;
}


.weather-card {
  display: flex;
  border-radius: 20px;
  color: black;
  flex-direction: column;
  margin-bottom: 10px;
  padding: 20px;
}

.weather-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-card-container:last-child {
  align-self: baseline;
}


@media (max-width: 1140px) {
  .titles {
    display: none;
  }
}
@media (max-width: 500px) {
  .weather-card {
    padding: 5px;
  }
  .timeline-container {
    padding: 5px;
  }
}

</style>
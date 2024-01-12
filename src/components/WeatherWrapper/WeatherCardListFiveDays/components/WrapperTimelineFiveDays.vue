<template>
  <div class="weather-timeline-5days">
    <div class="timeline-container-5days">
      <div class="titles-5days">
        <p>{{$t('timelineTitles.time')}}</p>
        <p>{{$t('timelineTitles.temperature')}}, °C</p>
        <p>{{$t('timelineTitles.feelsLike')}}</p>
      </div>
      <TimelineCard
          v-for="(timeline, index) in weather"
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
  methods: {},
  computed: {},
  mounted() {
  }
}
</script>


<style scoped>
.timeline-container-5days {
  align-items: center;
  display: flex;
  padding: 5px;
  font-size: 15px;
  line-height: 15px;
  overflow-x: auto;
}

.titles-5days {
  font-size: 11px;
  color: #777;
}

.weather-timeline-5days {
  display: flex;
  border-radius: 20px;
  color: black;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
}

@media (max-width: 1140px) {
  .titles-5days {
    display: none;
  }
}

@media (max-width: 664px) {
  .weather-timeline-5days {
    padding: 0;
  }

  .timeline-container-5days {
    padding: 0;
    justify-content: start;
    overflow-x: hidden;
  }

}


</style>
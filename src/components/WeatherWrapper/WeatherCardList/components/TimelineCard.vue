<template>
  <div class="timeline-card">
    <p class="temp-text temp-text-time">{{ extractTime }}</p>
    <p class="temp-text  temp-text-temperature">{{ roundTemperature }}°</p>
    <p class="temp-text  temp-text-feels">{{ roundFeelsLikeTemp }}°</p>
  </div>
</template>

<script>
export default {
  name: "TimelineCard",
  props: ['timeline'],
  methods: {},
  computed: {
    extractTime() {
      const date = new Date(this.timeline.dt_txt);
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

      return formattedTime;
    },
    roundTemperature() {
      return this.timeline.main['temp'] % 1 < 0.5 ? Math.floor(this.timeline.main['temp']) : Math.ceil(this.timeline.main['temp'])
    },
    roundFeelsLikeTemp() {
      return this.timeline.main.feels_like % 1 < 0.5 ? Math.floor(this.timeline.main.feels_like) : Math.ceil(this.timeline.main.feels_like)
    },
  }

}
</script>


<style scoped>
.timeline-card {
  width: 120px;
  border-right: #dfdfdf 1px solid;
}

.timeline-card:last-child {
  margin-right: 0px;
}

.temp-text {
  font-size: 15px;
}

.temp-text.temp-text-time {
  font-size: 12px;
  color: #9d9d9d;
}

.temp-text.temp-text-temperature {
  font-size: 18px;
}

.temp-text.temp-text-feels {
  color: #9d9d9d;
  font-weight: bold;
}


@media (max-width: 650px) {
  .temp-text.temp-text-time{
    font-size: 11px;
  }
  .temp-text.temp-text-temperature{
    font-size: 14px;
  }
  .temp-text.temp-text-feels{
    font-size: 12px;
  }
  .timeline-card {
    border-right: none;
    margin-right: 4px;
    width: 100%;
  }
}

</style>
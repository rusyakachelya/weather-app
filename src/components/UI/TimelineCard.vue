<template>
  <div class="timeline-card">
    <p>{{ extractTime  }}</p>
    <p>{{ roundTemperature }}°</p>
    <p>{{ roundFeelsLikeTemp }}°</p>
  </div>
</template>

<script>
export default {
  name: "TimelineCard",
  props: ['timeline'],
  methods: {

  },
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
    roundFeelsLikeTemp(){
      return this.timeline.main.feels_like % 1 < 0.5 ? Math.floor(this.timeline.main.feels_like) : Math.ceil(this.timeline.main.feels_like)
    },
  }

}
</script>


<style scoped>
  .timeline-card{
    width: 120px;
    border-radius: 20px;
  }
  .timeline-card:last-child{
    margin-right: 0px;
  }
</style>
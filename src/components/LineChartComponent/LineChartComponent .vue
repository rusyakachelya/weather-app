<template>
  <div class="line-chart-container">
    <canvas :id="chartId"></canvas>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import { useI18n } from 'vue-i18n';
import Chart from 'chart.js/auto';



export default {
  props: {
    chartId: String,
    labels: Array,
    data: Array,
  },
  setup(props) {
    const lineChartCanvas = ref(null);
    const { t } = useI18n();

    onMounted(() => {
      const ctx = document.getElementById(props.chartId);
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: props.labels,
          datasets: [{
            label: t('graphLabel'),
            data: props.data,
            borderColor: getRandomColor(),
            borderWidth: 2,
            fill: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              position: 'bottom'
            },
            y: {
              beginAtZero: false
            }
          }
        }
      });

    });

    function getRandomColor() {
      let letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    return {
      lineChartCanvas,
    };
  },
};
</script>

<style scoped>
.line-chart-container {
  height: 200px;
}
</style>

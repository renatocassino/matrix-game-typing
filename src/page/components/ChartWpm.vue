<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
import { CustomWindow } from '../../commonTypes';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const data = ref([0]);
const chartData = computed(() => ({
  labels: data.value.map((_, i) => i),
  datasets: [{
    label: 'wpm',
    data: data.value,
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1,
  }],
}));
const chartOptions = {
  responsive: true,
};

onMounted(() => {
  (window as CustomWindow).updateChart = (newData) => {
    data.value = newData;
  };
});
</script>

<template>
  <Line
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

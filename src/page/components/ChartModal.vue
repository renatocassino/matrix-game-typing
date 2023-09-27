<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const data = [0,0,0,19.98667554963358,14.988758431176617,23.980815347721826,29.975020815986678,34.2514628228914,29.973772948669914,33.30373001776199,29.973024278149662,32.69754768392371,34.96794604945467,32.27789732554565,29.97002997002997,27.97389103503397,29.971901342491414,28.207087030616446,29.99833342592078,31.575623618566468,29.995500674898764,28.565987430965528,27.266530334015,26.080153003564288,24.992710459449327,23.99232245681382,23.068937675420045,24.435394298407996,23.56217200385563,24.81731697228733];
const chartData = {
    labels: data.map((_, i) => i),
    datasets: [ { label: 'wpm', data, fill: false, borderColor: 'rgb(75, 192, 192)',
    tension: 0.1 } ]
};
const chartOptions = {
responsive: true,
};

</script>

<template>
    <Line
        id="my-chart-id"
        :options="chartOptions"
        :data="chartData"
    />
</template>

<template>
    <div class="chart-wrapper">
        <canvas id="weatherChart" ref="weatherChart"></canvas>
    </div>
  </template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n'
import { getCurrentDay } from '@/helpers/date.js'
import Chart from 'chart.js/auto';

const props = defineProps({
    weatherData: Object,
    isNight: {
        type: Boolean,
        required: true
    },
    isWeek: Boolean,
})
const { t } = useI18n({ useScope: 'global' })
let chartInstance = null
const weatherChart = ref(null)
const weather = ref(null)
const labels = ref([])
const temperatureData = ref(null)

watch(() => [props.isWeek, props.isNight, props.weatherData], () => {
    initChart()
})



const getTimesOfDayData = () => {
    if (props.isWeek) return
    if (!props.isNight) {
        weather.value = weather.value[0].hour.slice(7, 19)
    } else {
        weather.value = weather.value[0].hour.slice(-5).concat(weather.value[0].hour.slice(0, 7))
    }
}

const getLabels = () => {
    if (props.isWeek) {
        labels.value = weather.value.map(entry => getCurrentDay(entry.date));
    } else {
        labels.value = weather.value.map(entry => {
            const hours = new Date(entry.time).getHours();
            const formattedHours = hours.toString().padStart(2, '0');
            return formattedHours
        });
    }
}

const getTemperature = () => {
    temperatureData.value = weather.value.map(entry => props.isWeek ? entry.day.avgtemp_c : entry.temp_c);
}

const initChart = () => {
    
    chartInstance?.destroy();
    weather.value = props.weatherData.forecast.forecastday
    const ctx = weatherChart.value.getContext('2d');
    getTimesOfDayData()
    getLabels()
    getTemperature()
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.value,
            datasets: [
            {
                label: `${t('temperature')} (°C)`,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                data: temperatureData.value,
            },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                },
            },
        },
    });
}

onMounted(() => {
    initChart()
});
</script>
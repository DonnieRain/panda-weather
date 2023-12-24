<template>
    <div class="input-wrapper">
        <input
            v-model="selectedCity"
            type="text"
            id="city"
            class="input"
            @input="handlerInput"
        >
        <ul
            v-if="cityList.length"
            class="input-list"
        >
            <li
                v-for="city in cityList"
                :key="city.name"
                @click="changeCity(city)"
            >
                {{ city.name }}, {{ city.country }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import debounce from 'lodash.debounce'
import { getCity } from '@/services/api.js'

const emit = defineEmits(['change'])

const selectedCity = ref('')
const cityList = ref([])

const getCityList = async () => {
    if (selectedCity.value === '') return
    cityList.value = await getCity(selectedCity.value)
}

const changeCity = (city) => {
    emit('change', city)
}

const handlerInput = debounce(getCityList, 1500)
</script>

<style>
    .input-wrapper {
        position: relative;

        .input {
            width: 300px;
            border: 0;
            outline: 0;
            font-size: 16px;
            border-radius: 18px;
            padding: 16px;
            background-color: #272727;
            text-shadow: 1px 1px 0 #212121;
            color: #feeeee;
            caret-color: #feeeee;
            box-shadow: inset  3px 3px 6px #101114, 
                        inset -3px -3px 6px #24252a; 
            box-sizing: border-box;
            transition: all 0.2s ease-in-out;
            appearance: none;
            -webkit-appearance: none;
        }
        .input-list {
            position: absolute;
            top: 50px;
            left: 0;
            width: 100%;
            background: #fff;
        }
    }
</style>
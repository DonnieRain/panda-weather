<template>
    <div class="input-wrapper" v-on-click-outside="handleClickOutside">
        <input
            v-model="selectedCity"
            type="text"
            id="city"
            class="input"
            @input="handlerInput"
            @click="showList = true"
        >
        <ul
            v-if="cityList.length && showList"
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
import { vOnClickOutside } from '@vueuse/components'

const emit = defineEmits(['change'])

const selectedCity = ref('')
const cityList = ref([])
const showList = ref(false)

const getCityList = async () => {
    if (selectedCity.value === '') {
        showList.value = false
        return
    }
    cityList.value = await getCity(selectedCity.value)
    showList.value = true
}

const changeCity = (city) => {
    emit('change', city)
}

const handlerInput = debounce(getCityList, 1500)
const handleClickOutside = () => {
    showList.value = false
}

</script>

<style>
    .input-wrapper {
        position: relative;
        width: 50%;
        @media (max-width: 576px) {
            width: 80%;
        }
        .input, .input-list {
            width: 100%;
            border: 0;
            outline: 0;
            font-size: 16px;
            border-radius: 18px;
            padding: 15px;
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
            top: 55px;
            left: 0;
            width: 100%;
            color: #8a8a8a;
            padding: 10px 15px;

            li {
                margin: 5px 0;
                cursor: pointer;
                transition: color 0.2s;
                &:hover {
                    color: darkcyan;
                }
            }
        }
    }
</style>
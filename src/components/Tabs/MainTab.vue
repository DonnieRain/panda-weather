<template>
    <div class="main-tab-wrapper">
        <RadiusLoader v-if="loading"/>
        <div
            v-if="cardList.length > 0"
            class="card-wrapper"
        >
            <CardWeather
                    v-for="item in cardList"
                    :key="item.id"
                    :weather="item"
                    @change-card="changeCard"
                    @delete-card="deleteCard"
                />
                <a
                    v-if="cardList.length < 5"
                    class="add-card"
                    @click="addNewCard"
                >
                    +
                </a>
        </div>
        <EmptyList v-if="!loading && cardList.length === 0">
            <a
                class="add-card"
                @click="addNewCard"
            >
                +
            </a>
        </EmptyList>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getCurrentCity, fetchWeather } from '@/services/api.js'
import CardWeather from '@/components/Card/CardWeather.vue'
import RadiusLoader from '../RadiusLoader.vue';
import EmptyList from '../EmptyList.vue';

const cardList = ref([])
const loading = ref(false)

const changeCard = async (card) => {
    const { lat, lon, days } = card
    const newData = await fetchWeather(lat, lon, days)
    const cardIndex = cardList.value.findIndex((item) => item.id === card.id)
    cardList.value[cardIndex] = {...newData, id: Date.now()}
}

const addNewCard = () => {
    cardList.value.push({id: Date.now()})
}

const deleteCard = (data) => {
    cardList.value = cardList.value.filter((item) => item.id !== data.id)
}

const getFirstCard = async () => {
    if (cardList.value.length === 0) {
        try {
            loading.value = true
            const { latitude, longitude } = await getCurrentCity()
            const firstCard = await fetchWeather(latitude, longitude, 1)
            cardList.value.push({...firstCard, id: Date.now()})
        } catch (e) {
            console.log(e);
        } finally {
            loading.value = false
        }
    }
}

onMounted(async () => {
    getFirstCard()
})
</script>

<style>
.add-card {
    cursor: pointer;
    padding: 24px;
    margin-right: 20px;
    width: 120px;
    text-align: center;
    align-self: center;
    font-weight: bold;
    border-radius: 18px;
    transition: background 0.1s, color 0.1s;
    color: #8a8a8a;
    background: linear-gradient(145deg, #1c1d21, #17181c);
    box-shadow:  3px 3px 6px #101114, 
                -3px -3px 6px #24252a;
    &:hover {
        background: #141414;
        color: #bbb;
    }
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
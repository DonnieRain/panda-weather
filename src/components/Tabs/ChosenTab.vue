<template>
    <div>
        <RadiusLoader v-if="loading"/>
        <div
            v-if="cardList.length > 0"
            class="card-wrapper"
        >
            <CardWeather
                    v-for="item in cardList"
                    :key="item.id"
                    :weather="item"
                    :choose="true"
                    @delete-card="deleteCard"
                />
        </div>
        <EmptyList v-if="!loading && cardList.length === 0" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBookmark, toogleBookmark } from '@/helpers/helper.js'
import CardWeather from '@/components/Card/CardWeather.vue'
import RadiusLoader from '../RadiusLoader.vue';
import EmptyList from '../EmptyList.vue';

const cardList = ref([])
const loading = ref(false)

const deleteCard = async (data) => {
    try {
        loading.value = true
        cardList.value = cardList.value.filter((item) => item.id !== data.id)
        toogleBookmark(data)
        cardList.value = await getBookmark()
    } catch (e) {
        console.log(e);
    } finally {
        loading.value = false
    }
    
}

onMounted(async () => {
    cardList.value = await getBookmark()
})
</script>

<style>
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
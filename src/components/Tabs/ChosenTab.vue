<template>
    <div class="main-tab-wrapper wrapper">
        <div
            v-if="cardList.length > 0"
            class="card-wrapper"
        >
            <CardWeather
                    v-for="item in cardList"
                    :key="item.id"
                    :weather="item"
                    @delete-card="deleteCard"
                />
        </div>
        
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getBookmark, toogleBookmark } from '@/helpers/helper.js'
import CardWeather from '@/components/Card/CardWeather.vue'

const cardList = ref([])

const deleteCard = (data) => {
    cardList.value = cardList.value.filter((item) => item.id !== data.id)
    toogleBookmark(data)
}

onMounted(async () => {
    cardList.value = await getBookmark()
})
</script>

<style>
/* .main-tab-wrapper {
    
} */
.card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
}
.card {
    min-width: 0; /* Разрешает сужение блока даже если его содержимое больше */
    max-width: 100%; /* Ограничение на максимальную ширину блока */
    min-height: 500px;
    padding: 46px;
    min-height: 288px; 
    border-radius: 18px;
    background: linear-gradient(145deg, #1c1d21, #17181c);
    box-shadow:  3px 3px 6px #101114, 
                -3px -3px 6px #24252a;
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
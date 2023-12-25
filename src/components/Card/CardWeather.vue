<template>
    <div class="card">
        <div class="flex items-center justify-between">
            <AutoselectInput
                @change="getInputData"
            />
            <div class="flex align-center">
                <div class="bookmark-icon">
                    <mdiDelete @click="showModal = true"/>
                </div>
                <div
                    v-if="!choose"
                    class="bookmark-icon"
                    :class="{'bookmark-icon--active' : checkActiveBookmark}"
                >
                    <mdiBookmark @click="save"/>
                </div>
            </div>
        </div>
        <div v-if="cardData?.current">
            <div class="card-info">
                <h2>{{ cardData?.location.name }}, {{ cardData.location.country }}</h2>
                <p>{{ t('currentTemp') }}: {{ Math.round(cardData.current.temp_c) }}</p>
                <p>{{ t('date') }}: {{ getDate }}</p>
            </div>
            <div class="card-switches flex items-center">
                <label class="switch">
                    <div class="label-text">{{ t('day') }} / {{ t('night') }}</div>
                    <div class="toggle">
                        <input
                            v-model="isNight"
                            class="toggle-state"
                            type="checkbox"
                            name="check"
                        />
                        <div class="indicator"></div>
                    </div>
                </label>
                <label class="switch">
                    <div class="label-text">{{ t('day') }} / {{ t('week') }}</div>
                    <div class="toggle">
                        <input
                            v-model="isWeek"
                            class="toggle-state"
                            type="checkbox"
                            name="day-week"
                            @input="getWeekData"
                        />
                        <div class="indicator"></div>
                    </div>
                </label>
            </div>
            <div class="card-chart">
                <WheatherChart
                    :weatherData="cardData"
                    :is-night="isNight"
                    :is-week="isWeek"
                />
            </div>
        </div>
        <div v-if="showModal" class="modal-blur">
            <ConfirmModal
                :title="t('confirmDeleteTitle')"
                @cancel="showModal = false"
                @confirm="deleteCard"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchWeather } from '@/services/api.js'
import { getBookmark, toogleBookmark } from '@/helpers/helper.js'
import { getDayWeek } from '@/helpers/date.js'
import useEventsBus from '@/helpers/eventBus.js'
import AutoselectInput from '@/components/AutoselectInput.vue';
import WheatherChart from '@/components/Charts/WeatherChart.vue'
import ConfirmModal from '@/components/Modals/СonfirmationModal.vue'
import mdiDelete from '@/components/icons/mdiDelete.vue'
import mdiBookmark from '@/components/icons/mdiBookmark.vue'

const emit = defineEmits(['change-card', 'delete-card', 'save-bookmark'])
const props = defineProps({
    weather: Object,
    choose: Boolean,
})
const { emitEvent } = useEventsBus()
const { t, d, locale } = useI18n({ useScope: 'global' })
const cardData = ref(props.weather || null)
const days = ref(1)
const isNight = ref(false)
const showModal = ref(false)
const bookmark = ref(null)
const isWeek = ref(false)

const getDate = computed(() => {
    if (isWeek.value) {
        return `${d(getDayWeek(), 'long', locale)} - ${d(getDayWeek(isWeek.value), 'long', locale)}`
    }
    return d(getDayWeek(), 'long', locale)
})

const checkActiveBookmark = computed(() => {
    if (bookmark.value) {
        return bookmark.value.some((obj) => obj.id === cardData.value?.id)
    }
    return false
})

const getInputData = (data) => {
    emit('change-card', {
        id: cardData.value.id,
        days: days.value,
        lat: data.coord.lat,
        lon: data.coord.lon,
    })
}

const deleteCard = () => {
    emit('delete-card', cardData.value)
}

const updateBookmark = () => {
    bookmark.value = getBookmark('bookmark')
}

const save = () => {
    const cardIndex = bookmark.value ? bookmark.value.findIndex((item) => item.id === cardData.value.id) : null
    if (bookmark.value?.length >= 5 && cardIndex >= 0) {
        showSnackbar(t('cardError'), 'error')
        return
    }
    toogleBookmark(cardData.value)
    updateBookmark()
    if (cardIndex >= 0) {
        showSnackbar(t('deleteFavorites'), 'success')
    } else {
        showSnackbar(t('addFavorites'), 'success')
    }
}

 const getWeekData = async () => {
    days.value = days.value === 1 ? 7 : 1
    const newData = await fetchWeather(
        cardData.value.location.lat,
        cardData.value.location.lon,
        days.value
    )
    cardData.value = {
        id: cardData.value.id,
        ...newData
    }
 }

const showSnackbar = (message, type) => {
    emitEvent('show-snackbar', { message, type })
}

onMounted(() => {
    updateBookmark()
})
</script>

<style>
.card-wrapper {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    gap: 20px;
    @media (max-width: 576px) {
        grid-template-columns: 1fr;
    }
}
.card {
    min-width: 0;
    max-width: 100%;
    min-height: 500px;
    padding: 45px;
    min-height: 288px; 
    border-radius: 18px;
    background: linear-gradient(145deg, #1c1d21, #17181c);
    box-shadow:  3px 3px 6px #101114, 
                -3px -3px 6px #24252a;
    @media (max-width: 576px) {
        padding: 20px;
    }

    .card-info {
        h2 {
            color: #f1eeee;
            margin-top: 20px;
        }
        p {
            font-size: 18px;
            margin: 5px 0;
            color: #8a8a8a;
        }
    }
    .card-switches {
        justify-content: flex-end;
        gap: 20px;
    }
    .card-chart {
        margin-top: 20px;
    }
}
.bookmark-icon {
    width: 30px;
    cursor: pointer;
    svg {
        transition: .2s;
    } 
    &:hover {
        svg {
            transition: .2s;
            fill: #394a56;
        } 
    }
}
.bookmark-icon--active {
    svg {
        fill: aqua;
    }
}

</style>

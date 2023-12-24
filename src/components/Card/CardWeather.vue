<template>
    <div class="card">
        <div class="flex align-center">
            <AutoselectInput
                @change="getInputData"
            />
            <div class="flex align-center">
                <div class="bookmark-icon">
                    <mdiDelete
                        
                        @click="showModal = true"
                    />
                </div>
                <div class="bookmark-icon" :class="{'bookmark-icon--active' : checkActiveBookmark}">
                    <mdiBookmark
                        @click="save"
                    />
                </div>
            </div>
        </div>
        <div v-if="cardData?.current?.temp_c">
            <div>
                <h2>{{ cardData?.location.name }}, {{ cardData.location.country }}</h2>
                <p>{{ t('currentTemp') }}: {{ Math.round(cardData.current.temp_c) }}</p>
                <p>{{ t('date') }}: {{ d(getDate, 'long', locale) }}</p>
            </div>
            <div>
                <label class="label">
                    <div class="label-text">{{ t('day') }}</div>
                    <div class="toggle">
                        <input
                            v-model="isNight"
                            class="toggle-state"
                            type="checkbox"
                            name="check"
                        />
                        <div class="indicator"></div>
                    </div>
                    <div class="label-text">{{ t('night') }}</div>
                </label>
                <label class="label">
                    <div class="label-text">{{ t('day') }}</div>
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
                    <div class="label-text">{{ t('week') }}</div>
                </label>
            </div>
            <WheatherChart
                :weatherData="cardData"
                :is-night="isNight"
                :is-week="isWeek"
            />
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
import useEventsBus from '@/helpers/eventBus.js'
import AutoselectInput from '@/components/AutoselectInput.vue';
import WheatherChart from '@/components/Charts/WeatherChart.vue'
import ConfirmModal from '@/components/Modals/СonfirmationModal.vue'
import mdiDelete from '@/components/icons/mdiDelete.vue'
import mdiBookmark from '@/components/icons/mdiBookmark.vue'
const emit = defineEmits(['change-card', 'delete-card', 'save-bookmark'])
const props = defineProps({
    weather: Object,
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
    const currentDate = new Date();

    if (isWeek.value) {
        currentDate.setDate(currentDate.getDate() + 7);
    }

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
})

const checkActiveBookmark = computed(() => {
    if (bookmark.value) {
        console.log(bookmark.value, cardData.value?.id);
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
    if (bookmark.value?.length >= 5 && !cardIndex) {
        showSnackbar(t('cardError'), 'error')
        return
    }
    toogleBookmark(cardData.value)
    updateBookmark()
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
.bookmark-icon {
    width: 30px;
    
}
.bookmark-icon--active {
        svg {
            fill: aqua;
        }
    }
.label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #394a56;
}

.label-text {
  margin-left: 16px;
}

.toggle {
    isolation: isolate;
    position: relative;
    height: 30px;
    width: 60px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow:
        -8px -4px 8px 0px #10111483,
        8px 4px 12px 0px #24252aea,
        4px 4px 4px 0px #24252aea inset,
        -4px -4px 4px 0px #10111483 inset;
    }

.toggle-state {
    display: none;
}

.indicator {
    height: 100%;
    width: 200%;
    background: #394a56;
    border-radius: 15px;
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    box-shadow:
        -8px -4px 8px 0px #1b1d22,
        8px 4px 12px 0px #2a2c31;
}

.toggle-state:checked ~ .indicator {
    transform: translate3d(25%, 0, 0);
    background: #24252a;
    box-shadow:
            -8px -4px 8px 0px #101114,
            8px 4px 12px 0px #24252a;
}
</style>

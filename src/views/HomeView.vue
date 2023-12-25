<template>
    <header class="flex justify-between items-center wrapper">
        <img src="https://pandateam.net.ua/images/panda_logo-100x100.png" alt="logo">
        <div>
            <label class="switch">
                <div class="label-text">{{ t('lngEn') }} / {{ t('lngUk') }}</div>
                <div class="toggle">
                    <input
                        v-model="lang"
                        class="toggle-state"
                        type="checkbox"
                        name="lang"
                        @input="setLang"
                    />
                    <div class="indicator"></div>
                </div>
            </label>
        </div>
    </header>
    <main>
        <div class="tabs-wrapper wrapper">
            <div class="flex items-center tabs">
                <a
                    class="tab"
                    :class="{'active' : activeComponent === MainTab}"
                    @click="activeComponent = MainTab"
                >
                    {{ t('mainTab') }}
                </a>
                <a
                    class="tab"
                    :class="{'active' : activeComponent === ChosenTab}"
                    @click="activeComponent = ChosenTab"
                >
                    {{ t('choosenTab') }}
                </a>
            </div>
            <div class="tab-content">
                <Transition name="slide-fade" mode="out-in">
                    <component :is="activeComponent"></component>
                </Transition>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import MainTab from '@/components/Tabs/MainTab.vue'
import ChosenTab from '@/components/Tabs/ChosenTab.vue'

const activeComponent = shallowRef(MainTab)
const { t, locale } = useI18n({ useScope: 'global' })
const lang = ref('en')
const setLang = () => {
    locale.value = locale.value === 'en' ?  'uk' : 'en'
}
</script>
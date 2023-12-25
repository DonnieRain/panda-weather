import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createI18n, useI18n } from 'vue-i18n'
import { languages, defaultLocale, datetimeFormats } from './i18n'

const i18n = createI18n({
    legacy: false,
    locale: defaultLocale,
    fallbackLocale: 'en',
    messages: Object.assign(languages),
    datetimeFormats
})

const app = createApp(App, {
    setup() {
        const { t, d } = useI18n()
        return { t, d }
    }
})

app.use(i18n)
app.use(router)


app.mount('#app')

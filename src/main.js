import { createApp } from 'vue'
import App from './App.vue'

import router from "@/router";
import Chart from 'chart.js'

import {languages, defaultLocale} from "@/i18n";
import { createI18n, useI18n } from 'vue-i18n'
import i18nMixin from "@/mixins/i18nMixin";

const localStorageLang = localStorage.getItem('lang')


const messages = Object.assign(languages)
const i18n = createI18n({
    legacy: false,
    fallbackLocale: 'en',
    locale: localStorageLang || defaultLocale,
    messages

})


const app = createApp(App, {
    mixins: [i18nMixin],
    setup() {
        const {t} = useI18n()
        return {t}
    }
})

app.use(router)
app.use(Chart)
app.use(i18n)
app.mixin(i18nMixin)


app.mount('#app')
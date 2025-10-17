import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import {VueQueryPlugin} from "@tanstack/vue-query";
import {createPinia} from "pinia";
import pinialuginPeristedstate from "pinia-plugin-persistedstate"

const app = createApp(App)
const pinia = createPinia()
pinia.use(pinialuginPeristedstate)

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')

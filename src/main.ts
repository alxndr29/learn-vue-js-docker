// main.ts
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // ✅ benar

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // ✅ pasang plugin

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')

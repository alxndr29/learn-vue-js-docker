import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailArticle from "@/views/DetailArticle.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/article/:id',
            name: 'DetailArticle',
            component: DetailArticle,
        },
    ],
})

export default router

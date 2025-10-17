import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailArticleView from "@/views/DetailArticle.vue";
import ArticleView from "@/views/ArticleView.vue";
import LoginView from "@/views/Login.vue";
import RegisterVIew from "@/views/RegisterVIew.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/article',
            name: 'Article',
            component: ArticleView,
        },
        {
            path: '/article/:id',
            name: 'DetailArticle',
            component: DetailArticleView,
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'Register',
            component: RegisterVIew,
        },
    ],
})

export default router

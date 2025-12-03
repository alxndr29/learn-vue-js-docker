import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailArticleView from "@/views/DetailArticle.vue";
import ArticleView from "@/views/ArticleView.vue";
import LoginView from "@/views/Login.vue";
import RegisterVIew from "@/views/RegisterVIew.vue";
import PublicLayout from '@/components/layouts/PublicLayout.vue';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import DashboardView from '@/views/DashboardView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: PublicLayout,
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: HomeView,
                },
                {
                    path: 'article',
                    name: 'Article',
                    component: ArticleView,
                },
                {
                    path: 'article/:id',
                    name: 'DetailArticle',
                    component: DetailArticleView,
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: LoginView,
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: RegisterVIew,
                },
            ]
        },
        {
            path: '/dashboard',
            component: DashboardLayout,
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: DashboardView
                }
            ]
        }

    ],
})

export default router

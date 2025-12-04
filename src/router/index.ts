import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailArticleView from "@/views/DetailArticle.vue";
import ArticleView from "@/views/ArticleView.vue";
import LoginView from "@/views/Login.vue";
import RegisterVIew from "@/views/RegisterVIew.vue";
import PublicLayout from '@/components/layouts/PublicLayout.vue';
import DashboardLayout from '@/components/layouts/DashboardLayout.vue';
import DashboardView from '@/views/DashboardView.vue';
import ProfileView from '@/views/ProfileView.vue';
import CreateProfileView from '@/views/CreateProfileView.vue';
import UpdateProfileView from '@/views/UpdateProfileView.vue';
import { useAuthStore } from '@/store/auth';
import CategoryDashboardView from '@/views/CategoryDashboardView.vue';

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
                    meta: {
                        isPublic: true,
                    },
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: RegisterVIew,
                    meta: {
                        isPublic: true,
                    },
                },
            ]
        },
        {
            path: '/dashboard',
            component: DashboardLayout,
            meta: {
                isAuth: true,
            },
            children: [
                {
                    path: '',
                    name: 'Dashboard',
                    component: DashboardView
                },
                {
                    path: 'profile',
                    name: 'Profile',
                    component: ProfileView
                },
                {
                    path: 'profile/create',
                    name: 'CreateProfile',
                    component: CreateProfileView
                },
                {
                    path: 'profile/update',
                    name: 'UpdateProfile',
                    component: UpdateProfileView
                },
                {
                    path: 'category',
                    name: 'CategoryDashboard',
                    component: CategoryDashboardView,
                    meta: {
                        isAdmin: true,
                    },
                },
            ]
        }

    ],
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    if (to.meta.isAuth && !authStore.token) {
        alert('Anda harus login untuk mengakses halaman ini')
        return {
            path: '/login'
        }
    }
    if (to.meta.isPublic && authStore.token) {
        alert('Anda sudah login jadi tidak perlu login lagi')
        return {
            path: '/dashboard'
        }
    }
    if (to.meta.isAdmin && authStore.user?.role != 'admin') {
        alert('Halaman ini hanya bisa di akses oleh admin')
        return {
            path: '/dashboard'
        }
    }
})

export default router

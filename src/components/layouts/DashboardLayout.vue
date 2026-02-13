<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';

const authStore = useAuthStore()
const router = useRouter()

const isOpen = ref(false)
const toggleDrawer = () => (isOpen.value = !isOpen.value)
const closeDrawer = () => (isOpen.value = false)

const logOutMutation = useMutation({
    mutationFn: async () => {
        authStore.removeAuth();
    },
    onSuccess: () => {
        router.push({
            name: "Login"
        });
    },
    onError: (error) => {
        console.log(error)
    }
});
const handleLogout = () => {
    logOutMutation.mutate();
};

</script>
<template>
    <div class="flex h-screen">
        <!-- sidebar -->
        <div :class="['bg-base-200 w-64 space-y-4 transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full',
            'fixed z-40 h-full lg:static lg:translate-x-0']">
            <h2 class="text-2xl font-bold m-5">{{ authStore.user?.name }}</h2>
            <ul class="menu bg-base-200 rounded-box w-56">
                <li>
                    <h2 class="menu-title">Dashboard</h2>
                    <ul>
                        <li>
                            <RouterLink class="text-md" :to="{ name: 'Dashboard' }" >Dashboard</RouterLink>
                        </li>
                    </ul>
                </li>
                <li>
                    <h2 class="menu-title">Profile</h2>
                    <ul>
                        <li>
                            <RouterLink class="text-md" :to="{ name: 'Profile' }">Profile</RouterLink>
                        </li>
                        <li v-if="authStore.user?.role == 'admin'">
                            <RouterLink class="text-md" :to="{ name: 'UserDashboard' }">User</RouterLink>
                        </li>
                    </ul>
                </li>

                <li v-if="authStore.user?.role == 'admin'">
                    <h2 class="menu-title">Master</h2>
                    <ul>
                        <li>
                            <RouterLink class="text-md" :to="{ name: 'CategoryDashboard' }">Category</RouterLink>
                        </li>
                        <li>
                            <RouterLink class="text-md" :to="{ name: 'ArticleDashboard' }">Article</RouterLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- mobile -->
        <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-40 z-30 lg:hidden" @click="closeDrawer">

        </div>

        <!-- main content -->
        <div class="flex-1 flex flex-col min-h-screen">
            <div class="navbar bg-base-200 shadow-sm">
                <div class="flex-none lg:hidden">
                    <button class="btn btn-square btn-ghost" @click="toggleDrawer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-5 w-5 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
                <div class="flex-1 font-bold text-2xl px-2">
                    <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">Public</RouterLink>
                </div>
                <div class="flex-none">
                    <button class="btn btn-sm text-white btn-error" @click="handleLogout">
                        Logout
                    </button>
                </div>
            </div>
            <!-- Page Content -->
            <main class="p-6 flex-1 overflow-y-auto">
                <RouterView v-slot="{ Component, route }">
                    <Transition name="fade" mode="out-in" appear>
                        <component :is="Component" :key="route.fullPath" />
                    </Transition>
                </RouterView>
            </main>
        </div>
    </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 250ms ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
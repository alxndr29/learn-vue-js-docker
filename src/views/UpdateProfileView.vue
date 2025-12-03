<script setup lang="ts">
import ProfileForm from '@/components/ProfileForm.vue';
import customApi from '@/utils/api';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/vue-query';
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';

const authStore = useAuthStore()

const fetchDataProfile = async () => {
    const { data } = await customApi.get('/profile', {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
    return data
}

const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchDataProfile
});

</script>

<template>
    <section>
        <h1 class="text-3xl font-bold text-info">Update Profile View</h1>
        <div v-if="isLoading" class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
            <Loading class="mb-4" />
        </div>
        <div v-else-if="isError">
            <Error />
        </div>
        <div class="v-else">
            <ProfileForm :IsUpdate="true" :data="data.profile" />
        </div>
    </section>
</template>
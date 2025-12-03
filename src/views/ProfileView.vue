<script setup lang="ts">
import customApi from '@/utils/api';
import { useQuery } from '@tanstack/vue-query';
import { useAuthStore } from '@/store/auth';
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

const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchDataProfile
});

</script>
<template>
    <h1 class="text-info text-2xl font-bold">Halaman profile</h1>
     <div v-if="isLoading" key="loading"
         class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <Loading class="mb-4"/>
    </div>
    <div v-else-if="error" key="error">
      <Error/>
    </div>
    <div v-else class="my-3">
        <div v-if="data.profile" class="card bg-base-300">
            <div class="card-body">
                <h2 class="card-title">
                    {{ data?.name }} ({{ data?.profile?.age }} Tahun)
                </h2>
                <p>
                    {{ data?.profile?.bio }}
                </p>
                <div class="card-actions">
                    <button class="btn btn-info">Update Profile</button>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="text-xl font-bold">Belum ada profile?</h2>
            <button class="btn btn-info my-2">Buat Profile</button>
        </div>
    </div>
</template>
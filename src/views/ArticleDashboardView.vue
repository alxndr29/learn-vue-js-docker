<script setup lang="ts">
import customApi from '@/utils/api';
import { useAuthStore } from '@/store/auth';
import { useQuery } from '@tanstack/vue-query';
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import Pagination from '@/components/Pagination.vue';

const authStore = useAuthStore()
const route = useRoute()

const page = computed(() => parseInt(route.query.page as string) || 1)
const limit = computed(() => parseInt(route.query.limit as string) || 3)

const fetchDataArticleDashboard = async () => {
    const { data } = await customApi.get("/article/user", {
        params: {
            page: page.value,
            limit: limit.value
        },
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
    return data
}
const { data, isLoading, error } = useQuery({
    queryKey: ["ArticleDashboard", page, limit],
    queryFn: fetchDataArticleDashboard
})

</script>

<template>
    <section>
        <h1 class="text-info text-3xl">Dashboard Article</h1>
        <div v-if="isLoading" key="loading"
            class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
            <Loading class="mb-4" />
        </div>
        <div v-else-if="error" key="error">
            <Error />
        </div>
        <div v-else>
            <div v-if="data.data.length">
                <div class="overflow-x-auto">
                    <table class="table">
                        <thead>
                            <tr>

                                <th>Article</th>
                                <th>Content</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data.data">
                                <td>
                                    <div class="flex items-center gap-3">
                                        <div class="avatar">
                                            <div class="mask mask-squircle h-12 w-12">
                                                <img :src="item.image" :alt="item.title" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="font-bold">{{ item?.title }}</div>
                                            <div class="text-sm opacity-50">{{ item?.category?.name }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {{ item?.content }}
                                </td>
                                <th>
                                    <div class="badge badge-xs" :class="item?.status === 'PENDING' ? 'badge-secondary'
                                        : item?.status === 'SUCCESS'
                                            ? 'badge-success' : 'badge-error'">
                                        {{ item?.status }}
                                    </div>
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div class="my-3">
                    <Pagination :last-page="data.lastPage"/>
                </div>
            </div>
            <div v-else>
                <h2 class="2xl">Empty Article</h2>
            </div>
        </div>
    </section>
</template>
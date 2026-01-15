<script setup lang="ts">
import customApi from '@/utils/api';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { reactive, ref, computed } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()

const fetchDataCategory = async () => {
    const { data } = await customApi.get("/category")
    return data
}

const { data, isLoading, error } = useQuery({
    queryKey: ["ArticleCategory"],
    queryFn: fetchDataCategory
})

const articleData = reactive({
    title: '',
    status: 'PENDING',
    category: '',
    content: '',
    image: null as File | null,
    tags: [] as string[],
});
const handleImageChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
        articleData.image = target.files[0]
    }
}

const tagInput = ref("")
const tags = computed(() => {
    return tagInput.value.split(",").map((t) => t.trim()).filter(Boolean)
})

const handleSubmit = () => {
    createArticleMutation.mutate()
}

const createArticleMutation = useMutation({
    mutationFn: async () => {
        const data = new FormData()
        articleData.tags = tags.value
        data.append('title', articleData.title)
        data.append('content', articleData.content)
        data.append('categoryId', articleData.category)
        data.append('status', articleData.status)
        articleData.tags.forEach((tag) => {
            data.append('tags[]', tag)
        })
        if (articleData.image) {
            data.append('image', articleData.image)
        }
        await customApi.post('/article', data, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        },
        )
    },
    onSuccess: () => {
        router.push({ name: 'ArticleDashboard' })
    },
    onError: (error) => {
        console.log(error)
    }
})

</script>
<template>
    <form class="my-3" @submit.prevent="handleSubmit">
        <fieldset class="fieldset bg-base-200 border-info rounded-box">
            <label class="label">Title</label>
            <input type="text" v-model="articleData.title" class="input w-full" placeholder="Masukan title" />

            <label class="label">Image</label>
            <input type="file" @change="handleImageChange" class="input w-full" placeholder="Title" />

            <label class="label">Category</label>
            <select class="select w-full" v-model="articleData.category">
                <option v-if="isLoading">Loading ...</option>
                <option v-else-if="isLoading">Error ...</option>
                <option v-else v-for="category in data" :key="category.id" :value="category.id">
                    {{ category.name }}
                </option>
            </select>

            <label class="label">Status</label>
            <select class="select w-full" v-model="articleData.status">
                <option value="PENDING">Pending</option>
                <option value="CANCEL">Cancel</option>
                <option value="SUCCESS">Success</option>
            </select>

            <label class="label">Content</label>
            <textarea class="textarea w-full h-[60vh]" v-model="articleData.content"></textarea>

            <label class="label">Tags (pisahkan dengan koma)</label>
            <input type="text" v-model="tagInput" class="input w-full" placeholder="vue, react, php" />

            <button class="btn btn-primary mt-10">Create</button>
        </fieldset>
    </form>

</template>

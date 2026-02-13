<script setup lang="ts">
import customApi from '@/utils/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/store/auth'
import { onMounted, ref } from 'vue'
import { swalError } from '@/utils/swalError'

const queryClient = useQueryClient()
const authStore = useAuthStore()
const content = ref("")


interface ArticleProps {
    ArticleId: string | string[]
    isUpdate: boolean
    content?: string
}

const props = defineProps<ArticleProps>()

const createOrUpdateCommentMutation = useMutation({
    mutationFn: async () => {
        await customApi.post('/comment',
            {
                content: content.value,
                articleId: props.ArticleId
            },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }
        )
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ArticleDataDetail","ArticleCOmmentStatus"] })
        content.value = ""
    },
    onError: (error) => {
       swalError(error)
    }
})
const handleSubmit = () => {
    createOrUpdateCommentMutation.mutate()
}

onMounted(() => {
    if(props.isUpdate && props.content){
        content.value = props.content
    }
})
</script>
<template>
    <fieldset class="fieldset my-3 p-4 bg-base-300">
        <form @submit.prevent="handleSubmit">
            <textarea class="textarea w-full h-32" placeholder="Isi Komentar Anda" v-model="content"></textarea>
            <div class="flex justify-end">
                <button class="btn btn-primary my-3" :class="props.isUpdate ? 'btn-info' : 'btn-primary'" type="submit">
                    {{ props.isUpdate ? "Update" : "Create" }}
                </button>
            </div>
        </form>

    </fieldset>
</template>
<script setup lang="ts">
import customApi from '@/utils/api'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { useAuthStore } from '@/store/auth'
import { ref } from 'vue'

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
        queryClient.invalidateQueries({ queryKey: ["ArticleDataDetail"] })
        content.value = ""
    },
    onError: (error) => {
        console.log(error)
    }
})
const handleSubmit = () => {
    createOrUpdateCommentMutation.mutate()
    alert('submit komen berhasil')
}
</script>
<template>
    <fieldset class="fieldset bg-base-300 my-3 border-info roundex-box border p-4">
        <form @submit.prevent="handleSubmit">
            <textarea class="textarea w-full h-32" placeholder="Isi Komentar Anda" v-model="content"></textarea>
            <div class="flex justify-end">
                <button class="btn btn-primary my-3" type="submit">Submit</button>
            </div>
        </form>

    </fieldset>
</template>
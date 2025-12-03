<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { useAuthStore } from '@/store/auth';
import customApi from '@/utils/api';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

const props = defineProps({
    IsUpdate: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object
    }
})

onMounted(() => {
    if (props.data && props.IsUpdate) {
        age.value = props.data.age
        bio.value = props.data.bio
    }
})
const age = ref(0)
const bio = ref("")

const profileMutation = useMutation({
    mutationFn: async () => {
        await customApi.post(
            "/profile",
            {
                age: age.value,
                bio: bio.value,
            },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }
        )
    },
    onSuccess: () => {
        router.replace({ name: "Profile" })
    },
    onError: (err) => {
        console.log(err)
    }
})

const handleSubmit = () => {
    profileMutation.mutate()
}

</script>
<template>
    <form @submit.prevent="handleSubmit">
        <label class="label my-2">Age</label>
        <input type="number" v-model="age" class="input w-full" placeholder="Masukan umur anda" />

        <label class="label my-2">Bio</label>
        <textarea v-model="bio" class="textarea w-full" placeholder="Masukan biodata anda"></textarea>

        <button type="submit" class="btn btn-info mt-4 text-white">
            {{ props.IsUpdate ? "Update Profile" : "Buat Profile" }}
        </button>
    </form>
</template>
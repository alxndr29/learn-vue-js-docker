<script setup lang="ts">
import { useQuery, useIsMutating, useMutation, useQueryClient } from '@tanstack/vue-query';
import customApi from '@/utils/api';
import Loading from '@/components/Loading.vue';
import { useAuthStore } from '@/store/auth';
import Error from '@/components/Error.vue';
import { ref } from 'vue';

const showForm = ref<boolean>(false)
const name = ref<string>('')
const isUpdate = ref<boolean>(false)
const id = ref<null | string>(null)

const authStore = useAuthStore();
const queryClient = useQueryClient();

const fetchDataCategory = async () => {
    const { data } = await customApi.get('/category')
    return data
}
const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["CategoryDashboard"],
    queryFn: fetchDataCategory
});

const showCreateForm = () => {
    showForm.value = true
    name.value = ""
    isUpdate.value = false
    id.value = null
}

const showUpdateForm = (item: { name: string; id: string }) => {
    showForm.value = true
    name.value = item.name
    isUpdate.value = true
    id.value = item.id
}

const closeFormCategory = () => {
    showForm.value = false
}

const createCategoryMutation = useMutation({
    mutationFn: async () => {
        await customApi.post(
            '/category',
            {
                name: name.value
            }, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }
        )
    },
    onSuccess: () => {
        closeFormCategory()
        alert('Add category succes')
        queryClient.invalidateQueries({ queryKey: ["CategoryDashboard"] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const updateCategoryMutation = useMutation({
    mutationFn: async () => {
        await customApi.put(
            `/category/${id.value}`,
            {
                name: name.value
            }, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        }
        )
    },
    onSuccess: () => {
        closeFormCategory()
        alert('Update category succes')

        queryClient.invalidateQueries({ queryKey: ["CategoryDashboard"] })
    },
    onError: (error) => {
        console.log(error)
    }
})

const handleSubmit = () => {
    if (isUpdate.value) {
        updateCategoryMutation.mutate()
    } else {
        createCategoryMutation.mutate()
    }
}

const handleDelete = async (id: string) => {
    if (confirm("Sure want to delete?")) {
        await customApi.delete(`category/${id}`, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        refetch()
    }
}

</script>
<template>
    <section>
        <h1 class="text-info text-3xl">Dashboard Category</h1>
        <button class="btn btn-primary my-3" @click="showCreateForm">Add</button>
        <div class="my-5" v-if="showForm">
            <form @submit.prevent="handleSubmit">
                <fieldset class="fieldset bg-base-300 border-info rounded-box border p-4">
                    <h1 class="text-info text-xl">{{ isUpdate ? "Update Category" : "Add Category" }}</h1>
                    <input type="text" class="input w-full" placeholder="masukan nama kategori" v-model="name" />
                    <div class="flex gap-x-3">
                        <button class="btn btn-info mt-4" type="submit">{{ isUpdate ? "Update" : "Add" }}</button>
                        <button class="btn btn-error mt-4" @click="closeFormCategory">Cancel</button>
                    </div>
                </fieldset>
            </form>
        </div>
        <div v-if="isLoading" key="loading"
            class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
            <Loading class="mb-4" />
        </div>
        <div v-else-if="error" key="error">
            <Error />
        </div>
        <div class="overflow-x-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in data" :key="item.id">
                        <th>{{ index + 1 }}</th>
                        <td>{{ item.name }}</td>
                        <td>
                            <div class="flex gap-x-3">
                                <button class="btn btn-secondary btn-sm" @click="showUpdateForm(item)">Update</button>
                                <button class="btn btn-error btn-sm" @click="handleDelete(item.id)">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>
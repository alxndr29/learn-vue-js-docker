<script setup lang="ts">
import customApi from '@/utils/api';
import { useAuthStore } from '@/store/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import Loading from '@/components/Loading.vue';
import Error from '@/components/Error.vue';
import { ref } from 'vue';
import { swalError } from '@/utils/swalError';

const authStore = useAuthStore()
const queryClient = useQueryClient()

const fetchDataUser = async () => {
    const { data } = await customApi.get("/users", {
        headers: {
            Authorization: `Bearer ${authStore.token}`
        }
    })
    return data
}

const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["UserDashboard"],
    queryFn: fetchDataUser
})

const showForm = ref(false)
const role = ref<null | string>("")
const name = ref<null | string>("")
const isUpdate = ref(false)
const id = ref<null | string>("")

const showEditForm = (item: { id: string; name: string; role: string }) => {
    showForm.value = true
    role.value = item.role
    name.value = item.name
    id.value = item.id
    isUpdate.value = true
}

const updateRoleMutation = useMutation({
    mutationFn: async () => {
        await customApi.patch(
            "/users/" + id.value,
            {
                role: role.value
            },
            {
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                }
            }
        )
    },
    onSuccess: () => {
        showForm.value = false
        refetch()
    },
    onError: (error) => {
       swalError(error)
    }
})
const handleUpdate = () => {
    updateRoleMutation.mutate()
    alert('Berhasil update role')
}
</script>
<template>
    <section>
        <h1 class="text-info text-3xl font-bold mb-5">Dashboard User</h1>
        <div v-if="showForm">
            <fieldset class="fieldset bg-base-300 border-info rounded-box border p-4">
                <form @submit.prevent="handleUpdate">
                    <h1 class="text-xl font-bold">Update Role: {{ name }}</h1>
                    <label class="label">Role</label>
                    <select v-model="role" class="select w-full">
                        <option value="user" :selected="role === 'user'">User</option>
                        <option value="admin" :selected="role === 'admin'">Admin</option>
                    </select>
                    <button class="btn btn-sm btn-primary">Update</button>
                </form>

            </fieldset>
        </div>
        <div v-if="isLoading">
            <Loading />
        </div>
        <div v-else-if="error">
            <Error />
        </div>
        <div v-else-if="data">
            <div class="overflow-xauto">
                <table class="table table-zebra">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in data">
                            <td>{{ index + 1 }}</td>
                            <td>{{ item.name }}</td>
                            <td>{{ item.email }}</td>
                            <td>
                                <span class="badge" :class="item.role == 'admin' ? 'badge-primary' : 'badge-accent'">
                                    {{ item.role }}
                                </span>
                            </td>
                            <td>
                                <button class="btn btn-primary btn-sm" @click="showEditForm(item)">Update Role</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
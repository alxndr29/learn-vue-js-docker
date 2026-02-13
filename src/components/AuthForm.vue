<script setup lang="ts">
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import customApi from "@/utils/api.ts";
import { useRouter } from 'vue-router';
import { useAuthStore } from "@/store/auth.ts"
import Swal from 'sweetalert2';
import { swalError } from '@/utils/swalError';
const router = useRouter();
const authStore = useAuthStore();

//props
const props = defineProps({
  isRegister: {
    type: Boolean,
    default: false
  }
});

const email = ref("");
const name = ref("");
const password = ref("");

const AuthMutation = useMutation({
  mutationFn: async () => {
    if (props.isRegister) {
      await customApi.post("/auth/register", {
        email: email.value,
        name: name.value,
        password: password.value,
      });
    }
    const { data } = await customApi.post("/auth/login", {
      email: email.value,
      password: password.value,
    });
    const user = await customApi.get("/auth/getUser", {
      headers: {
        Authorization: `Bearer ${data.access_token}`,
      }
    });
    authStore.setAuth(data.access_token, user.data);
  },
  onSuccess: () => {
    router.replace({ name: 'home' });
  },
  onError: (err) => {
    swalError(err)
  },
});
const AuthSubmitHandle = () => {
  AuthMutation.mutate();
};
</script>
<template>
  <div class="flex justify-center">
    <form @submit.prevent="AuthSubmitHandle">
      <fieldset class="fieldset bg-base-200 border-info rounded-box w-md border p-4">
        <h1 class="text-3xl font-bold text-info text-center">
          {{ props.isRegister ? 'Register' : 'Login' }}
        </h1>
        <label class="label" v-if="props.isRegister">Name</label>
        <input v-model="name" v-if="props.isRegister" type="text" class="input w-full" placeholder="Name" />
        <label class="label">Email</label>
        <input v-model="email" type="email" class="input w-full" placeholder="Email" />
        <label class="label">Password</label>
        <input v-model="password" type="password" class="input w-full" placeholder="Password" />
        <button class="btn btn-info mt-4" type="submit">
          {{ props.isRegister ? 'Register' : 'Login' }}
        </button>
        <p v-if="props.isRegister" class="text-center">
          Sudah punya akun silahkan
          <RouterLink :to="{ name: 'Login' }" class="text-primary">
            Login
          </RouterLink>
        </p>
        <p v-else class="text-center">
          Belum punya akun silahkan
          <RouterLink :to="{ name: 'Register' }" class="text-primary">
            Register
          </RouterLink>
        </p>
      </fieldset>
    </form>
  </div>
</template>
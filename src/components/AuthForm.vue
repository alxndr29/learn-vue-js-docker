<script setup lang="ts">
import {ref} from 'vue';
import {useMutation} from '@tanstack/vue-query';
import customApi from "@/utils/api.ts";
import {useRouter} from 'vue-router';
import {useAuthStore} from "@/store/auth.ts"

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");

const AuthMutation = useMutation({
  mutationFn: async () => {
    const {data} = await customApi.post("/auth/login", {
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
    router.replace({name: 'home'});
  },
  onError: (err) => {
    console.log(err);
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
        <legend class="fieldset-legend">Login</legend>
        <label class="label">Email</label>
        <input v-model="email" type="email" class="input w-full" placeholder="Email"/>
        <label class="label">Password</label>
        <input v-model="password" type="password" class="input w-full" placeholder="Password"/>
        <button class="btn btn-neutral mt-4" type="submit">Login</button>
      </fieldset>
    </form>
  </div>
</template>
<script setup lang="ts">
import {useAuthStore} from "@/store/auth.ts";
import {useRouter} from "vue-router";
import {useMutation, useQuery} from "@tanstack/vue-query";
import customApi from "@/utils/api.ts";

const authStore = useAuthStore();
const router = useRouter();

const fetchDataCategoryNav = async () => {
  const {data} = await customApi.get('/category')
  return data;
}
const {data, isLoading, error} = useQuery({
  queryKey: ["categoryNav"],
  queryFn: fetchDataCategoryNav,
});

const logOutMutation = useMutation({
  mutationFn: async () => {
    authStore.removeAuth();
  },
  onSuccess: () => {
    router.push({
      name: "Login"
    });
  },
  onError: (error) => {
    console.log(error)
  }
});
const handleLogout = () => {
  logOutMutation.mutate();
};
</script>
<template>
  <header>
    <div class="navbar bg-base-100 shadow-sm fixed top-0 right-0 z-10">
      <div class="navbar-start">
        <!--Mobile-->
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </div>
          <ul
              tabindex="0"
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <RouterLink :to="{name: 'Article'}">Article</RouterLink>
            </li>
            <li>
              <a>Category</a>
              <ul class="p-2">
                <li v-if="isLoading">Loading ...</li>
                <li v-else-if="error">Error ...</li>
                <li v-else v-for="category in data" :key="category.id">
                  <RouterLink :to="{name:'Article', query:{categoryId: category.id}}">
                    {{ category.name }}
                  </RouterLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <RouterLink :to="{name:'home'}">
          <a class="btn btn-ghost text-xl">CRUD VUE JS EVAN</a>
        </RouterLink>
      </div>
      <!--PC-->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li>
            <RouterLink :to="{name: 'Article'}">Article</RouterLink>
          </li>
          <li>
            <details>
              <summary>Category</summary>
              <ul class="p-2">
                <li v-if="isLoading">Loading ...</li>
                <li v-else-if="error">Error ...</li>
                <li v-else v-for="category in data" :key="category.id">
                  <RouterLink :to="{name:'Article', query:{categoryId: category.id}}">
                    {{ category.name }}
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div class="navbar-end">
        <div v-if="authStore.token">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-info rounded-field">
              {{ authStore.user?.name }}
            </div>
            <ul tabindex="0" class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow">
              <li><RouterLink :to="{name: 'Dashboard'}">Dashboard</RouterLink></li>
              <li><RouterLink :to="{name: 'Profile'}">Profile</RouterLink></li>
              <li>
                <span class="text-error" @click="handleLogout">Logout</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <RouterLink :to="{name: 'Login'}" class="btn btn-primary">Login</RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

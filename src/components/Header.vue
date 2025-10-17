<script setup lang="ts">
import {useAuthStore} from "@/store/auth.ts";

const authStore = useAuthStore();
</script>
<template>
  <header>
    <div class="navbar bg-base-100 shadow-sm fixed top-0 right-0 z-10">
      <div class="navbar-start">
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
            <li><a>Item 1</a></li>
            <li>
              <a>Parent</a>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li>
          </ul>
        </div>
        <RouterLink :to="{name:'home'}">
          <a class="btn btn-ghost text-xl">CRUD EVAN</a>
        </RouterLink>

      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul class="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>
      <div class="navbar-end">
        <div v-if="authStore.token">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost rounded-field">
              {{ authStore.user?.name }}
            </div>
            <ul tabindex="0" class="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow">
              <li><a>Dashboard</a></li>
              <li><a>Profile</a></li>
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

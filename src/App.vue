<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header/>
  <main class="mx-auto  max-w-6xl px-8 py-20 min-h-[80vh] my-15">
    <RouterView/>
  </main>
  <Footer/>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '../Header.vue';
import Footer from '../Footer.vue';

</script>

<template>
  <Header/>
  <main class="relative mx-auto max-w-6xl px-8 py-20 min-h-[80vh] my-15">
    <RouterView v-slot="{ Component, route }">
      <Transition name="fade" mode="out-in" appear>
        <component :is="Component" :key="route.fullPath" />
      </Transition>
    </RouterView>
  </main>
  <Footer/>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

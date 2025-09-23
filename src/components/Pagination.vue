<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const props = defineProps<{ lastPage: number }>();

const router = useRouter();
const route = useRoute();

const page  = computed(() => parseInt(route.query.page  as string) || 1);
const limit = computed(() => parseInt(route.query.limit as string) || 3);

function goToPage(newPage: number) {
  router.push({
    query: {
      ...route.query,
      page: newPage.toString(),
      limit: limit.value.toString(),
    },
  });
}
</script>

<template>
  <div class="join">
    <button class="join-item btn" :disabled="page <= 1" @click="goToPage(page - 1)">«</button>
    <button class="join-item btn">Page {{ page }}</button>
    <button class="join-item btn" :disabled="page >= props.lastPage" @click="goToPage(page + 1)">»</button>
  </div>
</template>

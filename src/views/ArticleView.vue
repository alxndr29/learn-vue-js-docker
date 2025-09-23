<script setup lang="ts">
import customApi from "@/utils/api.ts";
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import { useQuery } from "@tanstack/vue-query";
import CardItem from "@/components/CardItem.vue";
import Pagination from "@/components/Pagination.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const page  = computed(() => parseInt(route.query.page  as string) || 1);
const limit = computed(() => parseInt(route.query.limit as string) || 3);

const fetchDataArticle = async () => {
  const { data } = await customApi.get("/article", {
    params: { page: page.value, limit: limit.value },
  });
  return data;
};

const { data, isLoading, isError } = useQuery({
  queryKey: ["articles", page, limit],
  queryFn: fetchDataArticle,

});
</script>

<template>
  <div v-if="isLoading" class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
    <Loading class="mb-4" />
  </div>

  <div v-else-if="isError">
    <Error />
  </div>

  <section v-else>
    <h1 class="text-info text-4xl font-bold">List Articles</h1>

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <CardItem v-for="item in data.data" :key="item.id" :item="item" />
    </div>

    <div class="flex justify-center my-3">
      <Pagination :last-page="data.lastPage" />
    </div>
  </section>
</template>

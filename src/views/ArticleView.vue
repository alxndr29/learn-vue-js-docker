<script setup lang="ts">
import customApi from "@/utils/api.ts";
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import {useQuery} from "@tanstack/vue-query";
import CardItem from "@/components/CardItem.vue";
import Pagination from "@/components/Pagination.vue";
import {computed} from "vue";
import {useRoute} from "vue-router";
import Filter from "@/components/Filter.vue";

const route = useRoute();

const page = computed(() => parseInt(route.query.page as string) || 1);
const limit = computed(() => parseInt(route.query.limit as string) || 3);

const title = computed(() => route.query.title as string || null);
const categoryId = computed(() => route.query.categoryId as string || null);
const sortBy = computed(() => route.query.sortBy as string || 'createdAt');
const sortOrder = computed(() => route.query.sortOrder as string || 'desc');


const fetchDataArticle = async () => {
  const {data} = await customApi.get("/article", {
    params: {
      page: page.value,
      limit: limit.value,
      title: title.value,
      categoryId: categoryId.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value,
    },
  });
  return data;
};

const {data, isLoading, isError} = useQuery({
  queryKey: ["articles", page, limit, title, categoryId, sortBy, sortOrder],
  queryFn: fetchDataArticle,

});
</script>

<template>

  <div v-if="isLoading" class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
    <Loading class="mb-4"/>
  </div>

  <div v-else-if="isError">
    <Error/>
  </div>

  <section v-else>
    <Filter/>
    <h1 class="text-info text-4xl font-bold">List Articles</h1>

    <div class="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" v-if="data.data.length > 0">
      <CardItem v-for="item in data.data" :key="item.id" :item="item"/>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold mt-4">No Result</h1>
    </div>
    <div class="flex justify-center my-3">
      <Pagination :last-page="data.lastPage"/>
    </div>
  </section>
</template>

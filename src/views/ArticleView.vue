<script setup lang="ts">
import customApi from "@/utils/api.ts";
import Error from "@/components/Error.vue";
import Loading from "@/components/Loading.vue";
import {useQuery} from "@tanstack/vue-query";
import CardItem from "@/components/CardItem.vue";
import Pagination from "@/components/Pagination.vue";

const fetchDataArticle = async () => {
  const {data} = await customApi.get("/article?limit=4");
  const articles = data;
  console.log(articles);
  return articles;
};
const {data, isLoading, isError} = useQuery({
  queryKey: ["articles"],
  queryFn: fetchDataArticle
});
</script>
<template>
  <div v-if="isLoading" key="loading"
       class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
    <Loading class="mb-4"/>
  </div>
  <div v-else-if="isError" key="error">
    <Error/>
  </div>
  <section v-else>
    <h1 class="text-info text-4xl font-bold">
      List Articles
    </h1>
    <div class="grid md:grid-cols-2 gap-5 lg:grid-cols-3 sm:grid-cols-1">
      <CardItem :item="item" v-for="item in data.data" :key="item.id"/>
    </div>

    <div class="flex justify-center">
      <Pagination class="my-3"/>
    </div>
  </section>
</template>
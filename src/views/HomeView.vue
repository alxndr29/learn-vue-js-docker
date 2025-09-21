<script setup lang="ts">
import customApi from "@/utils/api.ts";
import {useQuery} from "@tanstack/vue-query";
import Loading from "@/components/Loading.vue";
import Error from "@/components/Error.vue";
import CardItem from "@/components/CardItem.vue";
import {withMinDelay} from "@/utils/withMinDelay";

const fetchData = async () => {
  const {data} = await customApi.get(
      "/article?limit=3&sortBy=createdAt&sortOrder=desc",
      {headers: {"Cache-Control": "no-cache"}}
  );
  return data;
};

const MIN_LOADING_MS = 1200;

const {data, isLoading, isFetching, error} = useQuery({
  queryKey: ["data"],
  queryFn: () => withMinDelay(fetchData(), MIN_LOADING_MS),
  refetchOnWindowFocus: false,
});

</script>

<template>
  <div v-if="isLoading || isFetching" key="loading"
       class="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
    <Loading class="mb-4"/>
  </div>
  <div v-else-if="error" key="error">
    <Error/>
  </div>
  <section v-else key="content">
    <h1 class="text-primary font-bold text-3xl underline">
      List Recent Articles
    </h1>
    <CardItem :item="item" v-for="item in data.data" :key="item.id"/>
    <RouterLink :to="{name:'Article'}" class="btn btn-block btn-primary mt-10">
      Show All Article
    </RouterLink>
  </section>
</template>

